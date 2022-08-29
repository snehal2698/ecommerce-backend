let mongoose = require("mongoose");
let Schema = mongoose.Schema;
let schema = new Schema(
    {
       
        name:{type:String, required:true},
        email:{type:String, required:true},
        mobileno:{type:Number, requierd:true},
        password:{type:String, }

    }
)
let User = mongoose.model("users", schema);
module.exports = User;
