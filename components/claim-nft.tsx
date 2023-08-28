import { Web3Button, useAddress, useContract } from "@thirdweb-dev/react";
import { REWARD_CONTRACT } from "../const/addresses";

export default function ClaimNFT() {
    const address = useAddress();

    const {
        contract: rewardContract
    } = useContract(REWARD_CONTRACT);

    
    const mintWithSignature = async () => {
        try {
            const signedPayloadReq = await fetch(`/api/server`, {
                method: "POST",
                body: JSON.stringify({
                    claimerAddress: address
                })
            });

            const json = await signedPayloadReq.json();

            if (!signedPayloadReq.ok) {
                alert(json.error);
            }

            const signedPayload = json.signedPayload;

            const prize = await rewardContract?.erc721.signature.mint(signedPayload);

            alert("NFT prize claimed!");
            return prize;
        } catch (error) {
            console.error(error);
        }
    };
    return (
        <>
            <h3>Claim Base NFT</h3>
            <Web3Button
                contractAddress={REWARD_CONTRACT}
                action={() => mintWithSignature()}
            >Claim Reward</Web3Button>
        </>
    );
};