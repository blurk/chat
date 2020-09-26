'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class User extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate(models) {
			// define association here
		}
	}
	User.init(
		{
			username: {
				type: DataTypes.STRING(20),
				unique: true,
				allowNull: false,
			},
			email: {
				type: DataTypes.STRING(100),
				unique: true,
				allowNull: false,
				validate: {
					isEmail: {
						args: true, //has to be an email
						msg: 'Must be a valid email address', //show this when the validation not match
					},
				},
			},
			password: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			imageUrl: DataTypes.STRING,
		},
		{
			sequelize,
			modelName: 'User',
			tableName: 'users',
		}
	);
	return User;
};
