const mongoose = require("mongoose");

const IssuesSchema = new mongoose.Schema(
  {
    issue_title: {
      type: String,
      required: [true, "required field(s) missing"],
    },
    issue_text: {
      type: String,
      required: [true, "required field(s) missing"],
    },
    created_by: {
      type: String,
      required: [true, "required field(s) missing"],
    },
    open: {
      type: Boolean,
      default: true,
    },
    assigned_to: {
      type: String,
    },
    status_text: {
      type: String,
    },
    project_name: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);
const Issues = mongoose.model("Issues", IssuesSchema);

module.exports = Issues;
