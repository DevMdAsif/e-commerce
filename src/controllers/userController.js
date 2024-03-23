import users from "../models/userModel.js";

const getUser = (req, res, next) => {
    try {
        res.status(200).json({ users: users });
    } catch (error) {
        next(error);
    }
};

export { getUser };
