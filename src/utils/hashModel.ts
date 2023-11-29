
import { Collection } from 'mongodb';
import dbPromise from '@/utils/mongodb';

export async function getHashesModel() {
    const db = await dbPromise();
    const collection = db.collection('hashes');
    return {
        addHash: async (hash: number) => {
            return addHash(collection, hash);
        },
        findHash: async (hash: number) => {
            return findHash(collection, hash);
        }
    }
}

async function addHash(hashesCollection: Collection, hash: number) {
    return hashesCollection.insertOne({ hash });
}

async function findHash(hashesCollection: Collection, hash: number) {
    return hashesCollection.findOne({ hash });
}