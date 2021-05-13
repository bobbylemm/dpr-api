import {
    Resolver,
    Mutation,
    Arg,
    Ctx,
    ObjectType,
    Field
} from "type-graphql";

import { MyContext } from "../../shared/types";
import User from '../../schemas/User'
import AuthRepo from "./authRepository";
import { AuthRegisterInput, AuthLoginInput } from "./authInput";
import FieldError from "../../schemas/FieldError";

@Resolver(User)
export class AuthResolver {
    private readonly repo: AuthRepo;

    constructor() {
        this.repo = new AuthRepo();
    }

    @Mutation(() => User)
    async register(
        @Arg("payload", () => AuthRegisterInput) payload: AuthRegisterInput,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        let user;
        try {
            user = await this.repo.register(payload)
        } catch (err) {
            console.log(err, 'error')
        }
        return user
    }

    @Mutation(() => User)
    async login(
        @Arg("payload", () => AuthLoginInput) payload: AuthLoginInput,
        @Ctx() { req }: MyContext
    ): Promise<User> {
        let user;
        try {
            user = await this.repo.login(payload)
        } catch (err) {
            console.log(err, 'err')
        }

        return user;
    }
}