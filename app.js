require('dotenv').config();
const express=require("express");
const app=express();
const path=require("path");
const mongoose=require('mongoose');
const bodyParser=require('body-parser');

// mongoose.connect("mongodb://localhost:27017/EmailDB",{useNewUrlParser:true,useUnifiedTopology:true});
mongoose.connect("mongodb+srv://admin-rajesh:"+process.env.password+"@cluster0.xmf5o.mongodb.net/portfolioDB", { useNewUrlParser: true, useUnifiedTopology: true });


app.use(express.static(__dirname+"/public"));
app.set("view engine","ejs");
app.use(bodyParser.urlencoded({extended:true}));

const Schema=new mongoose.Schema({email:String});
const hireMeSchema=new mongoose.Schema({
    name:String,
    email:String,
    budget:Number,
    detail:String
});
const Emails=mongoose.model("Emails",Schema);
const hireMeDetail=mongoose.model("HireMe",hireMeSchema);

app.get('/',function(req,res){
    res.render("main.ejs",{mess:""});
})

app.post('/',function(req,res){
    var mail=req.body.email;
    Emails.find({email:mail},function(err,item){
        if(item.length!=0){
            res.render("main.ejs",{mess:"Email already Exist"});
        }else{
            const newEmail=new Emails({
                email:mail
            });
            newEmail.save();
            res.render("main.ejs",{mess:"Thanks"});
        }
    })
    
})
app.post('/hireMe',function(req,res){
    res.render("hire_me.ejs",{mess:""});
})
app.post('/getHired',function(req,res){
    var mail=req.body.email;
    var name=req.body.name;
    var budget=req.body.budget;
    var detail=req.body.detail;
    const newDetail=new hireMeDetail({
        email:mail,
        name:name,
        budget:budget,
        detail:detail
    })
    newDetail.save();
    res.redirect('/');

})
app.get('/resume',function(req,res){
    res.sendFile(__dirname+"/resource/Resume.pdf");
});
let port = process.env.PORT;
if (port == null || port == "") {
  port = 3000;
}

app.listen(port, function () {
    console.log("server has started");
})