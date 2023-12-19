const express=require('express');
const issueController=require('../controller/issueController');

const router=express.Router();

router.post('/:id',issueController.createIssue);
router.get('/delete/:id',issueController.deleteIssue);
module.exports= router;