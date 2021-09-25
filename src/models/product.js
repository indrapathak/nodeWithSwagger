const { number } = require('joi');
let mongoose = require('mongoose')
const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: {
        type: String,
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    categories:{
        type : Array
    },
    sellerName: {
        type: String
    },
    brand: {
        type: String
    },
    create_date: {
        type: Date,
        default: new Date(new Date().getTime() + 19800000),
    }
}, {
    collection: 'product'
});

productSchema.index({ "name": 1 }, { "unique": true })
module.exports =  mongoose.model('product', productSchema)