const mongoose = require("mongoose");
const ProjectSchema = new mongoose.Schema({
  projectName: {
    type: String,
    required: true,
  },
});
const Project = mongoose.model("Project", ProjectSchema);
module.exports = Project;
