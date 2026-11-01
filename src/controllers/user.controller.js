import bycrpt from "bcrypt"
import User from "../models/user.model.js"
import jwt from "jsonwebtoken"


//Register
const RegisterUser = async (req, res) => {
    try {
        console.log("Getting data from body....")
        const { username, password, email } = req.body;


        if (!username || !password || !email) {
            console.log("something is missing..check")


            return res.status(400).json({
                message: "All fields are required",

            })
        }
        const finduser = await User.findOne({ email })
        if (finduser) {
            return res.status(500).json({
                message: "User already exit"
            })
        }
        const hashedpassword = await bycrpt.hash(password, 10)


        console.log("Creating user....")
        const user = await User.create({
            username,
            email,
            password: hashedpassword
        })
        return res.status(201).json({
            message: "User created successfully",
            user: {
                id: user._id,
                username: user.username,
                email: user.email,
                createdAt: user.createdAt
            }
        });


    } catch (error) {
        console.error("Failed to register user:", error);
        res.status(500).json({
            message: "Internal Server Problem"

        })
    }
}


//login
const loginUser = async (req, res) => {
    try {
        console.log("Getting data from body....")
        const { password, email } = req.body;


        if (!password || !email) {
            console.log("something is missing..check")
            return res.status(400).json({
                message: "All field are required"

            })
        }


        console.log("Finding User...")
        const user = await User.findOne({ email }).select("+password");


        if (!user) {
            return res.status(404).json({
                message: "User not found"
            })
        }

        console.log("Checking Password....")
        const ismatched = await bycrpt.compare(password, user.password)
        if (!ismatched) {
            return res.status(400).json({
                message: "Invalid password"
            })
        }


        console.log(" Password matched ")


        const token = jwt.sign(
            { id: user._id },
            process.env.JWT_SECRET,
            { expiresIn: "1d" }
        );

        return res.status(200).json({
            message: "Login successful",
            token
        });


    } catch (error) {
        return res.status(500).json({
            message: "Internal server Error"
        })
    }
}


const getuser = async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select("-password")
        return res.status(200).json({
            user
        });

    } catch (error) {
        return res.status(500).json({
            message: "Server error"
        });
    }
}




export { RegisterUser, loginUser, getuser }