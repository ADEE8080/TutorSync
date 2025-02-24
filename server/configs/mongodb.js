import mongoose from "mongoose";

//connect to databse

const connectDB = async()=>{
    mongoose.connection.on('connected', ()=> 
        console.log('Database Connected'))

    await mongoose.connect(`${process.env.MONGODB_URI}/tutorsync`)
}

export default connectDB