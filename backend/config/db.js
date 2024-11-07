import mongoose from "mongoose";
const connectDB = async()=>{
    try{
        const conn = await mongoose.connect(process.env.URL);
        console.log("Connected to mongodb");
    }
    catch(error){
        console.log("error in mongoDB", error);
    }
}
export default connectDB;