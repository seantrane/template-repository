
locals {
  aws_default_region = "${var.aws_default_region != "" ? var.aws_default_region : "${data.aws_region.current.name}"}"
  # Set shorthand region key for use in resource naming and tagging.
  aws_region_key = "${var.aws_region_key != "" ? var.aws_region_key : "${var.aws_region_keys["${data.aws_region.current.name}"]}"}"

  # These local variables are human-friendly app titles, for use in naming and tagging of resources
  # app_title = "${var.app_category} - ${var.app_name} ${var.app_service}" // ex; Users - Preferences API
  app_title = "${var.app_category} - ${var.app_title} ${var.app_service}" // ex; Users - Preferences API
  app_env_title = "${local.app_title} - ${var.env}" // ex; Users - Preferences API - PROD

  # These local variables are "slugified" app title-keys, for use in resource and module naming
  app_key = "${replace(replace(replace(lower(trimspace(local.app_title)), " ", "-"), "_", "-"), "---", "-")}" // ex; users-preferences-api
  app_env_key = "${replace(replace(replace(lower(trimspace(local.app_env_title)), " ", "-"), "_", "-"), "---", "-")}" // ex; users-preferences-api-prod

  # Common tags to be assigned to all resources
  common_tags = {
    Author      = "${var.app_author}"
    Origin      = "${var.app_origin}"
    Category    = "${var.app_category}"
    App         = "${var.app_name}"
    Service     = "${var.app_service}"
    Description = "${var.app_description}"
  }
  env_tags = {
    Environment = "${var.env}"
  }
  common_env_tags = "${merge(local.common_tags, local.env_tags)}"

  # vpc_id = "${var.vpc_id != "" ? var.vpc_id : "${data.aws_vpc.selected.id}"}"
}
