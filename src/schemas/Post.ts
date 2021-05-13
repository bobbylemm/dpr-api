import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Post {
  id: number;

  @Field(() => String, { nullable: false })
  title: string;

  createdAt: Date;

  updatedAt: Date;
}

export default Post