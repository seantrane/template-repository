#!/bin/bash

set -e

PROCESS_ENV="local"

if [[ -n "${NODE_ENV:-}" ]]; then
  PROCESS_ENV="${NODE_ENV}"
elif [[ -n "${ENV:-}" ]]; then
  PROCESS_ENV="${ENV}"
fi

NODE_ENV="${PROCESS_ENV}"
ENV="${PROCESS_ENV}"

node "${WORK_DIR:-/usr/src/app}/src/server.js"
