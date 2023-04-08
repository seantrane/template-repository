# --------------------------------------------------------------------------------------------------
# Primary/Required Variables
# --------------------------------------------------------------------------------------------------

variable "env" {
  description = "Environment, e.g.; DEV | UAT | PROD"
  default = "PROD"
}
variable "stage" {
  description = "Stage, e.g.; 'prod', 'staging', 'dev', or 'test'"
  default = "prod"
}

variable "build_path" {
  description = "Path of image build directory (containing Dockerfile), e.g.; '/path/to/build'"
  default = "build"
}

variable "temp_path" {
  description = "Path of temp directory, e.g.; '/path/to/temp'"
  default = "temp"
}

variable "namespace" {
  description = "Namespace, which could be your organization name, e.g.; 'abc'"
}
variable "app_name" {
  description = "Truncated/short name of application (ex; auth, preferences, search, ...)"
}
variable "app_author" {
  description = "Author/Team name (ex; Jane Doe, Customer Engagement, ...)"
}
variable "app_origin" {
  description = "Origin code repository, (ex; <user>/<repo>, <org>/<repo>, ...)"
}
variable "app_category" {
  description = "Business/Platform Domain or Application Category (ex; Core, Users, Orders, ...)"
}
variable "app_title" {
  description = "Short title of application (ex; Auth, Preferences, Search, ...)"
}
variable "app_service" {
  description = "Truncated/short [micro-]service name (ex; agent, api, dashboard, website, ...)"
}
variable "app_description" {
  description = "What does the service/resource do?"
}

variable "app_version_label" {
  description = "App name and version, as a tag, e.g.; 'latest' or 'app-name-v1.2.3-20190131'"
  default = "latest"
}

variable "app_ci_s3_uri" {
  description = "App name and version, as a filename, e.g.; 'latest' or 'app-name-v1.2.3-20190131.zip'"
  default = "latest.zip"
}

# --------------------------------------------------------------------------------------------------
# Defaults
# --------------------------------------------------------------------------------------------------

variable "aws_region_keys" {
  description = "Array of region keys and their respective shorthand values."
  default     = {
    "us-east-1"      = "use1"   // Northern Virginia
    "us-west-2"      = "usw2"   // Oregon
    "eu-west-1"      = "euw1"   // Ireland
    "eu-central-1"   = "euc1"   // Frankfurt
    "ap-northeast-1" = "apne1"  // Tokyo
    "ap-southeast-1" = "apse1"  // Singapore
    "ap-southeast-2" = "apse2"  // Sydney
  }
}
variable "aws_region_key" {
  description = "Shorthand region key for use in resource naming and tagging."
  default = "use1"
}

# https://ec2instances.info
variable "default_InstanceTypes" {
  type = "map"
  default = {
    dev  = "t3.micro"
    uat  = "t3.micro"
    prod = "t3.micro"
  }
}
