export function checkIsVotePeriod() {
  const startDate = process.env.NEXT_PUBLIC_VOTE_START_DATE
  const expiryDate = process.env.NEXT_PUBLIC_VOTE_EXPIRY_DATE

  if (!startDate)
    throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_VOTE_EXPIRY_DATE"')
  if (!expiryDate)
    throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_VOTE_EXPIRY_DATE"')

  const start = new Date(startDate)
  const expiry = new Date(expiryDate)
  const now = new Date()

  return start.getTime() <= now.getTime() && now.getTime() <= expiry.getTime()
}

export function checkIfAnnounced() {
  const annouceDate = process.env.NEXT_PUBLIC_VOTE_ANNOUCEMENT_DATE

  if (!annouceDate)
    throw new Error('Invalid/Missing environment variable: "NEXT_PUBLIC_VOTE_ANNOUNCEMENT_DATE"')

  const announce = new Date(annouceDate)
  const now = new Date()

  return announce.getTime() <= now.getTime()
}
