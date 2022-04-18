import { useState, useEffect } from "react";
import styled from "styled-components";
import { Link, useSearchParams } from "react-router-dom";
import axios from "axios";

axios.defaults.baseURL = "https://api.themoviedb.org/3";
const API_Key = "eba0388c934688725105b53c98cf82ca";
const BASE_URL = "https://image.tmdb.org/t/p/w500/";

const Img = styled.img`
  display: block;
  width: 200px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 10px;
`;
const H1 = styled.h1`
  color: grey;
`;
const Input = styled.input`
  width: 280px;
  height: 30px;
  margin-right: 10px;
  border-radius: 3px;
  font-size: 20px;
  border: 1px solid grey;
  &: hover {
    border: 1px solid grey;
  }
  &: focus {
    border: 1px solid grey;
  } ;
`;
const Button = styled.button`
  height: 33px;
  width: 80px;
  border-radius: 3px;
  font-size: 15px;
  font-weight: bold;
  border: 1px solid grey;
  &: hover {
    background-color: grey;
    color: white;
    border: 1px solid grey;
  }
  &: focus {
    border: 1px solid grey;
    background-color: grey;
    color: white;
  } ;
`;
const Ul = styled.ul`
  display: flex;

  flex-direction: column;
  align-items: center;
  width: 250px;
  margin: 0 auto;
  padding-top: 30px;
  background-color: #fff;
  box-shadow: 0 1px 4px rgba(0, 0, 0, 1), -5px 0 10px -10px rgba(0, 0, 0, 0.8),
    5px 0 20px -10px rgba(0, 0, 0, 0.8);
`;
const Container = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 15px;
  padding-top: 15px;
`;
const ImgRequest = styled.img`
  display: block;
  width: 200px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 10px;
`;
 const MoviesView = () => {
  const [movies, setMovies] = useState([]);
  const [searchMouvie, setSearchMovie] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();

  const handleSetFilms = (e) => {
    setSearchMovie(e.target.value);
  };

  const handleSearchFilm = (e) => {
    e.preventDefault();
    if (searchMouvie) {
      setSearchParams({ query: searchMouvie });
    }
  };

  useEffect(() => {
    let query = searchParams.get("query");
    if (query) {
      axios
        .get(
          `https://api.themoviedb.org/3/search/movie?api_key=${API_Key}&query=${query}&language=en-US&page=1&include_adult=false`
        )
        .then(function (response) {
          // handle success
          setMovies(response);
          console.log(response);
        })
        .catch(function (error) {
          console.log(error);
        });
    }
  }, [searchParams]);

  return (
    <div>
      <form onSubmit={handleSearchFilm}>
        <H1>Enter a movie request</H1>
        <Input onChange={handleSetFilms} />
        <Button>search</Button>
      </form>

      {movies && (
        <Container>
          {movies?.data?.results?.map((movie) => (
            <Ul key={movie.id}>
              <li>
                <Link
                  to={`/movies/${movie.id}`}
                  style={{
                    color: "black",
                    fontSize: "20px",
                    fontWeight: "bold",
                  }}
                >
                  {movie.title ?? movie.name}
                </Link>
                <ImgRequest
                  width="180px"
                  height="250px"
                  src={`${BASE_URL}${movie.poster_path}`}
                  alt={"img"}
                />
              </li>
            </Ul>
          ))}
        </Container>
      )}
    </div>
  );
};
export default MoviesView;