
FROM quay.io/keycloak/keycloak:26.4.5

ENV KC_HTTP_ENABLED=true
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_HEALTH_ENABLED=true

EXPOSE 10000

CMD ["start-dev", "--http-port=10000"]
