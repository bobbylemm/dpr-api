import {
    ObjectType,
    Field
} from "type-graphql";

@ObjectType()
class FieldError {
    @Field(() => String)
    field: string;

    @Field(() => String)
    message: string;
}

export default FieldError