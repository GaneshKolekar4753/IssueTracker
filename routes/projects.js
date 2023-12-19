const express=require('express');
const projectController=require('../controller/projectController');

const router=express.Router();
router.use('/issue',require('./issue'));
router.get('/:id',projectController.project);
router.post('/project/create/',projectController.createProject);
router.get('/delete/:id',projectController.deletProject);



module.exports= router;