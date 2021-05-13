import argon2 from "argon2";

import UserModel from '../../db/models/user'
import { AuthRegisterInput, AuthLoginInput } from "./authInput";

export default class AuthRepo {
    async register (payload: AuthRegisterInput) {
        const { name, password, email } = payload
        const hashedPassword = await argon2.hash(password);
        try {
            return await UserModel.create({ name, password: hashedPassword, email }, { raw: true })
        } catch (error) {
            throw error
        }
    }

    async login (payload: AuthLoginInput) {
        const { password, email } = payload
        try {
            const user = await UserModel.findOne({ where: { email } })
            const error = {
                errors: [
                    {
                        field: "usernameOrPassword",
                        message: "incorrect user details",
                    },
                ],
            };
            
            if (!user) throw error

            const valid = await argon2.verify(user.password, password);
            if (!valid) throw error

            return user
        } catch (error) {
            throw error
        }
    }

    async getUserById (id: number) {
        try {
            return await UserModel.findOne({ where: { id } })
        } catch (error) {
            throw error
        }
    }
}