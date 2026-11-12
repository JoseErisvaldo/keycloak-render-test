# Keycloak para teste no Render

Este projeto sobe o Keycloak usando a imagem oficial Docker, em modo de desenvolvimento, para testes rápidos.

## Publicar no Render

1. Crie um repositório no GitHub e envie estes arquivos para a raiz do repositório.
2. Entre em https://render.com e escolha **New +** → **Blueprint**.
3. Conecte o repositório que contém `render.yaml`.
4. Antes de criar o serviço, informe `KC_BOOTSTRAP_ADMIN_PASSWORD` quando solicitado. Use uma senha forte e exclusiva.
5. Faça o deploy e aguarde o serviço ficar disponível.
6. Abra a URL pública gerada pelo Render. Entre no painel de administração com:
   - Usuário: `admin` (ou o valor configurado em `KC_BOOTSTRAP_ADMIN_USERNAME`)
   - Senha: a que você configurou em `KC_BOOTSTRAP_ADMIN_PASSWORD`

## Primeiro teste

1. No painel, crie um Realm, por exemplo `empresa`.
2. Dentro do Realm, crie um Client para sua aplicação.
3. Para uma SPA React, configure o client como público (client authentication desativada), habilite Standard Flow e configure URLs de redirect e web origins para as URLs reais do frontend.
4. Crie um usuário de teste e defina uma senha na aba Credentials.

## Limitações importantes

- Este modelo usa `start-dev` e o banco de desenvolvimento interno do Keycloak. É apenas para aprender/testar.
- Em serviços gratuitos, o Render pode suspender o serviço após inatividade.
- Sem um banco PostgreSQL externo e persistente, dados/configurações podem ser perdidos quando o serviço é recriado ou o armazenamento efêmero é descartado.
- Não use esta configuração para produção. Para produção, configure PostgreSQL persistente, hostname público explícito, HTTPS/proxy corretamente, backups e o modo `start`.

## Variáveis usadas

- `KC_BOOTSTRAP_ADMIN_USERNAME`: usuário inicial do administrador.
- `KC_BOOTSTRAP_ADMIN_PASSWORD`: senha inicial do administrador.
- `PORT`: porta fornecida pelo Render; o comando usa `10000` como fallback.

Documentação oficial:
https://www.keycloak.org/server/containers
https://www.keycloak.org/getting-started/getting-started-docker
