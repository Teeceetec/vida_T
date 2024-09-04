import { useState } from 'react'
import { NFTCard } from './NftCard';

const NftGallery = () => {
  const [wallet, setWalletAddress] = useState("");
  const [collection, setCollectionAddress] = useState("");
  const [NFTs, setNFTs] = useState([])
  const [fetchForCollection, setFetchForCollection]=useState(false)

 const fetchNFTs = async () => {
    let nfts; 
    console.log("Fetching NFTs...");

    const api_key = "B9NTqCCddA-k5VE3QCHL-gqQJaaLStfZ";
    const baseURL = `https://eth-sepolia.g.alchemy.com/v2/${api_key}/getNFTs/`;
    

    if (!wallet) {
        console.error("Wallet address is not provided!");
        return;
    }

    const requestOptions = {
        method: 'GET'
    };

    try {
        const fetchURL = collection?.length
            ? `${baseURL}?owner=${wallet}&contractAddresses%5B%5D=${collection}`
            : `${baseURL}?owner=${wallet}`;

        const response = await fetch(fetchURL, requestOptions);
        if (!response.ok) {
            throw new Error(`HTTP error! Status: ${response.status}`);
        }

        nfts = await response.json();

        if (nfts) {
            console.log("NFTs:", nfts);
            setNFTs(nfts.ownedNfts);
        }
    } catch (error) {
        console.error("Failed to fetch NFTs:", error);
    }
};


  const fetchNFTsForCollection = async () => {
  if (collection.length) {
    var requestOptions = {
      method: 'GET'
    };
    const api_key = "B9NTqCCddA-k5VE3QCHL-gqQJaaLStfZ"
    const baseURL =`https://eth-sepolia.g.alchemy.com/v2/${api_key}/getNFTs/`;
    const fetchURL = `${baseURL}?contractAddress=${collection}&withMetadata=${"true"}`;
    const nfts = await fetch(fetchURL, requestOptions).then(data => data.json())
    if (nfts) {
      console.log("NFTs in collection:", nfts)
      setNFTs(nfts.nfts)
    }
  }
}

 const walletchange =(e) => {
  setWalletAddress(e.target.value);
 }

 const collectionChange =(e) =>{
  setCollectionAddress(e.target.value); 
 }
  return (
    <div className="flex flex-col items-center justify-center py-8 gap-y-3">
      <div className="flex flex-col w-full justify-center items-center gap-y-2">
        <input disabled={fetchForCollection} type={"text"} onChange={walletchange} value={wallet} placeholder="Add your wallet address"></input>
        <input type={"text"} onChange={collectionChange} 
        value={collection} placeholder="Add the collection address"></input>
        <label className="text-gray-600 "><input onChange={(e)=>{setFetchForCollection(e.target.checked)}} type={"checkbox"} className="mr-2"></input>Fetch for collection</label>
        <button className={"disabled:bg-slate-500 text-white bg-blue-400 px-4 py-2 mt-3 rounded-sm w-1/5"} onClick={
           () => {
            if (fetchForCollection) {
              fetchNFTsForCollection()
            }else fetchNFTs()
          }
        }>Let's go! </button>
      </div>
      <div className='flex flex-wrap gap-y-12 mt-4 w-5/6 gap-x-2 justify-center'>
        {
          NFTs.length && NFTs.map(nft => {
            return (
              <NFTCard nft={nft}></NFTCard>
            )
          })
        }
      </div>
    </div>
  )
}

export default NftGallery