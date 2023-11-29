import { useEffect, useState } from 'react';
import CandidatesInfo from '@/data/candidates.json';
import { checkIfAnnounced, checkIsVotePeriod } from '@/utils/dateCheck';
import generateSemaphoreProof from '@/utils/semaphore';

export interface Candidate {
    index: number;
    potrait: string;
    name: string;
    gender: string;
    dao: string;
    voteCount?: number;
    handleVote?: () => Promise<any> | undefined;
    voted?: boolean;
    elected?: boolean;
}

export default function useCandidates({ useDiD }: { useDiD: boolean }) {
    const announced = checkIfAnnounced();
    const isVotePeriod = checkIsVotePeriod();
    const [voteCounts, setVoteCounts] = useState<number[]>([]);
    const [voted, setVoted] = useState<number>(-1);

    useEffect(() => {
        if (announced)
            fetchVoteCounts().then(setVoteCounts);
    }, [])


    return CandidatesInfo.map(candidate => ({
        ...candidate,
        voteCount: (announced && voteCounts[candidate.index]) ? (voteCounts[candidate.index] + (voted == candidate.index ? 1 : 0)) : undefined,
        handleVote: !isVotePeriod ? undefined : useDiD ? () => didVote(candidate.index) : () => liveVote(candidate.index),
        elected: (announced && voteCounts[candidate.index]) ? voteCounts[candidate.index] === Math.max(...voteCounts) : undefined,
    }));

    async function fetchVoteCounts() {
        try {
            const voteCounts = await fetch('/api/getVoteCounts').then((res) => res.json());
            return voteCounts;
        } catch (err) {
        }
    }

    async function didVote(candidateId: number) {
        const { fullProof, isValid } = await generateSemaphoreProof(candidateId);

        if (isValid) {
            const response = await fetch('/api/addDiDVote', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    fullProof,
                    candidateId,
                }),
            })

            if (response.status !== 200) {
                const result = await response.json();
                throw new Error(result.message);
            }

            setVoted(candidateId);
            return;
        }
        else {
            throw new Error('The identity is not part of the group');
        }
    }

    async function liveVote(candidateId: number) {
        if (voted > -1) {
            throw new Error('already voted');
        }
        const response = await fetch('/api/addLiveVote', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ candidateId }),
        });
        const result = await response.json();
        setVoted(candidateId);
        return result;
    }

}

