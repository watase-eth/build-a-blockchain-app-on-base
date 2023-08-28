import { Web3Button } from "@thirdweb-dev/react";
import { KEY_PASS_CONTRACT } from "../const/addresses";

export default function PassClaim() {
    return (
        <>
            <h3>Claim Key Pass</h3>
            <p>Claim a Key Pass for 10 tokens.</p>
            <Web3Button
                contractAddress={KEY_PASS_CONTRACT}
                action={(contract) => contract.erc1155.claim(0, 1)}
                onSuccess={(alert) => "Key Pass claimed!"}
            >Claim Pass</Web3Button>
        </>
    );
};