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

//delet project

module.exports.deletProject=async function(req,res){
  try {
    let deletedProject = await Project.findByIdAndDelete(req.params.id);
    if (deletedProject) {
      //delete all issues to the project
      let issues=await Issue.deleteMany({project:deletedProject._id});
      if(issues){
        console.log("success", "Project and Issue Deleted")
        return res.redirect('back');
      }
        console.log("success", "Project Deleted but not issues")
        return res.redirect('back');
    }
} catch (error) {
    console.log("error", error);
    return res.redirect('back');
}
}




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
