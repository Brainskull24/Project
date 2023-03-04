const mongoose = require("mongoose");

mongoose.connect("mongodb://localhost:27017/Registration")
.then(()=>{
    console.log(`connection succesfull`);
}).catch((e)=>{
    console.log(e)
    console.log(`NO connection`);
})