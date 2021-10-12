const router = require("express").Router();
const {
  getIssues,
  createIssue,
  deleteIssue,
  updateIssue,
} = require("../controllers/issue-handler");
router
  .route("/issues/:projectName")
  .get(getIssues)
  .post(createIssue)
  .put(updateIssue)
  .delete(deleteIssue);
module.exports = router;
