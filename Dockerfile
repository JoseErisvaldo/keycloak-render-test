FROM quay.io/keycloak/keycloak:26.4.5 AS builder

ENV KC_HEALTH_ENABLED=true
ENV KC_METRICS_ENABLED=true
ENV KC_DB=dev-file

RUN /opt/keycloak/bin/kc.sh build

FROM quay.io/keycloak/keycloak:26.4.5

COPY --from=builder /opt/keycloak/ /opt/keycloak/

ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_HOST=0.0.0.0
ENV KC_HTTP_PORT=10000
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_HEALTH_ENABLED=true
ENV KC_DB=dev-file
ENV JAVA_OPTS_KC_HEAP="-Xms64m -Xmx256m"

EXPOSE 10000

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start", "--optimized", "--http-enabled=true", "--http-host=0.0.0.0", "--http-port=10000", "--hostname-strict=false"]