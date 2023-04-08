# --------------------------------------------------------------------------------------------------
# AWS Account ID, User ID, and ARN
# https://www.terraform.io/docs/providers/aws/d/caller_identity.html
# --------------------------------------------------------------------------------------------------
data "aws_caller_identity" "current" {}

# --------------------------------------------------------------------------------------------------
# AWS Region
# https://www.terraform.io/docs/providers/aws/d/region.html
# https://docs.aws.amazon.com/general/latest/gr/rande.html
# https://aws.amazon.com/about-aws/global-infrastructure/regional-product-services/
# --------------------------------------------------------------------------------------------------
data "aws_region" "current" {}

variable "aws_default_region" {
  default = ""
}

variable "aws_region" {
  default = "us-east-1"
}

provider "aws" {
  version = "~> 2.6"
  # region = "${var.aws_region}"
}

# --------------------------------------------------------------------------------------------------
# AWS VPC
# https://www.terraform.io/docs/providers/aws/d/vpc.html
# --------------------------------------------------------------------------------------------------

# variable "vpc_id" {
#   description = "The ID for your Amazon VPC."
# }

# data "aws_vpc" "selected" {
#   id = "${var.vpc_id}"
# }

# --------------------------------------------------------------------------------------------------
# AWS Subnets
# https://www.terraform.io/docs/providers/aws/d/subnet_ids.html
# --------------------------------------------------------------------------------------------------
# data "aws_subnet_ids" "selected" {
#   vpc_id = "${data.aws_vpc.selected.id}"
# }

# --------------------------------------------------------------------------------------------------
# AWS Availability Zones
# https://www.terraform.io/docs/providers/aws/d/availability_zones.html
# --------------------------------------------------------------------------------------------------
data "aws_availability_zones" "available" {}

# --------------------------------------------------------------------------------------------------
# AWS AMI's
# https://www.terraform.io/docs/providers/aws/d/ami.html
# https://docs.aws.amazon.com/AmazonECS/latest/developerguide/ecs-optimized_AMI.html
# --------------------------------------------------------------------------------------------------

# Find the latest available AMI that is ECS-optimized Amazon Linux 2
data "aws_ami" "informa_ap_amazon_linux_2" {
  most_recent      = true
  name_regex       = "^informa-ap-amzn2-ami-ecs-.*"
  owners           = ["self"]

  filter {
    name   = "name"
    values = ["informa-ap-amzn2-ami-ecs-*"]
  }
}
# ~> data.aws_ami.informa_ap_amazon_linux_2.id
