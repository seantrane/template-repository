# https://hub.docker.com/_/sonarqube
FROM sonarqube:lts

RUN echo "Installing dependencies." \
  \
  && apt-get update && apt-get install --no-install-recommends --no-install-suggests -yq \
    bash \
  && rm -rf /var/lib/apt/lists/* \
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
