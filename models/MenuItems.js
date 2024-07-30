const mongoose = require("mongoose");

const menuSchema = new mongoose.Schema({
    name: {
        type : String,
        required:true
    },
    price:{
        type : String,
        required:true
    },
    taste:{
        type : String,
        required:true,
        enum:['sweet', 'spicy', 'sour']
    },
    isDrink:{
        type : Boolean,
        default:false
    },
    ingredients:{
        type : [String],
        default:[]
    },
    numSales:{
        type:Number,
        default:0
    }
})

const menu = mongoose.model('menu-item', menuSchema)
module.exports = menu;