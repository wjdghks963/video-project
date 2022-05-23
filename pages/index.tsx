import type { NextPage } from "next";
import { useEffect, useState, useRef, MouseEventHandler } from "react";
import styled from "styled-components";
import VideoController from "../components/VideoController";

const Home: NextPage = () => {
  const [currentTime, setCurrentTime] = useState<number | undefined>(0);

  const videoRef = useRef<HTMLVideoElement>(null);
  const videoBoxRef = useRef<HTMLDivElement>(null);

  const pauseOrPlay = () =>
    videoRef.current?.paused
      ? videoRef.current.play()
      : videoRef.current?.pause();

  const keyDownFn = (event) => {
    console.log(event.code);
    switch (event.code) {
      case "ArrowRight": {
        videoRef.current.currentTime += 5;
        break;
      }
      case "ArrowLeft": {
        videoRef.current.currentTime -= 5;
        break;
      }
      case "Space": {
        pauseOrPlay();
        break;
      }
    }
  };

  console.log(videoRef.current?.volume);
  return (
    <Wrapper
      ref={videoBoxRef}
      onKeyDown={(event) => keyDownFn(event)}
      tabIndex="0"
    >
      <video
        src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4"
        ref={videoRef}
        onTimeUpdate={() => setCurrentTime(videoRef.current?.currentTime)}
        onClick={() => pauseOrPlay()}
      />
      <VideoController
        videoBoxRef={videoBoxRef}
        videoRef={videoRef}
        currentTime={currentTime}
      />
    </Wrapper>
  );
};

const Wrapper = styled.div`
  position: relative;
  width: 70%;
  video {
    width: 100%;
  }
  &:hover {
    div {
      opacity: 1;
    }
  }
`;

export default Home;
