FROM quay.io/keycloak/keycloak:26.4.5

ENV KC_HTTP_ENABLED=true
ENV KC_HTTP_HOST=0.0.0.0
ENV KC_HTTP_PORT=10000
ENV KC_HOSTNAME_STRICT=false
ENV KC_PROXY_HEADERS=xforwarded
ENV KC_HEALTH_ENABLED=true
ENV KC_DB=dev-file
ENV JAVA_OPTS_KC_HEAP="-Xms64m -Xmx192m"

EXPOSE 10000

ENTRYPOINT ["/opt/keycloak/bin/kc.sh"]
CMD ["start-dev", "--http-port=10000"]