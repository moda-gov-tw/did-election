import { Collection } from 'mongodb';
import dbPromise from '@/utils/mongodb';

export interface CandidateVote {
    index: number;
    liveVote: number;
    didVote: number;
}

export async function getCandidatesModel() {
    const db = await dbPromise();
    const collection = db.collection('candidates');
    return {
        addCountToCandidate: async (candidateId: number, voteType: 'liveVote' | 'didVote') => {
            return addCountToCandidate(collection, candidateId, voteType);
        },
        query: async () => {
            return queryCandidates(collection);
        }
    }
}

async function queryCandidates(candidatesCollection: Collection) {
    return candidatesCollection.find().toArray();
}

async function addCountToCandidate(CandidateCollection: Collection, candidateId: number, voteType: 'liveVote' | 'didVote') {
    return CandidateCollection.updateOne(
        { index: candidateId },
        { $inc: { [voteType]: 1 } },
        { upsert: true }
    );
}