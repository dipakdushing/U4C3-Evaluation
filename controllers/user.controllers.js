const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");

const upload = require("../middlewares/upload.middlewares");

const User = require("../models/user.models");

router.post(
	"",
	body("firstName")
		.not()
		.isEmpty()
		.isLength({ min: 3, max: 30 })
		.withMessage(
			"First Name can not be empty and should of 3 to 30 characters !"
		),
	body("lastName")
		.optional()
		.isLength({ min: 3, max: 30 })
		.withMessage("Last name is optional and should of 3 to 30 characters !"),
	body("age")
		.not()
		.isEmpty()
		.isInt({ min: 1, max: 150 })
		.withMessage("Age should not be empty and between 1 to 150 years !"),
	body("email")
		.not()
		.isEmpty()
		.custom(async (value) => {
			return User.findOne({ email: value }).then((user) => {
				if (user) {
					return Promise.reject("Email already in use !!");
				}
			});
		})
		.withMessage("Email should be not empty and unique also.."),
	body("profileImage")
		.not()
		.isEmpty()
		.withMessage("One profile Image is required !!"),
	upload.any("profileImage"),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const filePath = req.files.map((file) => {
				return file.path;
			});
			const user = await User.create({
				firstName: req.body.firstName,
				lastName: req.body.lastName,
				age: req.body.age,
				email: req.body.email,
				profileImage: filePath,
			});
			const msg = "User Created Successfully !";
			return res.status(200).send({ msg, user });
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	}
);
module.exports = router;