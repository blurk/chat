'use strict';
const { Model } = require('sequelize');
module.exports = (sequelize, DataTypes) => {
	class Message extends Model {
		/**
		 * Helper method for defining associations.
		 * This method is not a part of Sequelize lifecycle.
		 * The `models/index` file will call this method automatically.
		 */
		static associate({ Reaction }) {
			// define association here
			this.hasMany(Reaction, { as: 'reactions' });
		}
	}
	Message.init(
		{
			content: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			uuid: {
				type: DataTypes.STRING,
				defaultValue: DataTypes.UUIDV4,
				allowNull: false,
			},
			from: {
				type: DataTypes.STRING,
				allowNull: false,
			},
			to: {
				type: DataTypes.STRING,
				allowNull: false,
				tableName: 'message',
			},
		},
		{
			sequelize,
			modelName: 'Message',
		}
	);
	return Message;
};