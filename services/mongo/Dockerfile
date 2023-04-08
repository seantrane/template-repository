# https://hub.docker.com/_/mongo
FROM mongo

COPY docker-healthcheck /usr/local/bin/

HEALTHCHECK \
  --interval=3m33s \
  --timeout=9s \
  --start-period=60s \
  --retries=3 \
  CMD ["docker-healthcheck"]
