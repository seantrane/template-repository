#!/usr/bin/env bash
#
# Output a table of Docker containers and their respective memory consumptions.
# See: https://fuzzyblog.io/blog/docker/2017/06/25/docker-tutorial-understanding-container-memory-usage.html

docker_stats__description () {
  echo "Output a table of Docker containers and their respective memory consumptions."
}

docker_stats__help () {
  echo "
  docker_stats

    $(docker_stats__description)

    See: https://fuzzyblog.io/blog/docker/2017/06/25/docker-tutorial-understanding-container-memory-usage.html

  Globals:

    docker

  Usage: docker_stats [options] [arguments]

  Options:

    --help  Show help text and exit.

  Arguments:

    None

  Returns:

    None

  Examples:

    docker_stats
  "
}

################################################################################
# Output a table of Docker containers and their respective memory consumptions.
# Globals:
#   docker
# Options:
#   --help  Show help text and exit.
# Arguments:
#   None
# Returns:
#   None
################################################################################
docker_stats () {
  # Fail-fast on global requirements.
  if ! type "docker" &> /dev/null; then
    echo "'docker' not found. Ensure 'docker' can be found in \$PATH, or is sourced/imported properly."
    return 1
  fi
  # Loop through function options and arguments.
  while [[ $# -gt 0 ]]; do
    local _key="${1:-}"
    case "$_key" in
      --help)
        docker_stats__help
        return
        ;;
      --info)
        docker_stats__description
        return
        ;;
      *)
        break
        ;;
    esac
    shift
  done

  echo
  echo "Table of Docker containers and their respective memory consumptions..."
  echo
  # shellcheck disable=SC2046
  docker stats --format "table \t\t" $(docker ps|grep -v "NAMES"|awk '{ print $NF }'|tr "\n" " ")
  echo
}
