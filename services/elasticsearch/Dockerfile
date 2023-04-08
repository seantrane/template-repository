# https://hub.docker.com/_/elasticsearch
# https://www.elastic.co/guide/en/elasticsearch/reference/current/docker.html
FROM elasticsearch:7.10.1

COPY docker-healthcheck /usr/local/bin/

HEALTHCHECK \
  --interval=3m33s \
  --timeout=9s \
  --start-period=60s \
  --retries=3 \
  CMD ["docker-healthcheck"]
