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
const getUser = (req, res) => {
    try {
        res.status(200).json({ users: users });
    } catch (error) {
        res.status(500).json({ message: error.message });
    }
};

export { getUser };
