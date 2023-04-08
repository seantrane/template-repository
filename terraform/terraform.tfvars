# --------------------------------------------------------------------------------------------------
# Primary/Required Variables
# --------------------------------------------------------------------------------------------------

# Set shorthand region key for use in resource naming and tagging.
aws_region_key = "${var.aws_region_keys["${data.aws_region.current}"]}"
