import User from "../models/User.js";
import {
    generateAccessToken,
    generateRefreshToken,
} from "../utils/generateToken.js";
import {validationResult} from "express-validator";



// @route post/api/auth/register

const register = async (req, res) => {
    try{
        //validation
        const errors = validationResult(req);


        if(!errors.isEmpty()){
            return res.status(400).json({
                success:false,
                errors: errors.array(),
            });
        }

        const {name, email, password} = req.body;

        //check email exists
        const existingUser = await User.findOne({email});

        if(existingUser){
            return res.status(400).json({
                success: false,
                message: "Email already exists",
            });
        }

        //create user
        const user = await User.create({
            name,
            email,
            password,
        });

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);


        user.refreshToken = refreshToken;
        await user.save();

        res.status(201).json({
            success: true,
            message: "User registered successfully",
            accessToken,
            refreshToken,
            user:{
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },

        });

    }catch(error){
        res.status(500).json({
            success:false,
            message: error.message,
        });

    };
};



/* 
@route POST/api/auth/login
*/


const login = async (req, res) => {
    try {
        const errors = validationResult(req);

        if(!errors.isEmpty()){
            return res.status(400).json({
                success: false,
                errors: errors.array();
            });
        }
        const {email, password} = req.body;

        const user = await User.findOne({email}).select("+password");

        if(!user){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }


        const isMatch = await user.matchPassword(password);

        if(!isMatch){
            return res.status(400).json({
                success: false,
                message: "Invalid email or password",
            });
        }

        const accessToken = generateAccessToken(user._id);
        const refreshToken = generateRefreshToken(user._id);

        user.refreshToken = refreshToken;
        await user.save();

        res.json({
            success: true,
            message: "Login successful",
            accessToken,
            refreshToken,
            user: {
                id: user._id,
                name: user.name,
                email: user.email,
                role: user.role,
            },
        });
        
    } catch (error) {
        res.status(500).json({
            success:false,
            message: error.message,
        });
        
    };
}