import {
  createServer,
  Factory,
  Model,
  Response,
  ActiveModelSerializer,
} from "miragejs";
import faker from "faker";

type User = {
  name: string;
  email: string;
  created_at: string;
};

export function makeServer() {
  const server = createServer({
    serializers: {
      application: ActiveModelSerializer,
    },
    models: {
      user: Model.extend<Partial<User>>({}),
    },
    factories: {
      user: Factory.extend({
        name(index) {
          return `${faker.name.firstName()} ${faker.name.lastName()}`;
        },
        email() {
          return faker.internet.email().toLocaleLowerCase();
        },
        created_at() {
          return faker.date.recent(10);
        },
      }),
    },
    seeds(server) {
      server.createList("user", 20);
    },
    routes() {
      this.namespace = "api";
      this.timing = 750;
      this.get("/users", function (schema, request) {
        const { page, per_page = 10 } = request.queryParams;
        const total = this.serialize(schema.all("user").length);
        console.log("Total Users :: ", total);
        const pageStart = (Number(page) - 1) * Number(per_page);
        const pageEnd = pageStart + Number(per_page);
        const users = this.serialize(schema.all("user")).users.slice(
          pageStart,
          pageEnd
        );
        return new Response(
          200,
          { "x-total-count": String(total) },
          { users, counter: total }
        );
      });
      this.get("/users/:id");
      this.post("/users");
      this.namespace = ""; // I set this field just to avoid some conflict with api folder inside of src for next
      this.passthrough();
    },
  });

  return server;
}
