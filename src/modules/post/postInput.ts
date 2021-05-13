import { InputType, Field } from "type-graphql";

@InputType()
export class CreatePostInput {
    @Field(() => String)
    title: string;
}

@InputType()
export class UpdatePostInput {
    @Field(() => Number)
    id: number;

    @Field(() => String)
    title: string;
}