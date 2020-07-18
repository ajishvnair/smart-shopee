const express = require("express");
const router = express.Router();
{
    /** for image uploading */
}
const cloudinary = require("cloudinary").v2;
const { CloudinaryStorage } = require("multer-storage-cloudinary");
const multer = require("multer");


cloudinary.config({
    cloud_name: process.env.CLOUDINARY_CLOUD_NAME,
    api_key: process.env.CLOUDINARY_API_KEY,
    api_secret: process.env.CLOUDINARY_API_SECRET,
});

const storage = new CloudinaryStorage({
    cloudinary: cloudinary,
    params: {

    },
});

const upload = multer({ storage: storage });

const adminAuth = require("../../middlewares/adminAuth");
const categoryController = require("../../controller/category.controller");

{
    /**All api s */
}

// add new category
router.post(
    "/",
    adminAuth.auth,
    upload.single("image"),
    categoryController.create
);

// for editing
router.post(
    "/:id",
    adminAuth.auth,
    upload.single("image"),
    categoryController.edit
);
// for deleting
router.post("/delete/:id", adminAuth.auth, categoryController.delete);

// for updating status
router.post("/update/:id", adminAuth.auth, categoryController.updateStatus);

// for listing category
router.get("/all", categoryController.getAll);

module.exports = router;
