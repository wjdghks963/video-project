import type { NextPage } from "next";
import React, { useEffect, useState, useRef, KeyboardEvent } from "react";
import styled from "styled-components";
import Loading from "../components/Loading";
import PromotionVideo from "../components/PromotionVideo";
import VideoController from "../components/VideoController";

const Home: NextPage = () => {
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);
  const [opacity, setOpacity] = useState<number>(0);
  const [rotate, setRotate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [promotion, setPromotion] = useState(false);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);

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

  const watchMouseMove = (event: React.MouseEvent) => {
    setOpacity(1);
    setRotate({ x: event.screenX, y: event.screenY });
  };

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(0), 3000);

    return () => clearTimeout(timer);
  }, [rotate]);

  useEffect(() => {
    if (Math.floor(currentTime || 0) === 120) {
      setPromotion(true);
      videoRef.current?.pause();
    }
  }, [currentTime]);

  return (
    <Wrapper
      ref={videoBoxRef}
      onKeyDown={(event) => keyDownFn(event)}
      tabIndex={0}
      onMouseMove={(event) => watchMouseMove(event)}
      opacity={opacity}
    >
      {promotion && (
        <PromotionVideo setPromotion={setPromotion} videoRef={videoRef} />
      )}
      {videoRef.current?.networkState === 2 && <Loading />}
      <Video
        ref={videoRef}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime)}
        onClick={() => pauseOrPlay()}
        promotion={promotion}
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
          type="video/mp4"
        />
      </Video>

      <VideoController
        videoBoxRef={videoBoxRef}
        videoRef={videoRef}
        currentTime={currentTime}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div<{ opacity: number }>`
  position: relative;
  width: 70%;
  margin: 150px auto;

  &:focus {
    outline-style: none;
  }

  &:hover {
    div {
      opacity: ${(props) => props.opacity};
    }
  }
`;

const Video = styled.video<{ promotion: boolean }>`
  width: 100%;
  display: ${(props) => props.promotion && "none"};
`;

export default Home;
