import "reflect-metadata";
import {createConnection} from "typeorm";
import * as express from "express";
import * as bodyParser from "body-parser";
import {Request, Response} from "express";
import * as cors from "cors";

<%- entityRoutes %>
<%- entities %>

createConnection().then(async connection => {

    const app = express();
    app.use(bodyParser.json());
    app.use(cors());

    // register express routes from defined application routes
<%- entityRegister %>
    app.listen(<%= apiPort %>);

    console.log("Express server has started on port <%= apiPort %>.");

}).catch(error => console.log(error));
