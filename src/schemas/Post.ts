import { ObjectType, Field } from "type-graphql";

@ObjectType()
class Post {
  @Field(() => Number, { nullable: true })
  id: number;

  @Field(() => String, { nullable: true })
  title: string;
  
  @Field(() => String, { nullable: true })
  createdAt: Date;

  @Field(() => Date, { nullable: true })
  updatedAt: Date;
}

export default Post