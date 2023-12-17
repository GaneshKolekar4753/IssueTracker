const Project = require("../models/project_model");
const Issue = require("../models/issue_model");

//create Project in DB
module.exports.createProject = async function (req, res) {
  // console.log(req.body);
  try {
    const create = await Project.create({
      description: req.body.description,
      name: req.body.name,
      author: req.body.author,
    });
    if (create) {
      console.log("project added successfully");
      return res.redirect("back");
    }
    console.log("project not added");
    return res.redirect("back");
  } catch (error) {
    console.log("Error in Creating Project", error);
    return res.redirect("back");
  }
};

// create Issue in DB

module.exports.createIssue = async function (req, res) {
  try {
    let project = await Project.findById(req.params.id);
    if (project) {
      let issue = await Issue.create({
        name: req.body.name,
        description: req.body.description,
        author: req.body.author,
        labels: req.body.labels,
      });
      project.issues.push(issue);
      if (!(typeof req.body.labels === "string")) {
        for (let label of req.body.labels) {
          let isPresent = project.labels.find((obj) => obj == label);
          if (!isPresent) {
            project.labels.push(label);
          }
        }
      } else {
        let isPresent = project.labels.find((obj) => obj == req.body.labels);
        if (!isPresent) {
          project.labels.push(req.body.labels);
        }
      }

      await project.save();
      console.log("success", "Issue Created");
      return res.redirect("back");
    } else {
      console.log("plz add correct Project");
      return res.redirect("back");
    }
  } catch (error) {
    console.log("Error in Creating Issue", error);
    return res.redirect("back");
  }
};

//rendering project issue page
module.exports.project = async function (req, res) {
  try {
    const project = await Project.findById(req.params.id).populate({
      path: "issues",
  });
    if (project) {
      return res.render("project", {
        title: "Project Page",
        project,
      });
    }
    return res.redirect("back");
  } catch (error) {
    console.log("Error", error);
    return res.redirect("back");
  }
};
