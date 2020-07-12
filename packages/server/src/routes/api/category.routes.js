const express = require("express");
const router = express.Router();
{
    /** for image uploading */
}
const multer = require("multer");
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, "uploads/");
    },
    filename: function (req, file, cb) {
        cb(
            null,
            new Date().toISOString().replace(/:/g, "-") + file.originalname
        );
    },
});

const fileFilter = (req, file, cb) => {
    if (file.mimetype === "image/jpeg" || file.mimetype === "image/png") {
        cb(null, true);
    } else {
        cb(null, false);
    }
};
const upload = multer({
    storage: storage,
    limits: {
        fileSize: 1024 * 1024,
    },
    fileFilter: fileFilter,
});

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

module.exports = router;
