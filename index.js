const express=require('express');
const port=7000;
const app=express();

const path=require('path');

//use express router
app.use('/',require('./routes/index'));

//setup view engine(ejs)
app.set('view engine','ejs');
console.log(__dirname);
app.set('views','./views');
app.listen(port,function(err){
    if(err){
        console.log('Error in creating server',err);
    }
    console.log(`Server is up on port:${port}`);
});