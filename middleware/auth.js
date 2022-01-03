const jwt = require('jsonwebtoken');
const dotenv = require('dotenv').config();
const User = require('../models/user');

let auth = {
	verifyjwt: async (req, res, next) => {
		try {
			const token = req.header('Authorization').replace('Bearer ', '');
			const decoded = jwt.verify(token, process.env.KEY);
			const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

			if (!user) {
				res.status(401).send({
					message: 'Please Authenticate'
				});
			}
		
			next();
		} catch (error) {
			res.status(400).json({
				message: error.message
			})
		}
	},
	
	user_type: async (req, res, next) => {
		try {
			const token = req.header('Authorization').replace('Bearer ', '');
			const decoded = jwt.verify(token, process.env.KEY);
			const user = await User.findOne({ _id: decoded._id, 'tokens.token': token });

			if(user.userType === "INSTRUCTOR") {
				next();
			} else {
				res.status(401).send({
					message: 'Please Authenticate 1'
				});
			}
		} catch (error) {
			res.status(400).json({
				message: error.message
			});
		}
	}
}

module.exports = auth;