import { handleKitClaim } from '../../_lib/handle-kit-claim'

export async function POST(req: Request) {
	return handleKitClaim(req, 'saaskit')
}
