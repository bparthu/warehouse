# warehouse
[![lerna](https://img.shields.io/badge/maintained%20with-lerna-cc00ff.svg)](https://lerna.js.org/)

Set up instructions:

Run local instance of mysql server. Wait for about 30s for service become healthy
```bash
$ docker-compose up -d
$ docker ps
CONTAINER ID        IMAGE               COMMAND                  CREATED             STATUS                    PORTS                               NAMES
c4496660a517        mysql:8.0.19        "docker-entrypoint.s…"   56 seconds ago      Up 55 seconds (healthy)   0.0.0.0:3306->3306/tcp, 33060/tcp   mysql
```

Install dependencies
```bash
$ npm i
```

Run bootstrap to setup dependencies / links across apps / packages in mono repo
```bash
$ npm run bootstrap
```

Build all projects
```bash
npm run build
```

Seed warehouse database tables with json files available in /seed_files directory
```bash
npm run seed
```

Start api - API server runs by default on port 3000
```bash
npm run debug:api
```

Run tests - Have added integration tests for api
```bash
$ npm run test:api
```

Handy curls
```bash
$ curl -X GET http://localhost:3000/api/v1/products
$ curl -X DELETE http://localhost:3000/api/v1/products/63c5ca629911a65ab6f40b12a8ae7153
```

:rainbow: Have a nice day :sunny: