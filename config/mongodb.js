const mongoose=require('mongoose');

mongoose.connect('mongodb://localhost/issuetracker_development');

const db=mongoose.connection;

db.on('err',console.error.bind(console,'Error connecting to MongoDB'));

db.once('open',function(){
   console.log('Connected to the Database');
})

module.exports=db;