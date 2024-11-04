import React, { useState, useEffect, useRef } from "react";
import { useParams } from "react-router-dom";

import tmdbApi from "../../api/tmdbApi";

const VideoList = (props) => {
  const { category } = useParams();
  console.log("category from VideoList", category);

  const [video, setVideo] = useState([]);

  useEffect(() => {
    try {
      const getClips = async () => {
        const res = await tmdbApi.getVideos(category, props.id);
        setVideo(res.results);
        console.log(res);
      };
      getClips();
    } catch (error) {
      console.log("error from castlis", error);
    }
  }, [category, props.id]);

  return (
    <div>
      {video.map((item, i) => (
        <Video key={i} item={item} />
      ))}
    </div>
  );
};

const Video = (props) => {
  const item = props.item;
  const iframeRef = useRef(null);

    useEffect(() => {
      const height = iframeRef.current.offsetWidth * 9 / 16 +'px';
      iframeRef.current.setAttribute('height',height)
      }
    , [])
    

  return (
    <div className="video">
      <div className="video__title">
        <h2>{item.name}</h2>
      </div>
      <iframe
        src={`https://www.youtube.com/embed/${item.key}`}
        ref={iframeRef}
        width="100%"
        title="video"
        allowFullScreen
      ></iframe>
    </div>
  );
};

export default VideoList;
