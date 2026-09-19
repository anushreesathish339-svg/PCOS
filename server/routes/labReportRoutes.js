const express = require("express");

const router = express.Router();

const {

addLabReport,
getLabReports,
getLabReport,
updateLabReport,
deleteLabReport

} = require("../controllers/labReportController");

router.post("/", addLabReport);

router.get("/", getLabReports);

router.get("/:id", getLabReport);

router.put("/:id", updateLabReport);

router.delete("/:id", deleteLabReport);

module.exports = router;