
const { Router } = require("express");
const { body, validationResult } = require("express-validator");

const User = require("../models/user.models");

Router.post(
    "",
    body("firstName")
        .not()
        .isEmpty()
        .isLength({ min: 3, max: 30 })
        .withMessage("First Name can not be empty and should of 3 to 30 characters !"),

    body("lastName")
        .optional()
        .isLength({ min: 3, max: 30 })
        .withMessage("Last Name is optional and should of 3 to 30 characters !"),
    
    body("age")
        .not()
        .isEmpty()
        .isInt({ min: 1, max: 150 })
        .withMessage("Age should not be empty and between of 1 to 150 year !"),

    body("email")
        .not()
        .isEmpty()
        .custom(async (value) => {
            return User.findOne({ email: value}).then((user) =>{
                if(user){
                    return Promise.reject("Email already Exist!");
                }
            });
            
        }).withMessage("Email should not be empty and uniq also..."),
        body("profileImage").not().isEmpty().withMessage("One profile Image is required!!"),

        async(req,res)=>{
            
        }

)