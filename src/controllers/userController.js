import User from "../models/userModel.js";
import createError from "http-errors";
import { successResponse } from "./responseController.js";
import { findWithId } from "../services/findWithId.js";

const getUsers = async (req, res, next) => {
    try {
        const search = req.query.search || "";
        const page = req.query.page || 1;
        const limit = req.query.limit || 5;

        const searchRegex = new RegExp(".*" + search + ".*", "i");

        const filter = {
            isAdmin: { $ne: true },
            $or: [
                { name: { $regex: searchRegex } },
                { email: { $regex: searchRegex } },
                { phone: { $regex: searchRegex } },
            ],
        };
        const options = { password: 0 };

        const users = await User.find(filter, options)
            .limit(limit)
            .skip((page - 1) * limit);

        if (!users) throw createError(404, "No user found");

        const count = await User.find(filter).countDocuments();

        return successResponse(res, {
            statusCode: 200,
            message: "users was returned successfully",
            payload: {
                users,
                paginagtion: {
                    totalPage: Math.ceil(count / limit),
                    previousPage: page - 1 > 0 ? page - 1 : null,
                    currentPage: page,
                    nextPage:
                        page + 1 <= Math.ceil(count / limit) ? page + 1 : null,
                },
            },
        });
    } catch (error) {
        next(error);
    }
};

const getUser = async (req, res, next) => {
    try {
        const id = req.params.id;
        const options = { password: 0 };
        const user = await findWithId(id, options);

        return successResponse(res, {
            statusCode: 200,
            message: "user was returned successfully",
            payload: user,
        });
    } catch (error) {
        next(error);
    }
};

export { getUsers, getUser };
