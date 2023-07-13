const express = require("express");
const app = express();


const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mongoose = require("mongoose");
const axios = require("axios");
require("./Reclamation")

const Reclamation = mongoose.model("Reclamation")
mongoose.connect("mongodb+srv://sarahkhabthani:sa9hokIlS0BTqjYT@reclamations.u5jnwqd.mongodb.net/reclamations").then(() => {
    console.log("Connection reclamation database successful, do something");
  })
  .catch((error) => {
    console.log("Connection reclation database failed, handle the error");
  });

  //general route
app.get('/', (req,res) =>{
    res.send("this is our main endpoint !!!!");
})

//create new reclamation

app.post("/reclamation",(req,res)=>{
    var newReclamation = {
        customerID: new mongoose.Types.ObjectId(req.body.customerID),
        reclamation_message: req.body.reclamation_message
    }

    var reclamation = new Reclamation(newReclamation);
    reclamation.save().then(()=>{
        console.log("Reclamation created with success")
     res.send("a new reclamation added with success")
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
   
})

//list all reclamations
app.get("/reclamations",(req,res)=>{
    Reclamation.find().then((customers)=>{
        res.json(customers)
    }).catch((err)=>{
        if(err){
            throw err;
        }
    })
})

//show the customer name inside reclamation
app.get("/reclamation/:id",(req,res)=>{
    Reclamation.findById(req.params.id).then((reclamation)=>{
        if(reclamation){
            axios.get("http://localhost:5555/customer/"+ reclamation.customerID)
            .then((response)=>{
                var reclamationObject ={customerName: response.data.name}
                res.json(reclamationObject)
            })

        }else{
            res.send("Invalid Reclamation")
        }
    })
})

//server
app.listen(7777, () =>{
    console.log("server reclamations up !!");
})