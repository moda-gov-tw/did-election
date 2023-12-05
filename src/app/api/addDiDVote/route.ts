import { checkIsVotePeriod } from '@/utils/dateCheck';
import { getCandidatesModel } from '@/utils/candidateModel';
import { getHashesModel } from '@/utils/hashModel';
import { verifyProof } from '@semaphore-protocol/proof';
import { SemaphoreProof } from '@semaphore-protocol/proof';
import { SEMAPHORE_GROUP_DEPTH } from '@tw-did/core';

export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request: Request) {
  try {
    const isVotePeriod = checkIsVotePeriod();
    if (!isVotePeriod)
      return Response.json({ message: 'election ended' }, { status: 403 })

    const requestBody = await parseRequest(request)
    if (!requestBody)
      return Response.json({ message: 'invalid request body' }, { status: 403 })

    const { candidateId, fullProof } = requestBody
    if (candidateId > 3)
      return Response.json({ message: 'invalid candidateId' }, { status: 403 })

    // TODO: verify in server
    const proofValid = await verifyProof(fullProof, SEMAPHORE_GROUP_DEPTH)
    if (!proofValid)
      return Response.json({ message: 'The identity is not part of the group' }, { status: 403 })

    const nullifierHashcheck = await addNullifier(fullProof.nullifierHash);
    if (!nullifierHashcheck) return Response.json({ message: 'already voted' }, { status: 403 })

    const updateResult = await updateinDB(candidateId);
    return Response.json({ message: `voted to candidate #${candidateId}` }, { status: 200 })
  }
  catch (err) {
    console.log(err)
    return Response.json({ message: 'failed' }, { status: 500 })
  }
}

/* DID Vote */

interface requestBody {
  candidateId: number;
  fullProof: SemaphoreProof;
}

async function parseRequest(request: Request): Promise<requestBody | null> {
  try {
    const { candidateId, fullProof } = await request.json()
    return { candidateId, fullProof };
  }
  catch (err) {
    return null;
  }
}

async function addNullifier(nullifierHash: number) {
  const hashesCollection = await getHashesModel();
  const exist = await hashesCollection.findHash(nullifierHash);
  if (exist)
    return false;
  const added = await hashesCollection.addHash(nullifierHash);
  return added;
}

async function updateinDB(candidateId: number) {
  const candidateCollection = await getCandidatesModel();
  await candidateCollection.addCountToCandidate(candidateId, 'didVote');
  return true;
}
