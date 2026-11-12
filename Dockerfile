FROM quay.io/keycloak/keycloak:26.4.5

ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_HEALTH_ENABLED=true
ENV KC_HTTP_PORT=10000
ENV JAVA_OPTS_KC_HEAP="-Xms64m -Xmx256m"

EXPOSE 10000

CMD ["start-dev", "--http-port=10000", "--http-host=0.0.0.0"]