import {
    Resolver,
    Mutation,
    Arg,
    Ctx,
    Query,
} from "type-graphql";

import { MyContext } from "../../shared/types";
import User from '../../schemas/User'
import AuthRepo from "./authRepository";
import { AuthRegisterInput, AuthLoginInput } from "./authInput";

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
        req.session!.userId = user.id

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

        req.session!.userId = user.id
        return user;
    }

    @Query(() => User, {})
    async me (@Ctx() { req }: MyContext) {
        if (!req.session!.userId) return null

        return await this.repo.getUserById(req.session!.userId)
    }

    @Mutation(() => Boolean)
    logout(@Ctx() { req, res }: MyContext) {
        return new Promise((resolve) =>
            req.session.destroy((err) => {
                res.clearCookie("qid");
                if (err) {
                    console.log(err);
                    resolve(false);
                    return;
                }
                resolve(true);
            })
        );
    }
}