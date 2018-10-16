import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";

<%- entityRoutes %>
<%- entities %>

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());

    // register express routes from defined application routes
<%- entityRegister %>
    app.listen(3000);

    console.log("Express server has started on port 3000. Open http://localhost:3000/users to see results");

}).catch(error => console.log(error));
