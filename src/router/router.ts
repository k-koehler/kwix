import { ConcreteController, RouteMethod } from "../defs";
import { Request, Response } from "../io";
import Server from "../io/server";
import Route from "../route/route";

export default abstract class Router<Rq extends Request, Rs extends Response> {
  protected abstract server: Server<Rq, Rs>;

  public bindRoute(
    route: string,
    Controller: ConcreteController<Rq, Rs>,
    method: RouteMethod
  ) {
    new (class extends Route<Rq, Rs> {
      public Controller = Controller;
      public route = route;
      public method = method;
    })(this.server).listen();
  }

  public methods() {
    return {
      Get: (route: string) => {
        return (Controller: ConcreteController<Rq, Rs>) => {
          this.bindRoute(route, Controller, RouteMethod.Get);
        };
      },

      Post: (route: string) => {
        return (Controller: ConcreteController<Rq, Rs>) => {
          this.bindRoute(route, Controller, RouteMethod.Post);
        };
      },

      Put: (route: string) => {
        return (Controller: ConcreteController<Rq, Rs>) => {
          this.bindRoute(route, Controller, RouteMethod.Put);
        };
      },

      Patch: (route: string) => {
        return (Controller: ConcreteController<Rq, Rs>) => {
          this.bindRoute(route, Controller, RouteMethod.Patch);
        };
      },

      Delete: (route: string) => {
        return (Controller: ConcreteController<Rq, Rs>) => {
          this.bindRoute(route, Controller, RouteMethod.Delete);
        };
      },
    };
  }
}
