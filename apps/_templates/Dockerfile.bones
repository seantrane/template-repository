################################################################################
#
# BUILD STAGE
#
################################################################################
FROM busybox as build

RUN echo "BUILD STAGE started." \
  \
  && echo "Install operating systems dependencies." \
  \
  && echo "Install application dependencies." \
  \
  && echo "Build application." \
  \
  && echo "Run static analysis (linters, style checks) on support scripting and docs." \
  \
  && echo "BUILD STAGE complete." \
  ;

################################################################################
#
# TEST STAGE
#
################################################################################
FROM build as test

RUN echo "TEST STAGE started." \
  \
  && echo "Run Static Analysis (linters, style checks) on application files." \
  \
  && echo "Run Static Analysis for Vulnerabilities, Bugs, Code Smells, Duplications, Lines-of-Code, Cyclomatic Complexity and Cognitive Complexity." \
  \
  && echo "Run Unit Tests for all lines of code and code paths." \
  \
  && echo "Run Integration and End-to-End Testing to ensure clients and users of application are not negatively impacted by any changes." \
  \
  && echo "Run Security White-Box Testing to ensure penetration tests can be run from local machines." \
  \
  && echo "Run Load Testing to determine application runtime limitations and plan for scalability requirements." \
  \
  && echo "TEST STAGE complete." \
  ;

################################################################################
#
# REPORT STAGE
#
################################################################################
FROM test as report

RUN echo "REPORT STAGE started." \
  \
  && echo "Run scans and publish reports about the application." \
  \
  && echo "REPORT STAGE complete." \
  ;

################################################################################
#
# PREPARE STAGE
#
################################################################################
FROM build as prepare

RUN echo "PREPARE STAGE started." \
  \
  && echo "Prepare and package the application." \
  \
  && echo "PREPARE STAGE complete." \
  ;

################################################################################
#
# RUN STAGE
#
################################################################################
FROM busybox as run

RUN echo "RUN STAGE started." \
  \
  && echo "Configure the runtime environment for the application." \
  ;

COPY --from=prepare . "${WORK_DIR}/"

RUN echo "Final preparation of application files." \
  \
  && echo "RUN STAGE complete." \
  ;

EXPOSE ${PORT:-8000}

CMD ["echo", "Hello world"]
