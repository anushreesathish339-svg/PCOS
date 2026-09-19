require("dotenv").config();
const mongoose = require("mongoose");

const clearDatabase = async () => {
    try {
        if (!process.env.MONGO_URI) {
            throw new Error("MONGO_URI is not defined in the environment.");
        }
        await mongoose.connect(process.env.MONGO_URI);
        console.log("✅ Connected to MongoDB.");
        
        const collections = Object.keys(mongoose.connection.collections);
        for (const collectionName of collections) {
            await mongoose.connection.collections[collectionName].deleteMany({});
            console.log(`🧹 Cleared collection: ${collectionName}`);
        }
        
        console.log("🎉 Database cleared successfully!");
        process.exit(0);
    } catch (error) {
        console.error("❌ Error clearing database:", error);
        process.exit(1);
    }
};

clearDatabase();
