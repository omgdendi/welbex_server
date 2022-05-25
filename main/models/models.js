const sequelize = require("../config/db-config");
const {DataTypes} = require("sequelize");

const UserModel = sequelize.define("user", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    username: {type: DataTypes.STRING, unique: true},
    password: {type: DataTypes.STRING},
});

const RoleModel = sequelize.define("role", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    value: {type: DataTypes.STRING, unique: true, default: "USER"}
});

const TokenModel = sequelize.define("token", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    refreshToken: {type: DataTypes.STRING, required: true}
})

const BlogModel = sequelize.define("blog", {
    id: {type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true},
    message: {type: DataTypes.STRING, required: true},
    img: {type: DataTypes.STRING},
    video: {type: DataTypes.STRING}
});

UserModel.hasOne(TokenModel);
TokenModel.belongsTo(UserModel);

UserModel.hasMany(RoleModel);
RoleModel.belongsTo(UserModel);

UserModel.hasMany(BlogModel);
BlogModel.belongsTo(UserModel);

module.exports = {UserModel, TokenModel, BlogModel, RoleModel}