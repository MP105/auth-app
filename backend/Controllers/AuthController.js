const UserModel = require('../Models/user'); // 🔥 FIX (User → user)
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

const signup = async (req, res) => {
    try {
        const { name, email, password } = req.body;

        const user = await UserModel.findOne({ email });

        if (user) {
            return res.status(409).json({ 
                message: 'User already exists, you can login', 
                success: false 
            });
        }

        const userModel = new UserModel({ name, email, password });

        userModel.password = await bcrypt.hash(password, 10);

        await userModel.save();

        res.status(201).json({
            message: "Signup successfully",
            success: true
        });

    } catch (err) {
        console.log(err); // 🔥 added for debugging
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

const login = async (req, res) => {
    try {
        const { email, password } = req.body;

        const user = await UserModel.findOne({ email });
        const errorMsg = 'auth failed email and password is wrong';

        if (!user) {
            return res.status(403).json({ 
                message: errorMsg, 
                success: false 
            });
        }

        const isPasswordEqual = await bcrypt.compare(password, user.password);

        if (!isPasswordEqual) {
            return res.status(403).json({ 
                message: errorMsg, 
                success: false 
            });
        }

        const jwtToken = jwt.sign(
            { email: user.email, id: user._id }, // 🔥 small fix id_
            process.env.JWT_SECRET,
            { expiresIn: '24h' } // 🔥 FIX
        );

        res.status(200).json({ // 🔥 FIX (201 → 200)
            message: "Login successfully", // 🔥 FIX
            success: true,
            token: jwtToken // 🔥 FIX (return token)
        });

    } catch (err) {
        console.log(err); // 🔥 added
        res.status(500).json({
            message: "Internal server error",
            success: false
        });
    }
}

module.exports = {
    signup, 
    login
};