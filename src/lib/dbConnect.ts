import mongoose from "mongoose"
// jb database se connection se yaha pr aata hai to yaha pr data base k baad jo object aarha h wo ky object hai to waha pr typesckript laga rhe hai 
type ConnectionObject = {
    isConnected?: number
}


const connection: ConnectionObject = {}

async function dbConnect(): Promise<void>{
    if(connection.isConnected){
        console.log("Already connected to database");
        return
    }

    try {
        const db = await mongoose.connect(process.env.MONGODB_URI || '', {})

        connection.isConnected = db.connections[0].readyState 

        console.log("DB Connected Successfully")
    } catch (error) {
        console.log("Database Connection failed", error)

        process.exit(1)
        
    }
}

export default dbConnect;