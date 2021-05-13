import {
    Resolver,
    Query,
    ObjectType,
    Field
} from "type-graphql";

import Post from '../../schemas/Post'
import PostRepo from "./postRepository";
import FieldError from "../../schemas/FieldError";

@ObjectType()
class PostResponse {
    @Field(() => [FieldError], { nullable: true })
    errors?: FieldError[];

    @Field(() => Post, { nullable: true })
    posts?: Post[];
}

@Resolver(Post)
export class PostResolver {
    private readonly repo: PostRepo;

    constructor() {
        this.repo = new PostRepo();
    }

    @Query(() => Post)
    async posts(): Promise<Post[]> {
        let posts;
        try {
            posts = await this.repo.getAll()
        } catch (err) {
            console.log(err, 'err')
        }
        return posts
    }
}