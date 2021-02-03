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

install dependencies
```bash
$ npm i
```

build all projects
```bash
npm run build
```

Run bootstrap to setup dependencies / links across apps / packages in mono repo
```bash
$ npm run bootstrap
```

Seed warehouse database tables with json files available in /seed_files directory
```bash
npm run seed-all
```

start api - API server runs by default on port 3000
```bash
npm run api
```

run tests - Have added some very basic tests. Below script will run tests across all projects in mono repo
```bash
$ npm run test
```

handy curls
```bash
$ curl -X GET http://localhost:3000/v1/products
$ curl -X DELETE http://localhost:3000/v1/products/7b7583ad0304bf7ca2eb78f169ebbd83
```

I will add few more documentation / code comments / add more tests before the discussion.

:rainbow: Have a nice day :sunny: