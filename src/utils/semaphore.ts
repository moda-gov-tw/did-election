import { Identity } from '@semaphore-protocol/identity';
import {
    CommitmentsDto,
    SEMAPHORE_GROUP_DEPTH,
    SEMAPHORE_GROUP_ID
} from '@tw-did/core/src';
import { signMessage } from '@wagmi/core';
import { Group } from '@semaphore-protocol/group';
import {
    generateProof, verifyProof
} from '@semaphore-protocol/proof';
import { useAccount, useConfig, useConnect, useDisconnect } from 'wagmi'

export default async function generateSemaphoreProof(candidateId: number) {

    const identity = await generateSemaphoreIdentity()

    const commitments: CommitmentsDto = await fetchCommitments();

    const group = new Group(
        SEMAPHORE_GROUP_ID,
        SEMAPHORE_GROUP_DEPTH,
        commitments.activated.filter(c => c !== null)
    );

    const proposalId = await sha256('vote');

    const fullProof = await generateProof(
        identity,
        group,
        proposalId,
        candidateId
    );

    // send full proof to server and server can verify and then record in database
    const isValid = await verifyProof(fullProof, SEMAPHORE_GROUP_DEPTH);
    return { fullProof, isValid };
}

async function sha256(message: string): Promise<string> {

    /*
    // Convert the message to an ArrayBuffer
    const encoder = new TextEncoder();
    const data = encoder.encode(message);
    console.log('data', data)

    // Hash the data with SHA-256
    const hashBuffer = await crypto.subtle.digest('SHA-256', data);

    // Convert the result to a hex string
    const hashArray = Array.from(new Uint8Array(hashBuffer));
    const hashHex = hashArray
        .map((byte) => byte.toString(16).padStart(2, '0'))
        .join('');
        */

    // replacement for crypto.subtle.digest
    const { createHash } = require('crypto');
    const hashHex = createHash('sha256').update(message).digest('hex');

    return `0x${hashHex}`;
};


async function generateSemaphoreIdentity() {
    const message = `Sign this message to generate your Semaphore identity.`;
    const result = await signMessage({ message });
    return new Identity(result);
};

async function fetchCommitments() {
    const commitments: CommitmentsDto = await fetch(
        `${process.env.NEXT_PUBLIC_TW_DID_API}/api/users/commitments`
    ).then((res) => res.json());
    return commitments;
}

export async function verifySemaphoreProof(proof: any) {
    const isValid = await verifyProof(proof, SEMAPHORE_GROUP_DEPTH);
    return isValid;
}