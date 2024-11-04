import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";
import apiconfig from "../../api/apiconfig";

import "./details.scss";
import Castlist from "./Castlist";
import VideoList from "./VideoList";
import MovieList from "../../components/movieList/MovieList";

const Details = () => {
  const { category, id } = useParams();

  const [item, setItem] = useState(null);

  useEffect(() => {
    try {
      const getDetail = async () => {
        const response = await tmdbApi.detail(category, id, { params: {} });
        setItem(response);
        console.log("response from details", response);
      };
      getDetail();
    } catch (error) {
      console.log("failed to fetch details", error);
    }
  }, [category, id]);

  //Format rating
  const rating =
    item && item.vote_average !== null && item.vote_average !== undefined
      ? typeof item.vote_average === "number" && !isNaN(item.vote_average)
        ? item.vote_average.toFixed(1)
        : "Not Rated"
      : "Not Rated";
  // Format the release date
    const releaseDate = item?.release_date || item?.first_air_date;
    const formattedDate = releaseDate ? new Date(releaseDate).toLocaleDateString('en-GB', {
      day: 'numeric',
      month: 'short',
      year: 'numeric'
    }) : 'Unknown Date';


  return (
    <>
      {item && (
        <>
          <div
            className="banner"
            style={{
              backgroundImage: `url(${apiconfig.originalImg(
                item.backdrop_path || item.poster_path
              )})`,
            }}
          ></div>
          <div className="mb3 movie-content container">
            <div className="movie-content__poster">
              <div
                className="movie-content__poster__img"
                style={{
                  backgroundImage: `url(${apiconfig.originalImg(
                    item.poster_path || item.backdrop_path
                  )})`,
                }}
              ></div>
            </div>
            <div className="movie-content__info">
              <h1 className="title">{item.title || item.name}</h1>
              <div className="genres">
                {item.genres &&
                  item.genres.slice(0, 5).map((genres, i) => (
                    <span key={i} className="genres__item">
                      {genres.name}
                    </span>
                  ))}
              </div>

              <p className="overview">{item.overview}</p>
              <h4 className="movie-content__status">
                Status : {item.status}
              </h4>
              <h4 className="movie-content__release">
                Release On : {formattedDate}
              </h4>
              <h4 className="movie-conten__rating">Rated : {rating}</h4>
              <div className="cast">
                <div className="section_header">
                  <h2>Casts</h2>
                </div>
                <Castlist id={item.id} />
              </div>
            </div>
          </div>
          <div className="container">
            <div className="section mb-3">
              <VideoList id={item.id}/>
            </div>
            <div className="section mb-3">
              <div className="section_header mb-2">
                <h2>Similar</h2>
              </div>
              <MovieList category={category} type='similar' id={item.id}/>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default Details;
