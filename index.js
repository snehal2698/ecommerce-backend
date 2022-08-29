let express = require("express");
let moongoose = require("mongoose");
let bodyparser = require("body-parser");

const { default: mongoose } = require("mongoose");

let app = express();
app.use(express.static("assets"));
app.use(express.json());
app.use(bodyparser.json({limit:'50mb'}));
app.use(bodyparser.urlencoded({limit:'50mb', extended: true}));

app.use(function (req, res, next) {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Headers', '*');
    if(req.method == "OPTIONS")
    {
        res.setHeader('Access-Control-Allow-Methods', 'GET, POST, OPTIONS, PUT, PATCH, DELETE');
        return res.status(200).json({});
    }
    next();
});

mongoose.connect("mongodb://localhost:27017/ecommerceproject");
let db = mongoose.connection;
db.on("error", error=>console.log(error));
db.on("open", ()=> console.log("Connection Established"));


app.get("/", function(req, res){
    res.send("welcome to E-commerce Backend");
    res.end();
});

app.use("/admin", require("./routes/admin"));
app.use("/productcategory", require("./routes/productcategory"));
app.use("/product", require("./routes/product"));
app.use("/user", require("./routes/user"));
app.use("/order", require("./routes/order"));


app.listen(8081 , function(){
    console.log("Backend running on http://localhost:8081/");
});