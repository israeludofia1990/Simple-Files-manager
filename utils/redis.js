import { createClient } from  'redis';

class RedisClient {
    constructor() {
        this.client = createClient({
            password: 'CbwQmpMvM7vgbCbUPZfIbZ3zpjILSqSu',
            socket: {
                host: 'redis-15022.c341.af-south-1-1.ec2.redns.redis-cloud.com',
                port: 15022
            }
        });
        // Redis client error handling
        this.client.on('error', (err) => {
            console.log('Redis Client Error:', err);
        });

        // Redis client connection handling
       this.client
            .connect()
            .then(() => {
                console.log('Redis Client Connected');
            })
            .catch((err) => {
                console.log('Redis Client Connection Error:', err);
            });
    }

    isAlive() {
        return this.client.isOpen;
    }

    async get(key) {
        return this.client.get(key);
    }

    async set(key, value, duration) {
        this.client.set(key, value);
        this.client.expire(key, duration);
    }

    async del(key) {
        this.client.del(key);
    }
}

const redisClient = new RedisClient();
export default redisClient;