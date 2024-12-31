const express = require("express");
const app= express();
const port =8080;
const path=require("path");
const { v4: uuidv4 } = require('uuid');          //assigns unique id to each user
const methodOverride=require("method-override")  //changes post reques to delete/patch/put
app.set("view engine","ejs");                   //configures Express to use the EJS templating engine for rendering dynamic HTML views.
app.set("views",path.join(__dirname,"views"));   //in views we store ejs files.specifies the directory where Express should look for EJS template files.
app.use(express.static(path.join(__dirname,"public")));  //in public we store css files.serves static files (like CSS, JavaScript, images) from the public directory, making them accessible to the browser directly.

app.use(express.urlencoded({extended:true}));   //it make request readable by express frame work
app.use(methodOverride("_method"));

let posts=[
    {
        id:uuidv4(),
        username:"Iron Man",
        content:"A billionaire inventor who creates a high-tech suit of armor.",
    },
    {
        id:uuidv4(),
        username:"Jack Sparrow",
        content:"The problem is not the problem. The problem is your attitude about the problem.",
    },
    {
        id:uuidv4(),
        username:"Batman",
        content:"The Dark Knight, a vigilante who uses his wealth, intelligence, and martial arts skills to fight crime in Gotham City.",
    },
   
]

app.get('/posts',(req,res)=>{
   res.render("index.ejs",{posts});
});

app.get('/posts/new',(req,res)=>{
   res.render("new.ejs");
});

app.post("/posts",(req,res)=>{
    let{username,content}=req.body;
    let id=uuidv4();
    posts.push({id,username,content});
    res.redirect("/posts");
});

app.get("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("show.ejs",{post});
});

app.patch("/posts/:id",(req,res)=>{
    let {id}=req.params;
    let newcontent=req.body.content;
    let post=posts.find((p)=>id===p.id);
    post.content=newcontent;
    res.redirect("/posts");
});

app.get("/posts/:id/edit",(req,res)=>{
    let {id}=req.params;
    let post=posts.find((p)=>id===p.id);
    res.render("edit.ejs",{post});
});

app.delete("/posts/:id",(req,res)=>{
    let {id}=req.params;
    posts=posts.filter((p)=>id!==p.id);
    res.redirect("/posts");
});

app.listen(port,()=>{
    console.log(`listening to port:${port}`);
});