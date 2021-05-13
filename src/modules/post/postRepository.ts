import PostModel from '../../db/models/post'

export default class PostRepo {
    async getAll() {
        try {
            return await PostModel.findAll()
        } catch (error) {
            throw error
        }
    }
}