let express = require("express");
let bodyparser = require("body-parser");
let User = require("../models/User");
let Order = require("../models/Order");


let router = express.Router();

router.post("/register", async(req,res)=>{
   try{
   let body = req.body;
   let user = new User();

   let users = await User.find({"email":body.data.email});
   if(users.length != 0)
   {
    res.end(JSON.stringify({status:"failed", data:"email already exist"}));
   }
   users = await User.find({"mobileno":body.data.mobileno});
   if(users.length != 0)
   {
    res.end(JSON.stringify({status:"failed", data:"mobileno already exist"}));
   }
   user.name = body.data.name;
   user.email = body.data.email;
   user.password = body.data.password;
   user.mobileno = body.data.mobileno;
   user.save().then(result=>{
   res.end(JSON.stringify({status:"success", data:result}));
   },err=>{
    res.end(JSON.stringify({status:"success", data:err}));
   });
   }
   catch{
   res.end(JSON.stringify({status:"failed", data:"something went wrong"}));
   }

});

router.post("/login", async(req,res)=>{
   try{
      let body = req.body;
      let user = await User.findOne({email:body.data.email});
      if(user == null)
      {
         res.end(JSON.stringify({status:"failed", data:"email dosent exist"}));
      }
      else{
         if(user.password == body.data.password){
            res.end(JSON.stringify({status:"success", data:user}));
         }
         else{
            res.end(JSON.stringify({status:"failed", data:"invalid password"})); 
         }
      }
   }
   catch{
      res.end(JSON.stringify({status:"failed", data:"something went wrong"}));
   }
});


module.exports = router;

