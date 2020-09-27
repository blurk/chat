'use strict';
const bcrypt = require('bcryptjs');

module.exports = {
	up: async (queryInterface, Sequelize) => {
		const password = await bcrypt.hash('123456', 6);
		const createdAt = new Date();
		const updatedAt = createdAt;

		await queryInterface.bulkInsert('users', [
			{
				username: 'david',
				email: 'david@gmail.com',
				password: password,
				imageUrl:
					'https://images.unsplash.com/photo-1557862921-37829c790f19?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=751&q=80',
				createdAt,
				updatedAt,
			},
			{
				username: 'ann',
				email: 'ann@gmail.com',
				password: password,
				imageUrl:
					'https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=334&q=80',
				createdAt,
				updatedAt,
			},
			{
				username: 'linh',
				email: 'linh@gmail.com',
				password: password,
				imageUrl:
					'https://images.unsplash.com/photo-1522602724102-7b966b111376?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1483&q=80',
				createdAt,
				updatedAt,
			},
		]);
	},

	down: async (queryInterface, Sequelize) => {
		await queryInterface.bulkDelete('users', null, {});
	},
};
