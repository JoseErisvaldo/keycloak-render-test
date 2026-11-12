
FROM quay.io/keycloak/keycloak:26.4.5

ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_HEALTH_ENABLED=true
ENV JAVA_OPTS_KC_HEAP="-XX:InitialRAMPercentage=15 -XX:MaxRAMPercentage=40 -XX:+UseSerialGC"

EXPOSE 10000

CMD ["start-dev", "--http-port=10000"]
