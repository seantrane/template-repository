# --------------------------------------------------------------------------------------------------
# ECR
# https://github.com/cloudposse/terraform-aws-ecr#readme
# --------------------------------------------------------------------------------------------------

# data "aws_iam_role" "ecr" {
#   name = "ecr"
# }

module "ecr" {
  source          = "git::https://github.com/cloudposse/terraform-aws-ecr.git?ref=master"
  name            = "${local.app_key}-ci-ecr"
  namespace       = "${var.namespace}"
  stage           = "${var.stage}"
  # roles           = ["${data.aws_iam_role.ecr.name}"]
  max_image_count = "30"
  tags            = "${local.common_tags}"
}

# --------------------------------------------------------------------------------------------------
# ECS Container Definitions
# https://github.com/cloudposse/terraform-aws-ecs-container-definition#readme
# --------------------------------------------------------------------------------------------------

module "container" {
  source           = "git::https://github.com/cloudposse/terraform-aws-ecs-container-definition.git?ref=master"
  container_name   = "${local.app_key}"
  container_image  = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_default_region}.amazonaws.com/${module.ecr.repository_name}:${var.app_version_label}"
  container_memory = "${var.app_ecs_memory}"
  port_mappings    = [
    {
      containerPort = "${var.app_ecs_container_port}"
      hostPort      = "${var.app_ecs_host_port}"
      protocol      = "tcp"
    },
  ]
  environment = [
    {
      name  = "ENV"
      value = "${var.env}"
    },
    {
      name  = "NODE_ENV"
      value = "${var.env}"
    },
  ]
}

# --------------------------------------------------------------------------------------------------
# S3
# https://github.com/cloudposse/terraform-aws-s3-bucket#readme
# --------------------------------------------------------------------------------------------------

module "s3_bucket" {
  source        = "git::https://github.com/cloudposse/terraform-aws-s3-bucket.git?ref=master"
  enabled       = "true"
  force_destroy = "true"
  name          = "${local.app_key}-ci-bucket"
  stage         = "${var.stage}"
  namespace     = "${var.namespace}"
  tags          = "${local.common_tags}"
}

# --------------------------------------------------------------------------------------------------
# Application Delivery
# --------------------------------------------------------------------------------------------------

resource "null_resource" "application_delivery" {
  triggers = {
    app_version_label = "${var.app_version_label}"
    container_json    = "${module.container.json}"
    bucket_id         = "${module.s3_bucket.bucket_id}"
    app_name          = "${module.elastic_beanstalk_application.app_name}"
  }
  provisioner "local-exec" {
    working_dir = "${var.build_path}"
    command     = "docker build -t $AWS_ECR_IMAGE_URL . || exit; $(aws ecr get-login --no-include-email --region $AWS_DEFAULT_REGION) || exit; docker push $AWS_ECR_IMAGE_URL || exit; docker rmi -f $AWS_ECR_IMAGE_URL < /dev/null 2> /dev/null;"
    environment = {
      AWS_DEFAULT_REGION = "${local.aws_default_region}"
      AWS_ECR_IMAGE_URL  = "${data.aws_caller_identity.current.account_id}.dkr.ecr.${local.aws_default_region}.amazonaws.com/${module.ecr.repository_name}:${var.app_version_label}"
    }
  }
  provisioner "local-exec" {
    working_dir = "${var.temp_path}"
    command     = "echo $CONTAINER_JSON > $CONTAINER_JSON_FILE || exit; zip -rv $ZIP_PATH $CONTAINER_JSON_FILE || exit;"
    environment = {
      CONTAINER_JSON      = "${module.container.json}"
      CONTAINER_JSON_FILE = "Dockerrun.aws.json"
      ZIP_PATH            = "${var.temp_path}/${var.app_ci_s3_uri}"
    }
  }
  provisioner "local-exec" {
    working_dir = "${var.temp_path}"
    command     = "aws s3 cp $ZIP_PATH $AWS_S3_PATH || exit;"
    environment = {
      ZIP_PATH    = "${var.temp_path}/${var.app_ci_s3_uri}"
      AWS_S3_PATH = "s3://${module.s3_bucket.bucket_id}/${var.app_ci_s3_uri}"
    }
  }
}

# --------------------------------------------------------------------------------------------------
# Application Deployment
# --------------------------------------------------------------------------------------------------

