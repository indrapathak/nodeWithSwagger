
 let mongoose = require('mongoose')
 const Schema = mongoose.Schema;
 
 const categorySchema = new Schema({
     title: {
         type: String,
         required: true,
     },
     catId :{
        type : String,
        required :true
     },  
     create_date: {
         type: Date,
         default: new Date(new Date().getTime() + 19800000),
        
     }
 }, {
     collection: 'category'
 });
 
 categorySchema.index({"catId":1},{"unique":true})
 module.exports =  mongoose.model('category', categorySchema)