const Issues = require("../models/Issues");

const { StatusCodes } = require("http-status-codes");
const { BadRequest, NotFound } = require("../errors");
const getIssues = (req, res) => {
  res.send("get issues");
};
const createIssue = async (req, res) => {
  const { projectName } = req.params;

  const { issue_title, issue_text, created_by, assigned_to, status_text } =
    req.body;
  if (!issue_title || !issue_text || !created_by) {
    throw new BadRequest("required field(s) missing");
  }
  const newIssue = await Issues.create({
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
    project_name: projectName,
  });
  res.status(StatusCodes.CREATED).json({ newIssue });
};
const updateIssue = (req, res) => {
  res.send("get issues");
};
const deleteIssue = (req, res) => {
  res.send("get issues");
};

module.exports = {
  getIssues,
  createIssue,
  deleteIssue,
  updateIssue,
};
