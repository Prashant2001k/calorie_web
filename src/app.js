const express =require("express");
const app= express();
const path=require('path');
const hbs=require("hbs");
require("./db/conn");
const Register=require('./models/registers')
const port=process.env.PORT || 3001;
const static_path=path.join(__dirname,"../public");
const partials_path=path.join(__dirname,"../templates/partials");
const templates_path=path.join(__dirname,"../templates/views");

app.use(express.json());  //*********** */
app.use(express.urlencoded({extended:false})); ///********* */


app.set("view engine","hbs");
app.set("views",templates_path);
// app.set("views",jsfiles_path);
app.use(express.static(static_path));
hbs.registerPartials(partials_path);

app.get("/",(req,res)=>{

    res.render("signin");
})
// app.get("/home",(req,res)=>{

//     res.render("home");
// })
app.get("/signin",(req,res)=>{
    // res.send("<h1>hello this is our Home Page</h1>");
    res.render("signin");
}) 
app.get("/fruit",(req,res)=>{
    // res.send("<h1>hello this is our Home Page</h1>");
    res.render("fruit");
}) 
app.get("/contact",(req,res)=>{
    // res.send("<h1>hello this is our Home Page</h1>");
    res.render("contact");
})
app.get("/bmi",(req,res)=>{
    // res.send("<h1>hello this is our Home Page</h1>");
    res.render("bmi");
}) 
// app.get("/register",(req,res)=>{
//     // res.send("<h1>hello this is our Home Page</h1>");
//     res.render("register");
// }) 

// app.get("/signin/up",(req,res)=>{
//     // res.send("<h1>hello this is our Home Page</h1>");
//     res.render("signin");
// }) 



app.post("/up",async(req,res)=>{
    
    // res.render('home');

    try {  
        const password=req.body.password;
        const cpassword=req.body.Confirmpassword;
        
        if(password== cpassword){
            // res.send(req.body.fullname); 
            const registeruser = new Register({
                    
                    fullname :req.body.fullname,
                    email:req.body.email,  
                    password:password,
                    confirmpassword:cpassword,
                })
                const registered= await registeruser.save();

                const str=req.body.fullname;
                const upper=str.toUpperCase();
                console.log(password);
                res.status(201).render("home",{
                    flag:true,
                    username:`${upper}`,
                }); 
            } 
            else{
                res.send("passwords are not matching");
    
            } 
        } catch (error) {
            res.send(400).send("error");
    }
})


app.post("/in",async(req,res)=>{
    try{
        const email=req.body.emailaddress;
        const password=req.body.passwordr;
        // console.log(`${email} ${password}`);
        const useremail=await Register.findOne({email:email});
        if(useremail.password == password){
            const str=useremail.fullname;
            const upper=str.toUpperCase();
            // console.log(nm);
            // res.send(useremail); 

            res.status(201).render("home",{
                flag:true,
                username:`${upper}`,
                // username:`${useremail.fullname}`,
            });
        }else{
            res.send("invalid login Detials ");
        }
    }catch(error){
        res.status(400).send("invalid login details");
    }
})
app.listen(port,()=>{
    console.log(`successfully Work! on Port : ${port}`);
})