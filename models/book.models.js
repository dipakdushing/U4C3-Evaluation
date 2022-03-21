const mongoose= require('mongoose')
const bookSchema= new mongoose.Schema(
    {
        likes:{type:Number, required:true},
        coverImage:{type:String,required:true},
        content:{type:String,required:true},
        authorId: {type: mongoose.Schema.Types.ObjectId, ref: "user",required:true},
    },{
        versionKey:false,
        timeStamps:true,
    }
)
const Book = mongoose.model("book",bookSchema)

module.exports= Book;