// import models
const Issues = require("../models/Issues");

// import http-status-codes
const { StatusCodes } = require("http-status-codes");

//  import errors
const { BadRequestError, NotFoundError } = require("../errors");

// get issues handler
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

  // initialize filter object
  let queryObject = {};

  // filter parameters
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

  // find issues with corresponding project_name and filter parameters
  const existingIssues = await Issues.find({
    project_name: projectName,
    ...queryObject,
  });

  // check if existing issues is empty
  if (existingIssues.length < 1) {
    throw new NotFoundError(
      `Project ${projectName} has no existing issues which match the parameters provided`
    );
  }
  const nbHits = existingIssues.length;
  return res.status(StatusCodes.OK).json({ nbHits, existingIssues });
};

// create new issue
const createIssue = async (req, res) => {
  const { projectName } = req.params;

  const { issue_title, issue_text, created_by, assigned_to, status_text } =
    req.body;

  // input validation
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
  // json return
  return res.status(StatusCodes.CREATED).json({ newIssue });
};

// update issue
const updateIssue = async (req, res) => {
  const {
    _id,
    issue_title,
    issue_text,
    created_by,
    assigned_to,
    status_text,
    open,
  } = req.body;
  //  input validation
  if (!_id) {
    throw new BadRequestError(`missing _id`);
  }
  if (
    !issue_title &&
    !issue_text &&
    !created_by &&
    !assigned_to &&
    !status_text &&
    open === undefined
  ) {
    throw new BadRequestError(`no update field(s) sent, _id: ${_id}`);
  }

  //   update object
  let updateObject = {};

  if (issue_title) {
    updateObject.issue_title = issue_title;
  }
  if (issue_text) {
    updateObject.issue_text = issue_text;
  }
  if (created_by) {
    updateObject.created_by = created_by;
  }
  if (assigned_to) {
    updateObject.assigned_to = assigned_to;
  }
  if (status_text) {
    updateObject.status_text = status_text;
  }
  if (open === false) {
    updateObject.open = false;
  } else if (open === true) {
    updateObject.open = true;
  }

  // update issue in the database
  const updatedIssue = await Issues.findOneAndUpdate({ _id }, updateObject, {
    new: true,
  });
  if (!updatedIssue) {
    throw new NotFoundError(`No issue with _id: ${_id}`);
  }

  // json return
  return res
    .status(StatusCodes.OK)
    .json({ result: `successfully updated, _id: ${_id}` });
};

//  delete issue
const deleteIssue = async (req, res) => {
  const { _id } = req.body;
  if (!_id) {
    throw new BadRequestError(`missing _id`);
  }
  const issue = await Issues.findByIdAndDelete({ _id });
  if (!issue) {
    throw new NotFoundError(`No issue with _id: ${_id}`);
  }

  // json return
  return res
    .status(StatusCodes.OK)
    .json({ result: `successfully deleted, _id: ${_id}` });
};

module.exports = {
  getIssues,
  createIssue,
  deleteIssue,
  updateIssue,
};
