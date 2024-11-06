import React, { useState, useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import "./heroSlide.scss";

import { Autoplay, Pagination} from "swiper/modules";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/scss";
import "swiper/css/pagination";
// import "swiper/css/navigation";

import tmdbApi, { movieType, category } from "../../api/tmdbApi";
import apiconfig from "../../api/apiconfig";

import Button, { OutlineButton } from "../button/Button";
import Modal, { ModelContent } from "../modal/Modal";

import "boxicons/css/boxicons.min.css";

// Ensure proper use of SwiperCore
const HeroSlide = () => {
  const [movieItem, setMovieItem] = useState([]);


  useEffect(() => {
    const getMovies = async () => {
      const params = { page: 1 };
      try {
        const response = await tmdbApi.getMoviesList(movieType.now_playing, params);
        const currentDate = new Date();
        const fiveYearsAgo = new Date();
        fiveYearsAgo.setFullYear(currentDate.getFullYear() - 5);

        // Filter movies released in the last 5 years
        const recentMovies = response.results.filter((movie) => {
          const releaseDate = new Date(movie.release_date);
          return releaseDate >= fiveYearsAgo;
        });
        // Limit the number of movies to 19
        setMovieItem(recentMovies.slice(0, 19));
        // const response = await tmdbApi.getMoviesList(movieType.popular, params);
        // const movies = response.results.slice(0, 19);
        // setMovieItem(movies);
        // console.log(response.results);
      } catch (error) {
        console.log(error);
      }
    };
    getMovies();
  }, []);

  return (
    <div className="hero-slide">
      <Swiper
        modules={[Autoplay, Pagination]}
        autoplay={{
          delay: 5000, // Change slides every 3 seconds
          disableOnInteraction: false, // Continue autoplay after user interaction
        }}
        // effect="slide"
        pagination={{
          clickable: true,
        }}
        // navigation={true}
        speed={1500}
        // loop={true}
        // loop={loop}
        threshold={1}  
        grabCursor={false}
        spaceBetween={10}
        slidesPerView={1}
        centeredSlides={true}
        className="mySwiper"
      >
        {movieItem.map((item, i) => (
          <SwiperSlide key={i}>
            {({ isActive }) => (
              <HeroSlideItem
                item={item}
                className={`${isActive ? "active" : ""}`}
              />
            )}
            {/* <img
              src={apiconfig.originalImg(item.backdrop_path)}
              alt={item.title}
            /> */}
          </SwiperSlide>
        ))}
      </Swiper>
      {movieItem.map((item, i) => (
        <TrailerModel key={i} item={item} />
      ))}
    </div>
  );
};

const HeroSlideItem = (props) => {
  const navigate = useNavigate();
  const item = props.item;
  const background = apiconfig.w1280Img(
    item.backdrop_path ? item.backdrop_path : item.poster_path
  );
  // console.log(background);
  const setModalActive = async () => {
    const modal = document.querySelector(`#modal_${item.id}`);

    const videos = await tmdbApi.getVideos(category.movie, item.id);

    try {
      // console.log(videos);
      // if (videos.results.length > 0) {
      //   const videSrc =
      //     "https://www.youtube.com/embed/" +
      //     videos.results[videos.results.length - 1].key;
      //   modal
      //     .querySelector(".modal__content > iframe")
      //     .setAttribute("src", videSrc);
      // } else {
      //   modal.querySelector(".modal__content").innerHTML = "No trailer";
      // }

      if (videos.results.length > 0) {
        // Find the index of the video with the name "Official Trailer"
        const officialTrailer = videos.results.find((video) =>
          video.name.toLowerCase().includes("official trailer")
        );

        if (officialTrailer) {
          // If found, construct the video URL
          const videSrc =
            "https://www.youtube.com/embed/" + officialTrailer.key;
          modal
            .querySelector(".modal__content > iframe")
            .setAttribute("src", videSrc);
        } else {
          // If no official trailer is found, display a message
          modal.querySelector(".modal__content").innerHTML = `
                    <div class="modal__close__content">No Offical Trailer Available Yet</div>
                    <div class="modal__content__close" onClick="document.querySelector('#modal_${item.id}').classList.remove('active')">
                        <i class="bx bx-x"></i>
                    </div>
                `;
        }
      } else {
        modal.querySelector(".modal__content").innerHTML = `
                    <div class="modal__close__content">No offical trailer available</div>
                    <div class="modal__content__close" onClick="document.querySelector('#modal_${item.id}').classList.remove('active')">
                        <i class="bx bx-x"></i>
                    </div>
                `;
      }

      modal.classList.toggle("active");
    } catch (error) {
      console.log(
        "cannot get movie tarailer something happened with api",
        error
      );
    }
  };

  return (
    <div
      className={`hero-slide__item ${props.className}`}
      style={{
        // width: "100vw",
        // height: "100vh",
        backgroundImage:`url(${background})`
        //  backgroundImage:`url(https://img.freepik.com/free-photo/path-into-woods_181624-12913.jpg?t=st=1730837084~exp=1730840684~hmac=5799f8cf135092794c55112868e27ff09f05eb3dc63302afd1166df7a47a2b4c&w=1380)`
        // backgroundPosition: "center",
        // backgroundSize: "cover",
      }}
    >
      <div className="hero-slide__item__content container">
        <div className="hero-slide__item__content__info">
          <h1 className="title">{item.title}</h1>
          <div className="overview">{item.overview}</div>
          <div className="btns">
            <Button onClickButton={() => navigate(`/movie/${item.id}`)}>
              Watch more
            </Button>
            <OutlineButton onClickButton={setModalActive}>
              Watch Trailer
            </OutlineButton>
          </div>
        </div>
        <div className="hero-slide__item__content__poster">
          <div className="poster_card">
            <img
              src={apiconfig.w500Img(item.poster_path)}
              alt="poster of movie"
            />
            {/* <div className="releaseDate">Relesed: {item.release_date}</div> */}
            <div className="rating">Rated: {item.vote_average.toFixed(1)}</div>
          </div>
        </div>
      </div>
    </div>
  );
};

const TrailerModel = (props) => {
  const item = props.item;

  const iframeRef = useRef(null);

  const onClose = () => iframeRef.current.setAttribute("src", "");

  return (
    <Modal active={false} id={`modal_${item.id}`}>
      <ModelContent onClose={onClose}>
        <iframe
          ref={iframeRef}
          width="100%"
          height="500px"
          title="trailer"
          allowFullScreen
        ></iframe>
      </ModelContent>
    </Modal>
  );
};

export default HeroSlide;

//object gotten
// {
//     "adult": false,
//     "backdrop_path": "/yDHYTfA3R0jFYba16jBB1ef8oIt.jpg",
//     "genre_ids": [
//         28,
//         35,
//         878
//     ],
//     "id": 533535,
//     "original_language": "en",
//     "original_title": "Deadpool & Wolverine",
//     "overview": "A listless Wade Wilson toils away in civilian life with his days as the morally flexible mercenary, Deadpool, behind him. But when his homeworld faces an existential threat, Wade must reluctantly suit-up again with an even more reluctant Wolverine.",
//     "popularity": 2392.159,
//     "poster_path": "/8cdWjvZQUExUUTzyp4t6EDMubfO.jpg",
//     "release_date": "2024-07-24",
//     "title": "Deadpool & Wolverine",
//     "video": false,
//     "vote_average": 7.71,
//     "vote_count": 2827
// }
