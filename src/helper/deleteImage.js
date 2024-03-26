import fs from "fs/promises";

const deleteImage = async (userImagePath) => {
    try {
        await fs.access(userImagePath);
        await fs.unlink(userImagePath);
    } catch (error) {
        console.error("user image not found");
    }
};

export default deleteImage;
