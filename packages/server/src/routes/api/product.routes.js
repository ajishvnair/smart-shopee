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
const productController = require("../../controller/product.controller");

{
    /**All api s */
}
// add new category
router.post(
    "/",
    adminAuth.auth,
    upload.single("image"),
    productController.create
);
// for editing
router.post(
    "/:id",
    adminAuth.auth,
    upload.single("image"),
    productController.edit
);
// for deleting
router.post("/delete/:id", adminAuth.auth, productController.delete);

// for updating status
router.post("/update/:id", adminAuth.auth, productController.updateStatus);

// for listing category
router.get("/all", productController.getAll);

module.exports = router;
