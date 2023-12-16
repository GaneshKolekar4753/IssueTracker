const express=require('express');
const projectController=require('../controller/projectController');

const router=express.Router();

router.get('/',projectController.project);


module.exports= router;