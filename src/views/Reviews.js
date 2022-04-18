import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import styled from "styled-components";

import { default as axios } from "axios";
const API_Key = "eba0388c934688725105b53c98cf82ca";
const Reviews = () => {
  const paramsReview = useParams();

  const [reviewList, setReviewList] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${paramsReview.movieId}/credits?api_key=${API_Key}&language=en-US&page=1`
      )
      .then(function (response) {
        setReviewList(response.data);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [paramsReview.movieId]);
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
