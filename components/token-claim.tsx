import { Web3Button } from "@thirdweb-dev/react";
import { TOKEN_CONTRACT } from "../const/addresses";

export default function TokenClaim() {
    return (
        <>
            <h3>Claim Tokens</h3>
            <p>Claim 100 tokens for FREE!</p>
            <Web3Button
                contractAddress={TOKEN_CONTRACT}
                action={(contract) => contract.erc20.claim(100)}
            >Claim Tokens</Web3Button>
        </>
    );
};