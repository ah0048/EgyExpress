import { useEffect,useState } from "react";

function ShowReview(props) {
    const product_id = props.product;
    const [reviews, setReviews] = useState([]);
   const  api = "http://localhost:5000/api/review";
   useEffect(()=>{
    fetch(`${api}/${product_id}`)
    .then((res)=>res.json())
    .then((data)=>setReviews(data));
   },[]);

  return (
    <>
      <h1>Review</h1>
      {reviews.map((review) => (
        <div key={review.id} className="review-box">
          <h2>{review.username}</h2>
          <p className="rating">Rating: {review.rating}</p>
          <p>{review.description}</p>
        </div>
      ))}
    </>
  );
}

export default ShowReview;
