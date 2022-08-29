let express = require("express");
let bodyparser = require("body-parser");
let Productcategory = require("../models/Productcategory");
let fs = require("fs");



let router = express.Router();

router.post("/save", async(req, res)=>{
    try{
    let body = req.body;
    let productcategory = new Productcategory();
    if(body.data.id != "")
    {
        productcategory = await Productcategory.findById(body.data.id);
    }
    productcategory.name = body.data.name;
    productcategory.srno = body.data.srno;
    let base64image = body.data.image;
    if(base64image != "")
    {
        let randomname = (Math.random() + 1).toString(36).substring(7);
        base64image = base64image.replace(/^data:image\/[a-Z]*;base64,/,"");
        productcategory.imagepath = "productcategories/" + randomname +".png";
        fs.writeFile("assets/"+ productcategory.imagepath, base64image, 'base64',function(err){
            if(err)
            console.log("Error While saving image" + err);
        });
    }
    productcategory.save().then(result=>{
        res.end(JSON.stringify({status:"success", data:result}));
    },err=>{
        res.end(JSON.stringify({status:"fail", data:error}));
    });
    }catch{
        res.end(JSON.stringify({status:"failed", data:"something went wrong"}));
    }
});

router.post("/list", async(req,res)=>{
    try{
    let productcategories = await Productcategory.find();
    res.end(JSON.stringify({status:"success", data:productcategories}));
    }catch{
    res.end(JSON.stringify({status:"failed", data:"something went wrong"}));
    }
});

router.post("/get", async(req,res)=>{
    try{
    let body = req.body;
    let productcategories = await Productcategory.findById(body.data.id);
    res.end(JSON.stringify({status:"success", data:productcategories}));
    }catch{
    res.end(JSON.stringify({status:"failed", data:"something went wrong"}));
    }
});

router.post("/delete", async(req,res)=>{
    try{
    let body = req.body;
    await Productcategory.findByIdAndDelete(body.data.id);
    res.end(JSON.stringify({status:"success"}));
    }catch{
    res.end(JSON.stringify({status:"failed", data:"something went wrong"}));
    }

// router.post("/delete", async (req, res) => {
//     try{
//     let body = req.body;
//     await Productcategory.findByIdAndDelete(body.data.id);
//     res.end(JSON.stringify({ status: "success" }));
//     }
//     catch{
//         res.end(JSON.stringify({ status: "failed", data:"something is wrong"}));
//     }
});

module.exports = router;