const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Feedback")
const Feedback = mongoose.model("Feedback")
mongoose.connect("mongodb+srv://sarahkhabthani:ikRxlibnwPoio5EQ@feedbackcluster.qhmxq3i.mongodb.net/feedback").then(() => {
    console.log("Connection successful, do something");
  })
  .catch((error) => {
    console.log("Connection failed, handle the error");
  });

  //general route
app.get('/', (req,res) =>{
    res.send("this is our main endpoint !!!!");
})

//create feedback endpoint
app.post("/feedback",(req,res)=>{
  var newFeedback = {
    name: req.body.name,
    message: req.body.message
  }
//create new feedback with attribute in below
  var feedback = new Feedback(newFeedback)
  feedback.save().then(() =>{
    console.log("new feedback added !")
  }).catch((err)=>{
    if(err){
      throw err;
    }
    })
    res.send("a new feedback added with success !");
})

//get list of feedbacks
app.get("/feedbacks", (req,res)=>{

  Feedback.find().then((feedbacks)=>{
    res.json(feedbacks)
  }).catch(err=>{
  if(err){
    throw err;
  }
})
})

//get feedback by id
app.get("/feedback/:id",(req,res)=>{
  Feedback.findById(req.params.id).then((feedback)=>{
    if(feedback){
      res.json(feedback);
    }else{
      res.sendStatus(404);
    }
}).catch(err =>{
  if(err){
    throw err;
  }
})
})

//delete feedback by id
app.delete("/feedback/:id",(req,res)=>{
  Feedback.findByIdAndRemove(req.params.id).then(()=>{
    res.send("Feedback removed with success!")
  }).catch(err=>{
    if(err){
      throw err;
    }
  })
})


//server
app.listen(4545, () =>{
    console.log("server up !!");
})