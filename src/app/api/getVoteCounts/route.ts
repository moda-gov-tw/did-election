import { checkIfAnnounced } from "@/utils/dateCheck"
import { getCandidatesModel } from "@/utils/candidateModel"
import candidatesInfo from "@/data/candidates.json"

export const dynamic = "force-dynamic" // defaults to force-static

export async function GET(request: Request) {
  try {
    const announced = checkIfAnnounced()
    if (!announced) return Response.json({ message: "election not announced" }, { status: 403 })

    const response = await getVoteCountArr()
    return Response.json(response, { status: 200 })
  } catch (err) {
    console.log(err)
    return Response.json({ message: "failed" }, { status: 500 })
  }
}

async function getVoteCountArr() {
  const candidatesModel = await getCandidatesModel()
  const voteRecords = await candidatesModel.query()

  return candidatesInfo.map((candidate, index) => {
    const record = voteRecords.find(({ index: i }) => i === index)
    const liveVote = record?.liveVote || 0
    const didVote = record?.didVote || 0
    const totalVote = liveVote + didVote
    return totalVote
  })
}
