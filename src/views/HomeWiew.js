import { useState, useEffect } from "react";
import { Link } from "react-router-dom";

import styled from "styled-components";
import { getTrending } from "../servises/api";

const H1 = styled.h1`
  color: grey;
`;

const Span = styled.span`
  font-size: 20px;
`;
const List = styled.li``;

const Container = styled.div`
  display: flex;

  flex-wrap: wrap;
  gap: 15px;
  padding-top: 15px;
`;
const ListCont = styled.ul`
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

const Img = styled.img`
  display: block;
  width: 200px;
  height: 300px;
  object-fit: contain;
  margin-bottom: 10px;
`;
const HomeWiew = () => {
  const [moviesList, setMoviesList] = useState([]);
  const BASE_URL = "https://image.tmdb.org/t/p/w500/";
  useEffect(() => {
    getTrending()
      .then(function (response) {
        setMoviesList(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, []);

  return (
    <>
      <H1>Trending today</H1>
      <Container>
        {moviesList?.data?.results?.map((movie) => (
          <ListCont key={movie.id}>
            <List>
              <Link
                to={`/movies/${movie.id}`}
                style={{
                  textDecoration: "none",
                  color: "black",
                  fontSize: "20px",
                  fontWeight: "bold",
                }}
              >
                <Span>{movie.title ?? movie.name}</Span>
              </Link>

              <Img
                width="180px"
                height="250px"
                src={`${BASE_URL}${movie.poster_path}`}
                alt={"img"}
              />
            </List>
          </ListCont>
        ))}
      </Container>
    </>
  );
};
export default HomeWiew;
