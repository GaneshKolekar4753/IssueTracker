const express=require('express');
const projectController=require('../controller/projectController');

const router=express.Router();

router.get('/:id',projectController.project);
router.post('/:id',projectController.createIssue);
router.post('/create',projectController.createProject);

module.exports= router;