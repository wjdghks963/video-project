import Hls from "hls.js";
import type { NextPage } from "next";
import React, { useState, useRef, KeyboardEvent, useEffect } from "react";
import styled from "styled-components";
import { video, commercial } from "../assets/videos";
import Loading from "../components/Loading";
import VideoController from "../components/VideoController";

interface controllerRef {
  rotateFunc: (event: React.MouseEvent) => void;
  getCurrentTime: () => void;
}

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
  const controllerRef = useRef<controllerRef>(null);

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

  //  *처음 m3u8재생 & 광고할 시간 확인* hls.js 사용

  let hls: Hls;

  const detectCommercialTime = () => {
    const videoSelector = document.querySelector("#video") as HTMLMediaElement;

    if (
      Math.round(videoRef.current!.currentTime) === 120 &&
      !videoObj.isplayed
    ) {
      setVideoObj({
        videocurTime: videoRef.current!.currentTime,
        isplayed: true,
      });
      hls.destroy();

      videoSelector.src = commercial;
      videoRef.current?.load();
      setTimeout(() => videoRef.current?.play(), 100);
    }
    if (videoSelector.src === commercial && videoRef.current?.ended) {
      hls = new Hls();
      hls.loadSource(video);
      hls.attachMedia(videoSelector);
      videoRef.current.currentTime = videoObj.videocurTime;
      hls.on(Hls.Events.MANIFEST_PARSED, () => videoSelector.play());
    }
  };

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    hls = new Hls();
    const videoSelector = document.querySelector("#video") as HTMLMediaElement;

    hls.loadSource(video);
    hls.attachMedia(videoSelector);
  }, []);

  return (
    <Wrapper
      ref={videoBoxRef}
      onKeyDown={(event) => keyDownFn(event)}
      tabIndex={0}
      onMouseMove={(event) => controllerRef.current!.rotateFunc(event)}
    >
      {videoRef.current?.networkState === 2 && <Loading />}
      <Video
        id="video"
        ref={videoRef}
        onClick={() => pauseOrPlay()}
        onTimeUpdate={() => {
          detectCommercialTime();
          controllerRef.current!.getCurrentTime();
        }}
      />

      <VideoController
        ref={controllerRef}
        videoRef={videoRef}
        videoBoxRef={videoBoxRef}
      />
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
