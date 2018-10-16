import {getRepository} from "typeorm";
import {NextFunction, Request, Response} from "express";

<%- entityImport %>

export class <%= entityName %>Controller {

    private <%= entityNameLower %>Repository = getRepository(<%= entityName %>);

    async all(request: Request, response: Response, next: NextFunction) {
        return this.<%= entityNameLower %>Repository.find();
    }

    async one(request: Request, response: Response, next: NextFunction) {
        return this.<%= entityNameLower %>Repository.findOne(request.params.id);
    }

    async save(request: Request, response: Response, next: NextFunction) {
        return this.<%= entityNameLower %>Repository.save(request.body);
    }

    async update(request: Request, response: Response, next: NextFunction) {
        return this.<%= entityNameLower %>Repository.update(request.params.id, request.body);
    }

    async remove(request: Request, response: Response, next: NextFunction) {
        return this.<%= entityNameLower %>Repository.delete(request.params.id);
    }
}