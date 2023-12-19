
const Project = require("../models/project_model");
const Issue = require("../models/issue_model");

// create Issue in DB

module.exports.createIssue = async function (req, res) {
    try {
      let project = await Project.findById(req.params.id);
      console.log("project",project);
      if (project) {
        let issue = await Issue.create({
          name: req.body.name,
          description: req.body.description,
          author: req.body.author,
          labels: req.body.labels,
          project: project.id,
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
      console.log("Error in Creating Issue ********", error);
      return res.redirect("back");
    }
  };
  
//delete issue
module.exports.deleteIssue = async function (req, res) {
    try {
      let issue = await Issue.findByIdAndDelete(req.params.id);
      if (issue) {
        let project = await Project.findById(issue.project);
        // console.log(issue);
        if(project){
          console.log('project',project);
          project.issues.pull(issue);
        project.save();
        console.log("issue deleted succesfully");
        return res.redirect("back");
        }else{
          console.log("project not found");
        return res.redirect("back");
        }
        
      } else {
        console.log("issue not found");
        return res.redirect("back");
      }
    } catch (error) {
      console.log("Error***", error);
      return res.redirect("back");
    }
  };