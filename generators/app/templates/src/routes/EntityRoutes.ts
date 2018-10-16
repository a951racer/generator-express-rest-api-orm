import {<%= entityName %>Controller} from "../controllers/<%= entityName %>Controller";

export const <%= entityName %>Routes = [{
    method: "get",
    route: "/api/<%= entityNameLower %>",
    controller: <%= entityName %>Controller,
    action: "all"
}, {
    method: "get",
    route: "/api/<%= entityNameLower %>/:id",
    controller: <%= entityName %>Controller,
    action: "one"
}, {
    method: "post",
    route: "/api/<%= entityNameLower %>",
    controller: <%= entityName %>Controller,
    action: "save"
}, {
    method: "put",
    route: "/api/<%= entityNameLower %>/:id",
    controller: <%= entityName %>Controller,
    action: "update"
}, {
    method: "delete",
    route: "/api/<%= entityNameLower %>/:id",
    controller: <%= entityName %>Controller,
    action: "remove"
}];