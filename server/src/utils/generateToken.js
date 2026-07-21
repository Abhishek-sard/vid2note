import jwt from "jsonwebtoken";

const generateToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_SECRET,
        {
            expiresIn: "1d",
        }
    );

};



const generateRefreshToken = (userId) => {
    return jwt.sign(
        {id: userId},
        process.env.JWT_REFRESH_SECRET,
        {
            expiresIn: "7d",
        }
    );
};

export {generateToken, generateRefreshToken};