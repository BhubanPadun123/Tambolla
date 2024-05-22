import { MongoClient, Db } from "mongodb";
import mongoose from "mongoose";

if (!process.env.MONGODB_CONNECTION_URL) {
    throw new Error('Invalid/Missing environment variable: "MONGODB_URI"');
}

const mongoURI = process.env.MONGODB_CONNECTION_URL;
let cachedClient: mongoose.Connection | null = null;


if (!mongoURI) {
    throw new Error("Database url not found!!!")
}

async function clientPromise() {
    
    const client = await MongoClient.connect(mongoURI);

    try {
        if(cachedClient){
            return
        }
        await mongoose.connect(mongoURI,{
            useBigInt64:true,
            useNewUrlParser: true,
            useUnifiedTopology: true,
        }).then((res)=>{
            console.log("Database connected successfully!!!"),
            cachedClient = res.connection
        })
    } catch (error) {
        console.log("Error While connect the database!!!")
    }
}
    

export default clientPromise
