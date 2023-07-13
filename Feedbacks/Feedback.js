const mongoose = require("mongoose");
mongoose.model("Feedback",{
    name:{
        type: String,
        require: true
    },
    message:{
        type: String,
        require: true
    }
});