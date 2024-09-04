import { useEffect, useState } from "react";
import { NFT_ABI, NFT_ADDRESS, REVIEW_ADDRESS, REVIEW_ABI } from "./constant";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export default function Nftvida() {
 
  const[isLoading, setisLoading]= useState(false);
  const[tokenCounter, setTokenCounter] = useState(0);
  const[mintStatus, setMintStatus] = useState(false);

  const{ address, isConnected } = useAccount();
  const {writeContractAsync} = useWriteContract();


  const {data: tokenid} = useReadContract({
    abi: NFT_ABI,
    address: NFT_ADDRESS,
    functionName: "getTokenCounter",
    watch: true
  })

  const {data: minstat} = useReadContract({
    abi: NFT_ABI,
    address: NFT_ADDRESS,
    functionName: "getMintstat",
    args: [address],
    watch:true,
  })



  const mintNft= async () => {
     setisLoading(true);
     try {
       
      await writeContractAsync({
        abi: NFT_ABI,
        address: NFT_ADDRESS,
        functionName:"mint",
      },
    {
      onSuccess(result) {
        console.log(result);
      }
    })
    setisLoading(false);
     } catch (error) {
      console.error(error);
     }
  }

  useEffect(()=> {
    if(minstat !== undefined) setMintStatus(mintStatData);
    if (tokenid !== undefined) setTokenCounter(tokenid);
  }, [minstat, tokenid]);


  return(
    <>
     <div className="flex items-center justify-center h-screen">
       
          {isConnected && (
              <div className="w-full max-w-lg bg-white p-6 rounded-lg shadow-md">
                 <h1>VIDA NFT</h1>
                <p>Status: {mintStatus ? "Minted" : "Not Minted"}</p>
                <p>Total NFTs Minted: {tokenCounter.toString()}</p>
                <button
                  className="px-4 py-2 bg-red-600 text-white font-semibold rounded-lg shadow-md hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-400 focus:ring-opacity-75"
                  onClick={mintNft}
                  disabled={isLoading || mintStatus}
                >
                  {isLoading ? "Minting..." : "Mint NFT"}
                </button>
              </div>
          )}
     </div>
    </>
  )
}