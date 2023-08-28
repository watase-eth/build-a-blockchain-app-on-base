import { ThirdwebSDK } from "@thirdweb-dev/sdk";
import { NextApiRequest, NextApiResponse } from "next";
import { KEY_PASS_CONTRACT, REWARD_CONTRACT } from "../../const/addresses";

export default async function server(
    req: NextApiRequest,
    res: NextApiResponse
){
    try {
        const { claimerAddress } = JSON.parse(req.body);

        if(!process.env.PRIVATE_KEY){
            throw new Error("No private key found.")
        }

        const sdk = ThirdwebSDK.fromPrivateKey(
            process.env.PRIVATE_KEY,
            "base-goerli"
        );

        const keyPass = await sdk.getContract(KEY_PASS_CONTRACT);

        const reward = await sdk.getContract(REWARD_CONTRACT);

        const isOwner = (await keyPass.erc1155.balanceOf(claimerAddress, 0)).gt(0);

        if(!isOwner){
            throw new Error("You don't own this NFT.")
        }

        const hasClaimed = (await reward.erc721.balanceOf(claimerAddress)).gt(0);
        if(hasClaimed){
            throw new Error("You have already claimed the reward.")
        }

        const payload = {
            to: claimerAddress
        }

        const signedPayload = await reward.erc721.signature.generate(payload);

        res.status(200).json({
            signedPayload: JSON.parse(JSON.stringify(signedPayload))
        })
    } catch (error) {
        res.status(500).json({error: `Server error ${error}`})
    }
}