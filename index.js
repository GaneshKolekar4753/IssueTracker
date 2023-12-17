const express=require('express');
const port=7000;
const app=express();

const path=require('path');
const expressLayouts=require('express-ejs-layouts');
const db=require('./config/mongodb');

//add body parser
app.use(express.urlencoded());

//set static files
app.use(express.static('./assets'));

//setup view engine(ejs)
app.set('view engine','ejs');
app.set('views','./views');

// use layouts
app.use(expressLayouts);

// extract the style and script
app.set('layout extractStyles', true);
app.set('layout extractScripts', true);


//use express router
app.use('/',require('./routes/index'));

app.listen(port,function(err){
    if(err){
        console.log('Error in creating server',err);
    }
    console.log(`Server is up on port:${port}`);
});