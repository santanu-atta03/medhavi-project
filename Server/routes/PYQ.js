const express = require("express");
const router = express.Router();
const pyqController = require("../controllers/PYQ");

// get all PYQs of a department
router.get("/departments/:dept/pyqs", pyqController.getPyqsByDept);

// download one PYQ
router.get("/departments/:dept/download/:filename", pyqController.downloadPyq);

module.exports = router;
