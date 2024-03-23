const users = [
    {
        id: 1,
        name: "John Doe",
        email: "john@gmail.com",
    },
    {
        id: 2,
        name: "asifullah",
        email: "mdasifullah@gmail.com",
    },
];
const getUser = (req, res, next) => {
    try {
        res.status(200).json({ users: users });
    } catch (error) {
        next(error);
    }
};

export { getUser };
