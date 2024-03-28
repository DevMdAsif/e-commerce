import jwt from "jsonwebtoken";

const createJWT = (payload, securetKey, expiresIn) => {
    const token = jwt.sign(payload, securetKey, { expiresIn });
    return token;
};

export default createJWT;
