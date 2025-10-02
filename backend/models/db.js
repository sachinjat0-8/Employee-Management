const mongoose = require("mongoose");

const DB_URI = process.env.DB_URI;

mongoose.connect(DB_URI).then( () =>{
     console.log("mongdb connected successfully... ")
}).catch( (err) =>{
    console.log('the connection error'+err);
})

module.exports =  mongoose;
