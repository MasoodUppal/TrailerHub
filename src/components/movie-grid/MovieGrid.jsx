import React, { useState, useEffect, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";

import tmdbApi, { category, movieType, tvType } from "../../api/tmdbApi";

import Button, { OutlineButton } from "../button/Button";
import MovieCard from "../moviecard/movieCard";
import Input from "../input/Input";

import "./movieGrid.scss";

const MovieGrid = (props) => {
  const [items, setItems] = useState([]);

  const [page, setPage] = useState(1);

  const [totalPage, setTotalPage] = useState(0);

  const { keyword } = useParams();

  useEffect(() => {
    const getlist = async () => {
      let response = null;

      if (keyword === undefined) {
        const params = {};
        switch (props.catagory) {
          case category.movie:
            response = await tmdbApi.getMoviesList(movieType.upcoming, {
              params,
            });
            break;
          default:
            response = await tmdbApi.getTvList(tvType.popular, { params });
        }
      } else {
        const params = {
          query: keyword,
        };
        response = await tmdbApi.search(props.catagory, { params });
      }
      setItems(response.results);
      setTotalPage(response.total_pages);
    };
    getlist();
  }, [props.catagory, keyword]);

  const loadMore = async () => {
    let response = null;

    if (keyword === undefined) {
      const params = {
        page: page + 1,
      };
      switch (props.catagory) {
        case category.movie:
          response = await tmdbApi.getMoviesList(movieType.upcoming, {
            params,
          });
          break;
        default:
          response = await tmdbApi.getTvList(tvType.popular, { params });
      }
    } else {
      const params = {
        page: page + 1,
        query: keyword,
      };
      response = await tmdbApi.search(props.catagory, { params });
    }
    setItems([...items, ...response.results]);
    console.log(items);
    setPage(page + 1);
  };

  return (
    <>
      <div className="section mb3">
        <MovieSearch catagory={props.catagory} keyword={keyword} />
      </div>
      <div className="movie-grid">
        {items.map((items, i) => (
          <MovieCard catagory={props.catagory} item={items} key={i} />
        ))}
      </div>
      {page < totalPage ? (
        <div className="movie-grid__loadmore">
          <OutlineButton className="small" onClickButton={loadMore}>
            Load More
          </OutlineButton>
        </div>
      ) : null}
    </>
  );
};

const MovieSearch = (props) => {
  const navigate = useNavigate();

  const [keyword, setKeyword] = useState(props.keyword ? props.keyword : "");

  const goToSearch = useCallback(() => {
    if (keyword.trim().length > 0) {
      navigate(`/${category[props.catagory]}/search/${keyword}`);
    }
  }, [keyword, props.catagory, navigate]);

  useEffect(() => {
    const enterEvent = (e) => {
      // e.preventDefault();
      if (e.keyCode === 13) {
        goToSearch();
      }
    };
    document.addEventListener("keyup", enterEvent);
    return () => {
      document.removeEventListener("keyup", enterEvent);
    };
  }, [keyword, goToSearch]);

  return (
    <div className="movie-search">
      <Input
        type="text"
        placeholder="Enter Keyword for search"
        value={keyword}
        onChange={(e) => setKeyword(e.target.value)}
      />
      <Button className="small" onClickButton={goToSearch}>Search</Button>
    </div>
    
  );
};

export default MovieGrid;
