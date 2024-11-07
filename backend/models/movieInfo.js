import mongoose from "mongoose";
const movieSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'signin',
        required:true
    },
    movieName:{
        type:String,
        required:true
    },
    movieId:{
        type:String,
        require:true
    },
    movieImage:{
        type:String,
        require:true
    }
})
const movieList = mongoose.model("Watchlist",movieSchema);
export default movieList;