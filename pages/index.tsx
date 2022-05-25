import type { NextPage } from "next";
import React, { useState, useRef, KeyboardEvent } from "react";
import styled from "styled-components";
import { commercial, video } from "../assets/videos";
import Loading from "../components/Loading";
import VideoController from "../components/VideoController";

const Home: NextPage = () => {
  const [videoObj, setVideoObj] = useState<{
    videocurTime: number;
    isplayed: boolean;
  }>({
    videocurTime: 0,
    isplayed: false,
  });

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);
  const sourceRef = useRef<HTMLSourceElement>(null);

  const pauseOrPlay = () => {
    return videoRef.current!.paused
      ? videoRef.current!.play()
      : videoRef.current!.pause();
  };

  const keyDownFn = (event: KeyboardEvent<HTMLDivElement>) => {
    switch (event.code) {
      case "ArrowRight": {
        videoRef.current!.currentTime += 5;
        break;
      }
      case "ArrowLeft": {
        videoRef.current!.currentTime -= 5;
        break;
      }
      case "Space": {
        pauseOrPlay();
        break;
      }
    }
  };

  const detectCommercialTime = () => {
    if (
      Math.round(videoRef.current!.currentTime) === 120 &&
      !videoObj.isplayed
    ) {
      setVideoObj({
        videocurTime: videoRef.current!.currentTime,
        isplayed: true,
      });
      sourceRef.current!.src = commercial;
      videoRef.current?.load();
      videoRef.current?.play();
    }
    if (sourceRef.current!.src === commercial && videoRef.current?.ended) {
      sourceRef.current!.src = video;
      videoRef.current?.load();
      videoRef.current.currentTime = videoObj.videocurTime;
      videoRef.current?.play();
    }
  };

  console.log("re-render");

  return (
    <Wrapper
      ref={videoBoxRef}
      onKeyDown={(event) => keyDownFn(event)}
      tabIndex={0}
    >
      {videoRef.current?.networkState === 2 && <Loading />}
      <Video
        ref={videoRef}
        onClick={() => pauseOrPlay()}
        onTimeUpdate={() => {
          detectCommercialTime();
        }}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          ref={sourceRef}
        />
      </Video>

      <VideoController videoRef={videoRef} videoBoxRef={videoBoxRef} />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 70%;
  margin: 150px auto;

  &:focus {
    outline-style: none;
  }
`;

const Video = styled.video`
  width: 100%;
`;

export default Home;
