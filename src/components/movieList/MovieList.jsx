import React, { useState, useEffect } from "react";
import PropTypes from "prop-types";

import "./movie-list.scss";
import tmdbApi, { category } from "../../api/tmdbApi";

// import { Link } from "react-router-dom";
// import Button from "../button/Button";
// import apiconfig from "../../api/apiconfig";

import { Swiper, SwiperSlide } from "swiper/react";
// import 'swiper/css';

import MovieCard from "../moviecard/movieCard";

const MovieList = (props) => {
  const [item, setitem] = useState([]);

  useEffect(() => {
    const getList = async () => {
      let response = null;
      let params = {};

      if (props.type !== "similar") {
        switch (props.category) {
          case category.movie:
            response = await tmdbApi.getMoviesList(props.type, { params });
            break;
          default:
            response = await tmdbApi.getTvList(props.type, { params });
        }
      } else {
        response = await tmdbApi.similar(props.category, props.id);
      }
      setitem(response.results);
    };
    getList();
  }, [props.category, props.type, props.id]);

  return (
    <div className="movie-list">
      <Swiper
        // slidesPerView={9}
        grabCursor={true}
        spaceBetween={10}
        slidesPerView={"auto"}
        // freeMode={true} // Enables free sliding without snapping
        // freeModeMomentum={true} // Smooth scrolling
        // freeModeMomentumRatio={0.5} // Controls the scrolling momentum
        // resistanceRatio={0.8} // Makes the end feel bouncier
        // touchReleaseOnEdges={true} // Allows free sliding at edges
      >
        {item.map((item, i) => (
          <SwiperSlide key={i}>
            <MovieCard item={item} category={props.category} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

MovieList.propTypes = {
  category: PropTypes.string.isRequired,
  type: PropTypes.string.isRequired,
};

export default MovieList;
