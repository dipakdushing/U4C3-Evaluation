
const mongoose= require('mongoose')

const publicationSchema= new mongoose.Schema(
    {
        body: { type: String, required: true},
    },
    {
        versionKey:false,
        timeStamps:true,
    }
)
const Comment = mongoose.model("comment",commentSchema)

module.exports= Comment;