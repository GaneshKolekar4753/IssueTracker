const Project=require('../models/project_model');

module.exports.home=async function(req,res){
    try {
        const projects=await Project.find({}).sort('_createdAt');
        return res.render('home',{
            title:'Home',
            projects
    
        });
        
    } catch (error) {
        console.log('Error',error);
        return ;
    }
   
}