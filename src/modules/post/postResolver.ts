import {
    Resolver,
    Query,
    Mutation,
    Arg,
    Ctx,
} from "type-graphql";

import { MyContext } from "../../shared/types";
import Post from '../../schemas/Post'
import PostRepo from "./postRepository";
import { CreatePostInput, UpdatePostInput } from './postInput'
@Resolver(Post)
export class PostResolver {
    private readonly repo: PostRepo;

    constructor() {
        this.repo = new PostRepo();
    }

    @Query(() => [Post])
    async posts(@Ctx() { req }: MyContext): Promise<Post[]> {
        let posts;
        try {
            posts = await this.repo.getAll(req.session!.userId)
        } catch (err) {
            console.log(err, 'err')
        }
        console.log(posts, 'posts')
        return posts
    }

    @Mutation(() => Post)
    async createPost(
        @Arg("payload", () => CreatePostInput) payload: CreatePostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        let post;
        try {
            post = await this.repo.create(payload, req.session!.userId)
        } catch (err) {
            console.log(err, 'err')
        }
        return post;
    }

    @Mutation(() => Post)
    async updatePost(
        @Arg("payload", () => UpdatePostInput) payload: UpdatePostInput,
        @Ctx() { req }: MyContext
    ): Promise<Post> {
        let post;
        try {
            post = await this.repo.update(payload)
        } catch (err) {
            console.log(err, 'err')
        }
        return post;
    }
}