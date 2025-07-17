# Problem 5 – Run with Docker Compose

This project is a TypeScript/NestJS server with a MongoDB database. You can run the entire stack (API server + MongoDB + data migrations) using Docker Compose.

## Prerequisites

- [Docker](https://docs.docker.com/get-docker/) installed
- [Docker Compose](https://docs.docker.com/compose/install/) installed

## Quick Start

1. **Build and start the services**

   Run this command in the terminal

   ```bash
   docker-compose up -d
   ```

   This will:
   - Start a MongoDB container
   - Build and start the NestJS server container
   - Run the migration script to seed initial data from the `migrations` folder

2. **Access the API**

   The server will be available at [http://localhost:3000](http://localhost:3000).
   You can access to the [http://localhost:3000/api](http://localhost:3000/api) to view the endpoint models

   Example endpoint:

   ```http
   GET http://localhost:3000/v1/products
   ```

## Overview

- Tech stack: NodeJS, MongoDB
- Framework: NestJS
- Architecture: Based on clean architecture.

## Application structure

### Entities

- Represent your domain object.
- Contain only logic that is universally applicable to the entity.
- Use plain objects — no frameworks, no annotations.

### Entrypoints

- Interfaces for interacting with the application (e.g. REST APIs, GRPC, scheduled jobs, even-listener, other systems).
- Trigger use cases and convert the results into the appropriate response format.

### Infrastructure

- Integrates with external resources like databases, caches, event buses, etc.
- Implement the interfaces defined by the use case.
- Interact with use case through those interfaces, which make it easier to change or replace the external dependencies.

### Shared

- Contains globally used elements such as constants, error definitions, and common interfaces

### Use case

- Represent your business actions, it’s what you can do with the application. Expect one use case for each business action
- Contains pure business logic, written in plain TypeScript (expect maybe some utils libraries like lodash)
- Define interfaces for the data they need, without knowing where the data comes from
- Are independent of how they are triggered or how their results are presented.
