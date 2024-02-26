// import mongoose from "mongoose";

// import { MongoMemoryServer } from "mongodb-memory-server";
// import ENV from '../config.js'

// async function connect(){

//     const mongod = await MongoMemoryServer.create();
//     const getUri = mongod.getUri();

//     mongoose.set('strictQuery', true)
//     // const db = await mongoose.connect(getUri);
//     const db = await mongoose.connect(ENV.ATLAS_URI);
//     console.log("Database Connected")
//     return db;
// }

// export default connect;


import mongoose from 'mongoose';

async function connect() {
    // const mongod = await MongoMemoryServer.create(); // Commented out since MongoMemoryServer is not used
    // const uri = await mongod.getUri(); // Commented out since MongoMemoryServer is not used

    const uri = 'mongodb://localhost:27017/billing'; 

    mongoose.set('strictQuery', true);

    try {
        const db = await mongoose.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        });
        console.log("Database Connected");
        return db; // Return the database connection
    } catch (error) {
        console.error("Database connection error:", error);
        throw error; // Throw the error to be caught by the caller
    }
}

export default connect;
