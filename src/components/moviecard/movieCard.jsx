import React from "react";
import "./moviecard.scss";

import { Link } from "react-router-dom";
import Button from "../button/Button";

import { category } from "../../api/tmdbApi";
import apiconfig from "../../api/apiconfig";

const MovieCard = (props) => {
  const item = props.item;
  const link = "/" + category[props.category] + "/" + item.id;
  const bg = apiconfig.w500Img(item.poster_path || item.backdrop_path);

  return (
    <Link to={link}>
      <div className="movie-card" style={{ backgroundImage: `url(${bg})` }}>
        <Button>
          <i className="bx bx-play"></i>
        </Button>
      </div>
      <div className="title-info">
        <h3>{item.title || item.name}</h3>
        <div className="rating">Rated: {item.vote_average.toFixed(1)}</div>
        {/* <div className="releaseDate">{item.release_date}</div> */}
      </div>
    </Link>
  );
};

export default MovieCard;
