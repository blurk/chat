const bcrypt = require('bcryptjs');
const { UserInputError, AuthenticationError } = require('apollo-server');
const jwt = require('jsonwebtoken');
const { Op } = require('sequelize');

const { Message, User } = require('../../models');
const { JWT_SECRET } = require('../../config/env.json');

module.exports = {
	Query: {
		getUsers: async (_, __, { user }) => {
			try {
				if (!user) throw new AuthenticationError('Unauthenticated');

				//get all users except current user
				let users = await User.findAll({
					attributes: ['username', 'imageUrl', 'createdAt'],
					where: { username: { [Op.ne]: user.username } }, //not equal to current user
				});

				const allUserMessages = await Message.findAll({
					where: {
						[Op.or]: [{ from: user.username }, { to: user.username }],
					},
					order: [['createdAt', 'DESC']],
				});

				users = users.map((otherUser) => {
					const latestMessage = allUserMessages.find(
						(message) =>
							message.from === otherUser.username ||
							message.to === otherUser.username
					);
					otherUser.latestMessage = latestMessage;
					return otherUser;
				});

				return users;
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
		login: async (_, args) => {
			const { username, password } = args;
			let errors = {};

			try {
				// Check if username or password is empty
				if (username.trim() === '')
					errors.username = 'username must not be empty';
				if (password === '') errors.password = 'password must not be empty';

				// Throw new Error if we have
				if (Object.keys(errors).length > 0) {
					throw new UserInputError('bad input', { errors });
				}

				// Find the user
				const user = await User.findOne({ where: { username } });

				// Throw error if user not found
				if (!user) {
					errors.username = 'user not found';
					throw new UserInputError('user not found', { errors });
				}

				// Check if password is correct
				const correctPassword = await bcrypt.compare(password, user.password);

				// Throw error if password is incorrect
				if (!correctPassword) {
					errors.password = 'password is incorrect';
					throw new UserInputError('password is incorrect', { errors });
				}

				// sign jwt token
				const token = jwt.sign(
					{
						username,
					},
					JWT_SECRET,
					{ expiresIn: '1h' } //1h
				);

				user.token = token;
				//Return  user
				return {
					...user.toJSON(),
					token,
				};
			} catch (error) {
				console.error(error);
				throw error;
			}
		},
	},
	Mutation: {
		register: async (_, args) => {
			let { username, email, password, confirmPassword } = args;
			let errors = {};

			try {
				// Validate input data
				if (email.trim() === '') errors.email = 'email must not be empty';
				if (username.trim() === '')
					errors.username = 'username must not be empty';
				if (password.trim() === '')
					errors.password = 'password must not be empty';
				if (confirmPassword.trim() === '')
					errors.confirmPassword = 'repeat password must not be empty';

				if (password !== confirmPassword)
					errors.confirmPassword = 'passwords must match';

				/** 
				 * ! Check if username/email exists
				const userByUsername = await User.findOne({ where: { username } });
				const userByEmail = await User.findOne({ where: { email } });

				if (userByUsername) {
					errors.username = 'Username is taken';
				}

				if (userByEmail) {
					errors.email = 'Email is taken';
				} */

				if (Object.keys(errors).length > 0) {
					throw errors;
				}

				// Hash password
				password = await bcrypt.hash(password, 6);

				// Create User
				const user = await User.create({ username, email, password });

				// Return User
				return user; //*return as json by default
			} catch (err) {
				console.log(err);
				if (err.name === 'SequelizeUniqueConstraintError') {
					err.errors.forEach(
						(e) => (errors[e.path] = `${e.path.split('.')[1]} is already taken`)
					);
				} else if (err.name === 'SequelizeValidationError') {
					err.errors.forEach((e) => (errors[e.path] = e.message));
				}
				throw new UserInputError('Bad Input', { errors });
			}
		},
	},
};
