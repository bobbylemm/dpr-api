import {
    Model,
    DataTypes,
    Optional,
} from "sequelize";

import { sequelize } from '.'

interface PostAttributes {
    id: number;
    title: string;
    userId: number;
}

interface PostCreationAttributes extends Optional<PostAttributes, "id"> { }

interface PostInstance extends Model<PostAttributes, PostCreationAttributes>, PostAttributes {
    createdAt: Date;
    updatedAt: Date;
}

const Post = sequelize.define<PostInstance>(
    'post',
    {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        title: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        userId: {
            type: new DataTypes.NUMBER,
            allowNull: false
        }
    }
);

export default Post