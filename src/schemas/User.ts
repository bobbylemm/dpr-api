import { ObjectType, Field } from "type-graphql";

@ObjectType()
class User {
  id: number;

  @Field(() => String, { nullable: false })
  name: string;

  @Field(() => String, { nullable: false })
  email: string;

  password: string;

  createdAt: Date;

  updatedAt: Date;
}

export default User