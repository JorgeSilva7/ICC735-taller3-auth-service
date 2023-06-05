# ICC735 - Taller 3 : Auth Service

## Auth service endpoints

- Register: ✅ (only on local environment)
- Login: ✅
- Verify Email: ✅
- Get User: ✅

## Initialize and run local

_Need a mongo database connection_

```
Set the environment variables in env/.local.env file:
- HOST: HOST for swagger client
- PORT: running port number and for swagger client
- MONGO_URI: Mongo URI full format `mongodb://user:pass@host:port/databaseName`
```

## Run locally

```
npm i
npm run local
```

## Tests and coverage

```
npm run test
npm run coverage
```
