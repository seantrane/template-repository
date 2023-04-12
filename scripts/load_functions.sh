#!/usr/bin/env bash
#
# Load/source functions
# Accepts an array of function names, and then sources their respective files.
# It will search for the function within the './scripts' directory, up to 3 levels deep.

set -e

__scripts_path="$(cd "$(dirname "${BASH_SOURCE[0]}")" && pwd)"

# Loop through function names, provided via arguments to this file.
for _func_name in "$@"; do
  # First, check that the function hasn't already been loaded.
  # "{function_name}__help" used to ensure the file itself is sourced, not just the binary.
  # This is because some files contain multiple functions, not just the primary function (binary).
  if ! type "${_func_name}__help" &> /dev/null; then
    # for file in ./scripts/functions[/{git,node,...}]/{function_name}.sh; do
    # shellcheck disable=SC2044
    for _file in $(find -H "$__scripts_path" -perm -u+r -maxdepth 3 -type f -name "${_func_name}.sh"); do
      # shellcheck disable=SC1090,SC1091,SC2163
      . "$_file"
    done
    unset _file
  fi
done
unset _func_name
