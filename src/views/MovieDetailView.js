import { useState, useEffect } from "react";
import styled from "styled-components";
import { AiOutlineArrowLeft } from "react-icons/ai";
import { default as axios } from "axios";
import { Link, Outlet, useParams, useNavigate } from "react-router-dom";

const H1 = styled.h1`
  color: black;
`;
const Button = styled.button`
  margin-top: 20px;
  margin-bottom: 20px;
  width: 180px;
  height: 60px;
  color: white;
  background-color: grey;
  border-radius: 2px;
  font-size: 20px;
  border: 1px solid grey;
`;
const Div = styled.div`
  display: flex;
  flex-direction: column;
`;
const Cont = styled.div`
  display: flex;
  border-bottom: 3px solid grey;
`;

const Container = styled.div`
  display: flex;
`;
const ImgDetail = styled.img`
  display: block;
  width: 250px;
  height: 350px;
  object-fit: contain;
  margin-bottom: 10px;
  margin-top: 20px;
`;
const Info = styled.ul`
  border-bottom: 3px solid grey;
  padding-bottom: 15px;
  list-style: square outside;
`;

const Genres = styled.ul`
  display: flex;
  list-style-type: none;
  padding-inline-start: 0;
`;
const Genre = styled.li`
  margin-right: 5px;
`;

const MovieDetailView = () => {
  const API_Key = "eba0388c934688725105b53c98cf82ca";
  const BASE_URL = "https://image.tmdb.org/t/p/w500/";
  const params = useParams();
  const [movieData, setMovieData] = useState([]);
  const [releaseData, setReleaseData] = useState([]);

  const navigate = useNavigate();

  const goBack = () => navigate(-1);

  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${params.movieId}?api_key=${API_Key}&language=en-US&page=1`
      )
      .then(function (response) {
        setMovieData(response.data);
        setReleaseData(response.data.release_date);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [params.movieId]);

  return (
    <div>
      <Button onClick={goBack}>
        <AiOutlineArrowLeft />
        Go back
      </Button>
      <Cont>
        <Div>
          <ImgDetail
            width="180px"
            height="250px"
            src={`${BASE_URL}${movieData.poster_path}`}
            alt={"img"}
          />
        </Div>
        <Container>
          <Div>
            <h1>{`${movieData.original_title} (${releaseData})`}</h1>
            <h2>Overview:</h2>
            <p>{movieData.overview}</p>

            <h2>Genres:</h2>
            <Genres>
              {movieData?.genres?.map((genre) => (
                <Genre key={genre.id}>{genre.name}</Genre>
              ))}
            </Genres>
          </Div>
        </Container>
      </Cont>
      <H1>Additional information:</H1>
      <Outlet />
      <Info>
        <li>
          <Link
            to={`/movies/${params.movieId}/cast`}
            style={{
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Casts
          </Link>
        </li>
        <li>
          <Link
            to={`/movies/${params.movieId}/reviews`}
            style={{
              color: "black",
              fontSize: "20px",
              fontWeight: "bold",
            }}
          >
            Reviews
          </Link>
        </li>
      </Info>
    </div>
  );
};
export default MovieDetailView;
