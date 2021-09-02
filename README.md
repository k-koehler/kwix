# `kwix`

## Description

`kwix` is a framework-agnostic library for building scalable, object-oriented, typescript nodejs applications. `kwix` uses a controller/middleware pattern allowing you to build extensible controllers and middlewares.

## Getting started

`kwix` ships with fastify/express support. To get started simply create a router and go wild with controllers!

```typescript
// app.ts
import fastify from "fastify";
import { FastifyRouter, FastifyServer } from "kwix/fastify";

const app = fastify();

export const { Get, Post, Patch, Delete } = new FastifyRouter(
  new FastifyServer(app)
).methods();

export default app;
```

```typescript
// controller.ts
import { FastifyController } from "kwix/fastify";

@Get("/hello-world")
export default class HelloWorldController extends FastifyController {
  protected handle(){
    return this.success()
  }
}
```

## Using custom frameworks

Firstly, select an http framework of your choice, i.e. express/fastify.

Next, implement response/request objects using said framework:

```typescript
// io.ts
import { Request, Response } from "kwix";

export class MyAwesomeFrameworkRequest extends Request {
  // implement body, query, headers, and params abstract methods here
}

export class MyAwesomeFrameworkResponse extends Response {
  // expose any framework specific methods you might need on the response here
}
```

Next, implement a server, so that `kwix` knows how to bind to your framework.

```typescript
//server.ts 
import { ConcreteController, Controller, RouteMethod, Server } from "kwix";
import { MyAwesomeFrameworkRequest, MyAwesomeFrameworkResponse } from "./io";

export default class MyAwesomeFrameworkServer extends Server<
  MyAwesomeFrameworkRequest,
  MyAwesomeFrameworkResponse
> {
  // implement handle abstract method here
}
```

Next, implement a router and bind the router to your framework server instance.

```typescript
// router.ts
import { Router } from "kwix";
import { MyAwesomeFrameworkRequest, MyAwesomeFrameworkResponse } from "./io";
import MyAwesomeFrameworkServer from "./server";

export default class MyAwesomeFrameworkRouter extends Router<
  MyAwesomeFrameworkRequest,
  MyAwesomeFrameworkResponse
> {
  protected server: MyAwesomeFrameworkServer;

  public constructor(server: MyAwesomeFrameworkServer) {
    super();
    this.server = server;
  }
}
```

```typescript
// app.ts
import instance from "my-awesome-framework";
import MyAwesomeFrameworkServer from "./server";
import MyAwesomeFrameworkRouter from "./router";

const app = instance();

export const { Get, Post, Patch, Delete } = new MyAwesomeFrameworkRouter(
  new MyAwesomeFrameworkServer(app)
).methods();

export default app;
```

Next, implement a base controller:

```typescript
// base-controller.ts
import { MyAwesomeFrameworkRequest, MyAwesomeFrameworkResponse } from "./io";
export default abstract class BaseController extends MiddlewareController<
  MyAwesomeFrameworkRequest,
  MyAwesomeFrameworkResponse
> {
  // implement success, bad request, etc. abstract methods here
}
```

LASTLY, create controllers at will!

```typescript
// hello-world-controller.ts
import BaseController from "./base-controller";

@Get("/hello-world")
export default class HelloWorldController extends BaseController {
  protected handle(){
    return this.success();
  }
}
```
