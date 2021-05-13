import {
    Model,
    DataTypes,
    Optional,
} from "sequelize";

import { sequelize } from '.'
import Post from './post'

interface UserAttributes {
    id: number;
    name: string;
    email: string;
    password: string;
}

interface UserCreationAttributes extends Optional<UserAttributes, "id"> { }

interface UserInstance extends Model<UserAttributes, UserCreationAttributes>, UserAttributes {
    createdAt: Date;
    updatedAt: Date;
}

const User = sequelize.define<UserInstance>(
    'user',
    {
        id: {
            allowNull: false,
            type: DataTypes.INTEGER,
            autoIncrement: true,
            primaryKey: true,
            unique: true,
        },
        name: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        email: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
        password: {
            type: new DataTypes.STRING(128),
            allowNull: false,
        },
    }
);

User.hasMany(Post, {
    sourceKey: 'id',
    foreignKey: 'userId',
    as: 'posts'
});

Post.belongsTo(User, {
    foreignKey: 'userId',
    as: 'user'
});

export default User