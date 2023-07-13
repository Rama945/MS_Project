const express = require("express");
const app = express();

const bodyParser = require("body-parser");
app.use(bodyParser.json());

const mongoose = require("mongoose");

require("./Customer")
const Customer = mongoose.model("Customer")
mongoose.connect("mongodb+srv://sarahkhabthani:e9Vqyj8FdzchymX7@customer.ekiawnt.mongodb.net/customer").then(() => {
    console.log("Connection customer database successful, do something");
  })
  .catch((error) => {
    console.log("Connection customer database failed, handle the error");
  });

  //general route
app.get('/', (req,res) =>{
    res.send("this is our main endpoint !!!!");
})

//create customer endpoint
app.post("/customer",(req,res)=>{
  var newCustomer = {
    name: req.body.name,
    age: req.body.age,
    address: req.body.address
  }
//create new customer with attribute in below
  var customer = new Customer(newCustomer)
  customer.save().then(() =>{
    console.log("new customer added !")
  }).catch((err)=>{
    if(err){
      throw err;
    }
    })
    res.send("a new customer added with success !");
})

//get list of customers
app.get("/customers", (req,res)=>{

  Customer.find().then((customers)=>{
    res.json(customers)
  }).catch(err=>{
  if(err){
    throw err;
  }
})
})

//get customer by name
app.get("/customer/:id",(req,res)=>{
  Customer.findById(req.params.id).then((customer)=>{
    if(customer){
      res.json(customer);
    }else{
      res.sendStatus(404);
    }
}).catch(err =>{
  if(err){
    throw err;
  }
})
})

//delete customer by id
app.delete("/customer/:id",(req,res)=>{
  Customer.findByIdAndRemove(req.params.id).then(()=>{
    res.send("Customer removed with success!")
  }).catch(err=>{
    if(err){
      throw err;
    }
  })
})


//server
app.listen(5555, () =>{
    console.log("server customer up !!");
})