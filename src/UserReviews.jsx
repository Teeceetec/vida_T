import { useEffect, useState } from "react";
import { NFT_ABI, NFT_ADDRESS, REVIEW_ADDRESS, REVIEW_ABI } from "./constant";
import { useAccount, useReadContract, useWriteContract } from "wagmi";

export default function UserReviews() {
  const [comment, setComment] = useState('');
  const [rating, setRating] = useState(1);
  const { address, isConnected } = useAccount();
  const [loading, setLoading] =useState(false);

  const {writeContractAsync} = useWriteContract();
  
  

  const {data} = useReadContract({
    abi: NFT_ABI,
    address: NFT_ADDRESS,
    functionName: "",
    args: [],
    watch:true,
  })
  
  const submitReview= async () => {
    setLoading(true);
    try {
      
     await writeContractAsync({
       abi: REVIEW_ABI,
       address: REVIEW_ADDRESS,
       functionName:"submitReview",
       args: [comment, rating]
     },
   {
     onSuccess(result) {
       console.log(result);
     }
   })
   setLoading(false);
    } catch (error) {
     console.error(error);
    }
 }

 const handleSubmit = (e) => {
   e.preventDefault();
   if(comment && rating >= 1 && rating <= 5) {
    submitReview();
    setComment('');
   }
 }

 const commentChange =(e) => {
    setComment(e.target.value);
 }
 
 const ratingChange = (e) => {
  setRating(e.target.value);
 }
  
  return(
     <>
       <div className="max-w-md mx-auto bg-white p-8 rounded-lg shadow-md">
         {isConnected && (
            <form onSubmit={handleSubmit}>
               <div className="mb-6">
               <textarea
                   className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none resize-none"
                  value = {comment}
                  onChange ={commentChange}
                  placeholder="Enter your review"
                  maxLength={1000}
                  required
               />
               </div>
               
               <div>
               <input 
                 className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-400 focus:outline-none"
                  type="number"
                  min="1"
                  max="5"
                  value={rating}
                  onChange={ratingChange}
                  required
               />
               </div>
              

               <button
                  className="w-full px-4 py-2 bg-blue-600 text-white font-semibold rounded-lg shadow-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:ring-opacity-75"
                 type="submit"
                 disabled={loading}
               >
                  {loading ? "Submitting..." : "SubmitReview"}
               </button>
            </form>
         )}
       </div>
     </>
  )
}