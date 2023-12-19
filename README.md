[![Open in Gitpod](https://gitpod.io/button/open-in-gitpod.svg)](https://gitpod.io/#https://github.com/subsquid/squid-evm-template)

# Ethscriptions squid

## Overview
This repository contains the EthScriptions Indexer, a tool designed to index Ethereum transactions specifically for 'ethscriptions', using the Squid SDK. It features functionality to decode transaction inputs, verify Data URIs for correctness and uniqueness, and efficiently manage and query indexed data.

## Features

1. **Transaction Decoding**: 
   - Decodes Ethereum transaction inputs to extract relevant data.

2. **Data URI Verification**: 
   - Validates the format and uniqueness of Data URIs in the transactions.

3. **Uniqueness Check**: 
   - Ensures that each inscription is unique within the blockchain context.

## Quickstart

```bash
# 0. Install @subsquid/cli a.k.a. the sqd command globally
npm i -g @subsquid/cli

# 1. Retrieve the template
git clone https://github.com/[your-username]/eth-scriptions.git
cd eth-scriptions

# 2. Install dependencies
npm ci

# 3. Start a Postgres database container and detach
sqd up

# 4. Build the squid
sqd build

# 5. Start both the squid processor and the GraphQL server
sqd run .
```
A GraphiQL playground will be available at [localhost:4350/graphql](http://localhost:4350/graphql).

You can also start squid services one by one:
```bash
sqd process
sqd serve
```


## Project conventions

Squid tools assume a certain [project layout](https://docs.subsquid.io/basics/squid-structure):

* All compiled js files must reside in `lib` and all TypeScript sources in `src`.
The layout of `lib` must reflect `src`.
* All TypeORM classes must be exported by `src/model/index.ts` (`lib/model` module).
* Database schema must be defined in `schema.graphql`.
* Database migrations must reside in `db/migrations` and must be plain js files.
* `sqd(1)` and `squid-*(1)` executables consult `.env` file for environment variables.
