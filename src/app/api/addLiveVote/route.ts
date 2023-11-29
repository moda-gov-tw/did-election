import { getCandidatesModel } from '@/utils/candidateModel';
import { checkIsVotePeriod } from '@/utils/dateCheck';
export const dynamic = 'force-dynamic' // defaults to force-static

export async function POST(request: Request) {
  try {
    const isVotePeriod = checkIsVotePeriod();
    if (!isVotePeriod)
      return Response.json({ message: 'election ended' }, { status: 403 })

    const requestBody = await parseRequest(request)
    if (!requestBody)
      return Response.json({ message: 'invalid request body' }, { status: 403 })

    const { candidateId } = requestBody
    if (candidateId > 3)
      return Response.json({ message: 'invalid candidateId' }, { status: 403 })

    const updateResult = await updateinDB(candidateId);
    return Response.json({ message: `voted to candidate #${candidateId}` }, { status: 200 })
  }
  catch (err) {
    console.log(err)
    return Response.json({ message: 'failed' }, { status: 500 })
  }
}

interface requestBody {
  candidateId: number;
}

async function parseRequest(request: Request): Promise<requestBody | null> {
  try {
    const { candidateId } = await request.json()
    return { candidateId };
  }
  catch (err) {
    return null;
  }
}

async function updateinDB(candidateId: number) {
  const candidateCollection = await getCandidatesModel();
  await candidateCollection.addCountToCandidate(candidateId, 'liveVote');
  return true;
}

