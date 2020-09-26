'use strict';

module.exports = {
	up: (queryInterface, Sequelize) => {
		return queryInterface.bulkInsert('messages', [
			{
				uuid: '7648485a-6657-48d7-87d6-6a98931d3598',
				content: 'Hey!',
				from: 'david',
				to: 'ann',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: 'ae4df4f1-a428-400d-bb16-edd4237e0c47',
				content: "Hey man, how's it going?",
				from: 'ann',
				to: 'david',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: '0a7c92ac-f69c-4799-8aad-9663a4afb47d',
				content: 'Not too bad, just getting to work, you?',
				from: 'david',
				to: 'ann',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: '240dd560-5825-4d5d-b089-12a67e8ec84c',
				content: "I'm working from home now",
				from: 'ann',
				to: 'david',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: '60909592-cfd7-4b16-a1ce-709091d5f6d7',
				content: "That's cool! I'm joining the 'remote club' too",
				from: 'david',
				to: 'ann',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: 'a10ad37d-c70b-4093-ae33-e5d0ab9498e1',
				content: 'Really? how come?',
				from: 'ann',
				to: 'david',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: 'be49ab98-5271-4eb9-a630-dd6d37e420ed',
				content: 'got promoted to a consultancy role',
				from: 'david',
				to: 'ann',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: 'a10ad37d-c70b-4093-ae33-e5d0ab9429e4',
				content: "That's amazing!! well done!",
				from: 'ann',
				to: 'david',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: 'be49ab98-5271-4eb9-a630-dd6d37e623j7',
				content: 'Thanks ;)',
				from: 'david',
				to: 'ann',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
			{
				uuid: 'fd4cee68-5caf-4b1b-80a9-5b9add7fd863',
				content: 'Hey , are you done with that task?',
				from: 'ann',
				to: 'david',
				createdAt: '2020-09-26 10:00:00',
				updatedAt: '2020-09-26 10:00:00',
			},
		]);
	},

	down: (queryInterface, Sequelize) => {
		return queryInterface.bulkDelete('messages', null, {});
	},
};
