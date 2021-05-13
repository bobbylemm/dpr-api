import PostModel from '../../db/models/post'
import { CreatePostInput, UpdatePostInput } from './postInput'

export default class PostRepo {
    async getAll(userId: number) {
        try {
            return await PostModel.findAll({ where: { userId }, raw: true })
        } catch (error) {
            throw error
        }
    }
    async create(payload: CreatePostInput, userId: number) {
        try {
            return await PostModel.create({ ...payload, userId})
        } catch (error) {
            throw error
        }
    }

    async update(payload: UpdatePostInput) {
        try {
            await PostModel.update({ title: payload.title}, { 
                where: {
                    id: payload.id
                }
            })
            return PostModel.findOne({ where: { id: payload.id } })
        } catch (error) {
            throw error
        }
    }
}