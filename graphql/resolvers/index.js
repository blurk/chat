const userResolver = require('./users');
const messageResolver = require('./messages');

const { User, Message } = require('../../models');

module.exports = {
	Message: {
		createdAt: (parent) => parent.createdAt.toISOString(),
	},
	Reaction: {
		createdAt: (parent) => parent.createdAt.toISOString(),
		message: async (parent) => await Message.findByPk(parent.messageId),
		user: async (parent) =>
			await User.findByPk(parent.userId, {
				attributes: ['username', 'imageUrl', 'createdAt'],
			}),
	},
	User: {
		createdAt: (parent) => parent.createdAt.toISOString(),
	},
	Query: {
		...userResolver.Query,
		...messageResolver.Query,
	},
	Mutation: {
		...userResolver.Mutation,
		...messageResolver.Mutation,
	},
	Subscription: {
		...messageResolver.Subscription,
	},
};
