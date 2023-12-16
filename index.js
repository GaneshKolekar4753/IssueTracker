const express=require('express');
const port=7000;
const app=express();


app.listen(port,function(err){
    if(err){
        console.log('Error in creating server',err);
    }
    console.log(`Server is up on port:${port}`);
});