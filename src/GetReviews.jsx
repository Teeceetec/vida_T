import { useEffect,useState } from "react";
import { REVIEW_ABI, REVIEW_ADDRESS } from "./constant";
import { useAccount, useReadContract, useWriteContract } from "wagmi";
import { readContract } from "viem/actions";

export default function GetReviews () {
   const [reviewId, setReviewId] = useState('');
   const [review, setReview] = useState(null);
   const [isLoading, setIsLoading] = useState(false);
   const [reviewdisplay, setReviewdisplay] = useState([]);
   const [error, setError] = useState('');
   
   const { address, isConnected } = useAccount();

    const {data : result} = useReadContract({
     abi: REVIEW_ABI,
     address: REVIEW_ADDRESS,
     functionName: "getReviewById",
     args: [reviewId],
     watch:true,
      })
    
      const {data: reviewcount} = useReadContract({
        abi: REVIEW_ABI,
        address: REVIEW_ADDRESS,
        functionName:"getReviewCount",
      });

    
      const fetchReviewById = async () => {
          try {
            const rev = await readContract({
              address: REVIEW_ADDRESS,
              abi: REVIEW_ABI,
              funtionName: "getReviews",
              args:[id],
            });

            const[user,comment,ratings,timestamp] = rev;

            const parsedReview = {
              reviewid: id,
              user: user,
              comment : comment,
              ratings : ratings.toString(),
              timestamp : new Date(timestamp.toNumber() * 1000).toLocaleString(),
            }

             return parsedReview;
          } catch (error) {
            console.log(error);
            windows.alert(error);
          }
      }

      const fetchAllReviews = async()=> {
         try {
           const reviewsid = [];

           for(let i = 0; i < reviewcount; i++) {
            const proposa = await fetchReviewById(i);
            reviewsid.push(proposa);
           }
           setReviewdisplay(reviewsid);
           console.log(reviewsid)
           return reviewsid;
         } catch (error) {
          console.error(error);
          window.alert(error);
         }
      }

   
   const handleSubmit = async (e) => {
      e.preventDEfault();
      setError('');
      setReview(null);

      try {
        setIsLoading(true);

        setReview({
          user: result[0],
          comment: result[1],
          ratings: result[2].toString(),
          timesstamp: new Date(result[3].toNumber() * 1000).toLocaleString(),
        })


      } catch (error) {
       console.error(error); 
       setError("Error fetching Review");
      }
      setIsLoading(false);
   }
   
   return (
    <>
    <div className= "p-4 max-w-md mx-auto bg-white rounded-xl shadow-md overflow-hidden md:max-w-2xl"> 
        <h2 className="text-2xl font-bold mb-4">Get Review by ID</h2>
         {isConnected || reviewdisplay.length > 0 && (
           <div className="mt-4">
           {reviewdisplay.map((p, index) => (
             <div key ={index}>
              <p><strong>User:</strong> {p.user}</p>
       <p><strong>Comment:</strong> {p.comment}</p>
       <p><strong>Rating:</strong> {p.ratings}</p>
       <p><strong>Timestamp:</strong> {p.timestamp}</p>
             </div>
           ))}
         </div>
         )}    
     </div>
    </>
   )
}


