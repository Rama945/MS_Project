const mongoose = require("mongoose");
mongoose.model("Reclamation",{
    customerID:{
        type: mongoose.SchemaTypes.ObjectId,
        require: true
    },
    reclamation_message:{
        type: String,
        require:true
    }
});