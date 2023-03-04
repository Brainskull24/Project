const express = require("express");
const path = require("path");
const app = express();
const hbs = require("hbs");
const port = process.env.PORT || 2000
const Register = require("./models/registers")
const bcrypt = require("bcryptjs");
require("./db/conn");

const static_path = path.join(__dirname + './public')
const templates_path = path.join(__dirname,"../templates/views")
const partials_path = path.join(__dirname,"../templates/partials")

app.use(express.json())
app.use(express.urlencoded({extended : false}))
app.use(express.static(static_path));
app.set("view engine", "hbs")
app.set("views",templates_path);
hbs.registerPartials(partials_path);

// app.get("/", (req,res)=> {
//       res.render("index")
// });

app.get("/", (req,res)=> {
    res.render("index")
});


app.get("/signup", (req,res)=> {
    res.render("signup")
});

app.get("/login", (req,res)=> {
    res.render("login")
});
app.post("/signup", async (req,res)=> {
    try{
        const Password = req.body.Password;
        const Confirmpassword = req.body.Confirmpassword;
        
        if(Password == Confirmpassword){

            const registerEmployee = new Register({
                Name: req.body.Name,
                Age: req.body.Age,
                EmailAddress: req.body.EmailAddress,
                Password: Password,
                Confirmpassword: Confirmpassword,
                Contact: req.body.Contact
            })

            const registered = await registerEmployee.save();
            res.status(201).render(index);
        }

        else{
            res.send(`passwords are not matching`)
        }
    }

    catch(err){
        res.status(400).send(err);
    }
});

app.post("/login", async (req,res)=> {
    try{
        const EmailAddress = req.body.EmailAddress;
        const Password = req.body.Password;    
        const useremail = await Register.findOne({EmailAddress : EmailAddress});
        

        const PasswordMatch = await bcrypt.compare(Password , useremail.Password)
        if(PasswordMatch){
            res.status(200).render("index");
            // res.send(useremail);
            // console.log(useremail);
        }
        else{
            res.status(400).send(`invalid password`)
        }
    }
    catch(error){
        res.status(400).send("Invalid Credantials")
    }
});

app.listen(port , ()=>{
    console.log(`server is running at port no. ${port}`);
});