const express=require('express');
const homeController=require('../controller/homeController');

const router=express.Router();

router.get('/',homeController.home);
router.use('/projects',require('./projects'));

module.exports= router;