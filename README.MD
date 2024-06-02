# Menhir Finder

## Creators

> RIVIERE--JOMBART Diego
> MAMMERI Rayan
> RIGARD Lobsang

## Prerequisites

- Having the following software installed
  - Docker
  - Docker Desktop
  - Docker Compose
  - Composer

- Having the following ports available
  - 9000
  - 3306
  - 8080

## Setup

You first need to build the php api by running the following commands

```bash
cd apis/api-php &&
composer install &&
cd ../../
```

You then need to compile the client

```bash
cd client &&
npm i &&
npm run build &&
cd ../../
```

Now to run the project, run the following command

```bash
docker compose up
```

## License

This project is licensed under an [MIT license](./LICENSE)
