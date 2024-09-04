import { useState } from 'react'
import NftGallery from './nftGallery'
import { ConnectButton } from '@rainbow-me/rainbowkit';
import  Nftvida from './Nftvida'
import UserReviews from './UserReviews';
import GetReviews from './GetReviews';
import ClaimToken from './Claimtoken';


function App() {
 

  return (
    <>
     <NftGallery/>
     <Nftvida />
       <UserReviews /> 
       <GetReviews /> 
       <ClaimToken />
      <ConnectButton/>
     
    </>
   
  )
}

export default App
