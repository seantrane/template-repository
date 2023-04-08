# https://hub.docker.com/_/rabbitmq
FROM rabbitmq:alpine

RUN echo "Installing dependencies." \
  \
  && apk update && apk add --no-cache --update \
    bash \
  \
  && echo "Done installing dependencies." \
  ;

COPY docker-healthcheck /usr/local/bin/

HEALTHCHECK \
  --interval=3m33s \
  --timeout=9s \
  --start-period=60s \
  --retries=3 \
  CMD ["docker-healthcheck"]
