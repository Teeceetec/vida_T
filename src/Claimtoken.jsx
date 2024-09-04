import { useEffect, useState } from "react";
import { NFT_ABI, NFT_ADDRESS, REVIEW_ADDRESS, REVIEW_ABI } from "./constant";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export default function claimToken() {

  const [loading, setLoading] =useState(false);
  const [isClaiming , setIsClaiming] = useState(false);

   const [error, setError] = useState('');
  const {writeContractAsync} = useWriteContract();
  const { address, isConnected } = useAccount();

  const claimToken = async () => {
    setLoading(true);
   
     if(!isConnected){
        setError("Please connect your wallet first");
        return;
     }
      
     setIsClaiming(true);
     setError('');


    try {
      
     await writeContractAsync({
       abi: REVIEW_ABI,
       address: REVIEW_ADDRESS,
       functionName:"claimToken"
     })
  
    } catch (error) {
     console.error(error);
     setError("Failed to claim token.. Please try again")
    }
    setLoading(false);
 }

  return(
    <>
    {isConnected && (
        <button
        className=" px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
        onClick={claimToken}
       disabled={isClaiming}
     >
        {isClaiming ? "Claiming..." : "Claim Tokens"}
     </button>
    )}
    
    </>
  )

}