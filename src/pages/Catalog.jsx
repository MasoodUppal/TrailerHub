import React from "react";

import { useParams } from "react-router-dom";

import PageHeader from "../components/pageheader/PageHeader";

import { category as cate } from "../api/tmdbApi";
import MovieGrid from "../components/movie-grid/MovieGrid";

const Catalog = () => {
  const { catagory } = useParams();

  console.log(catagory);

  return (
    <>
      <PageHeader>
        {catagory === cate.movie ? "Movies" : "TV Series"}
      </PageHeader>
      <div className="container">
        <div className="section mb-3">
            <MovieGrid catagory={catagory}/>
        </div>
      </div>
    </>
  );
};

export default Catalog;
