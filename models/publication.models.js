
const mongoose= require('mongoose')

const publicationSchema= new mongoose.Schema(
    {
        name: { type: String, required: true},
    },
    {
        versionKey:false,
        timeStamps:true
    }
)
const Publication = mongoose.model("publication",publicationSchema)

module.exports= Publication;