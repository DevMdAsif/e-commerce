import data from "../data.js";
import User from "../models/userModel.js";

const seedUser = async (req, res, next) => {
    try {
        await User.deleteMany({});

        const users = await User.insertMany(data);

        res.status(201).json({
            success: true,
            message: "Users seeded successfully",
            plyload: users,
        });
    } catch (error) {
        next(error);
    }
};

export default seedUser;
