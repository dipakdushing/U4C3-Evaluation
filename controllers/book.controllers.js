const express = require("express");
const router = express.Router();

const { body, validationResult } = require("express-validator");
const upload= require("../middlewares/upload.middlewares")

const Book = require("../models/book.models");

router.post(
	"",
	body("likes")
		.not()
		.isEmpty()
		.default(0)
		.withMessage("Likes should not be empty"),
	body("coverImage")
		.not()
		.isEmpty()
		.withMessage("One profile Image is required !!"),
	body("content").not().isEmpty().withMessage("Content Should not be empty !!"),
    upload.single("coverImage"),
	async (req, res) => {
		try {
			const errors = validationResult(req);
			if (!errors.isEmpty()) {
				return res.status(400).json({ errors: errors.array() });
			}
			const book = await Book.create({
                likes: req.body.likes,
                coverImage: req.file.coverImage,
                content:req.body.content
            });
			const msg = "Book Created Successfully !";
			return res.status(200).send({ msg, book });
		} catch (err) {
			return res.status(500).send({ message: err.message });
		}
	}
);