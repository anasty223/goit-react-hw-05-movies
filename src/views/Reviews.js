import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import { getReviews } from "../servises/api";

const Reviews = () => {
  const paramsReview = useParams();
  const paramsReviewsId = paramsReview.movieId;

  const [reviewList, setReviewList] = useState("");
  useEffect(() => {
    getReviews(paramsReviewsId)
      .then(function (response) {
        setReviewList(response.data);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [paramsReviewsId]);
  console.log(reviewList?.results);
  return (
    <div>
      {reviewList?.results?.length ? (
        reviewList.results?.map((review) => (
          <div key={review.id}>
            <h3>Author: {review.author}</h3>
            <p>{review.content}</p>
          </div>
        ))
      ) : (
        <p>We don`t have reviews for this movie</p>
      )}
    </div>
  );
};

export default Reviews;
