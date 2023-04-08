#!/usr/bin/env bash
#
# Cleans Docker container/image from most recent commands.

docker_clean__description () {
  echo "Cleans Docker container/image from most recent commands."
}

docker_clean__help () {
  echo "
  docker_clean

    $(docker_clean__description)

    -  Accepts Docker container/image name/ID as arguments or options.
    -  Default action is to remove most recent container/image.
    -  If 'all' is only argument, then all containers/images are removed.
    -  docker-kill is executed during all removal commands.

  Globals:

    docker

  Usage: docker_clean [options] [arguments]

  Options:

    --container   Remove a Docker container by name/ID, or last container.
                  If 'all', then all containers and images are removed.
                  Default: \$(docker ps -aq -l)
    --image       Remove a Docker image by name/ID.
    --all         Remove all Docker containers and images.
    --help        Show help text and exit.

  Arguments:

    [1] \$_container  Remove a Docker container by name/ID, or last container.
                      If 'all', then all containers and images are removed.
                      Default: \$(docker ps -aq -l)
    [2] \$_image      Remove a Docker image by name/ID.

  Returns:

    None

  Examples:

    Remove last container:

      docker_clean

    Remove all containers and images:

      docker_clean all

    Remove container by name/ID:

      docker_clean [container_name]

      docker_clean --container [container_name]

    Remove image by name/ID:

      docker_clean [container_name] [image_name]

      docker_clean --container [container_name] --image [image_name]

      docker_clean --image [image_name]
  "
}

################################################################################
# Cleans Docker container/image from most recent commands.
# Globals:
#   docker
# Options:
#   --container  Remove a Docker container by name/ID, or last container.
#                If 'all', then all containers and images are removed.
#                Default: $(docker ps -aq -l)
#   --image      Remove a Docker image by name/ID.
#   --all        Remove all Docker containers and images.
#   --help       Show help text and exit.
# Arguments:
#   [1] $_container   Remove a Docker container by name/ID, or last container.
#                     If 'all', then all containers and images are removed.
#                     Default: $(docker ps -aq -l)
#   [2] $_image       Remove a Docker image by name/ID.
# Returns:
#   None
################################################################################
docker_clean () {
  # Fail-fast on global requirements.
  if ! type "docker" &> /dev/null; then
    echo "'docker' not found. Ensure 'docker' can be found in \$PATH, or is sourced/imported properly."
    return 1
  fi
  # Declare variables.
  local _container _image
  # Set variable defaults.
  _container="$(docker ps -aq -l)"
  # Loop through function options and arguments.
  while [[ $# -gt 0 ]]; do
    local _key="${1:-}"
    case "$_key" in
      --help)
        docker_clean__help
        return
        ;;
      --info)
        docker_clean__description
        return
        ;;
      --container)
        _container="${2:-}"
        shift
        ;;
      --image)
        _image="${2:-}"
        shift
        ;;
      --all)
        _container="all"
        shift
        ;;
      *)
        [[ -n "$_key" ]] && _container="$_key"
        [[ -n "${2:-}" ]] && _image="${2:-}"
        break
        ;;
    esac
    shift
  done

  echo
  echo "List all Docker containers."
  echo
  docker ps -a
  echo

  if [[ "${_container:-}" = "all" ]] && [[ "$(docker images -a -q)" ]]; then
    _image="all"
  fi

  if [[ -n "${_image:-}" ]]; then
    echo "List all Docker images."
    echo
    docker images
    echo
    if [[ "${_image:-}" = "all" ]]; then
      echo "Remove all Docker containers and images."
      echo
      # shellcheck disable=SC2046
      docker rmi -f $(docker images -a -q) < /dev/null 2> /dev/null
    else
      echo "Remove Docker image '${_image:-}'."
      echo
      docker rmi -f "${_image:-}" < /dev/null 2> /dev/null
    fi
    echo
    echo "List all Docker images."
    echo
    docker images
  elif [[ -n "${_container:-}" ]]; then
    echo "Remove Docker container '${_container:-}'."
    echo
    docker rm -f "${_container:-}" < /dev/null 2> /dev/null
  fi

  echo
  echo "List all Docker containers."
  echo
  docker ps -a
  echo
  echo "Done."
  echo
}
