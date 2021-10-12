const Issues = require("../models/Issues");

const { StatusCodes } = require("http-status-codes");
const { BadRequestError, NotFoundError } = require("../errors");

const getIssues = async (req, res) => {
  const { projectName } = req.params;
  const {
    issue_title,
    issue_text,
    created_by,
    open,
    assigned_to,
    status_text,
  } = req.query;
  let queryObject = {};

  if (issue_title) {
    queryObject.issue_title = issue_title;
  }
  if (issue_text) {
    queryObject.issue_text = issue_text;
  }
  if (created_by) {
    queryObject.created_by = created_by;
  }
  if (assigned_to) {
    queryObject.assigned_to = assigned_to;
  }
  if (status_text) {
    queryObject.status_text = status_text;
  }
  if (open === "false") {
    queryObject.open = false;
  } else if (open === "true") {
    queryObject.open = true;
  }
  console.log(queryObject);
  const existingIssues = await Issues.find({
    project_name: projectName,
    ...queryObject,
  });

  if (existingIssues.length < 1) {
    throw new NotFoundError(`Project ${projectName} has no existing issues`);
  }
  const nbHits = existingIssues.length;
  res.status(StatusCodes.OK).json({ nbHits, existingIssues });
};
const createIssue = async (req, res) => {
  const { projectName } = req.params;

  const { issue_title, issue_text, created_by, assigned_to, status_text } =
    req.body;
  if (!issue_title || !issue_text || !created_by) {
    throw new BadRequestError("required field(s) missing");
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
