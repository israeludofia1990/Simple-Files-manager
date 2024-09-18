const { MongoClient } = require('mongodb');
const dotenv = require('dotenv');


dotenv.config();


class DBClient {
    constructor() {
        //const host = process.env.DB_HOST || 'localhost';
        //const port = process.env.DB_PORT || '27017';
        const url = process.env.DB_URI;
        if (!url) {
            throw new Error('MongoDB connection URI is missing from .env');
        }
        const dbName = process.env.DB_NAME || 'files_manager';
        this.client = new MongoClient(url, { useUnifiedTopology: true });
        this.db = this.client.db(dbName);

        // Initialize the collection
        this.client.connect()
            .then(() => {
                console.log('Connected to MongoDB');
            })
            .catch((error) => {
                console.error('Error connecting to MongoDB:', error);
            });
    }

    // Function to check if the connection to MongoDB is alive
    isAlive() {
        return this.client.isConnected();
    }
    // Asynchronous function to get the number of users in the 'users' collection
    async nbUsers() {
        const usersCollection = this.db.collection('users');
        const userCount = await usersCollection.countDocuments();
        return userCount; 
    }
    // Asynchronous function to get the number of files in the 'files' collection
    async nbFiles() {
        const filesCollection = this.db.collection('files');
        const fileCount = await filesCollection.countDocuments();
        return fileCount;
    }
}
const dbClient = new DBClient();
module.exports = dbClient;