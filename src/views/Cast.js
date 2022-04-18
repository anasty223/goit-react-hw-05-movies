import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

import styled from "styled-components";
import { ReactComponent as Icon } from "../no_image_available.svg";
import { default as axios } from "axios";
const API_Key = "eba0388c934688725105b53c98cf82ca";
const BASE_URL = "https://image.tmdb.org/t/p/w500/";

const ListCont = styled.ul`
  display: flex;
  flex-wrap: wrap;
  gap: 15px;
  padding-top: 15px;
`;

const Imgs = styled.img`
  display: block;
  width: 228px;
  height: 342px;
  object-fit: cover;
  margin-bottom: 10px;
`;
const Actor = styled.li`
  margin-bottom: 10px;
  font-size: 20px;
`;

const Cast = () => {
  const paramsCast = useParams();

  const [castList, setCastList] = useState("");
  useEffect(() => {
    axios
      .get(
        `https://api.themoviedb.org/3/movie/${paramsCast.movieId}/credits?api_key=${API_Key}&language=en-US&page=1`
      )
      .then(function (response) {
        setCastList(response.data);

        console.log(response);
      })
      .catch(function (error) {
        console.log(error);
      });
  }, [paramsCast.movieId]);

  return (
    <div>
      <ListCont>
        {castList?.cast?.map((actor) => {
          return (
            <li key={actor.id}>
              <Actor>{actor.name}</Actor>
              {actor.profile_path ? (
                <Imgs
                  width="65px"
                  height="90px"
                  src={`${BASE_URL}${actor.profile_path}`}
                />
              ) : (
                <Icon
                  width="65px"
                  height="90px"
                  src="../no_image_available.svg"
                />
              )}
            </li>
          );
        })}
      </ListCont>
    </div>
  );
};
export default Cast;
