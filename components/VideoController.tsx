import React, { forwardRef, useImperativeHandle } from "react";
import { useEffect, useState } from "react";
import styled from "styled-components";
import { commercial } from "../assets/videos";

interface VideoControllerProps {
  videoRef: React.RefObject<HTMLVideoElement>;
  videoBoxRef: React.RefObject<HTMLDivElement>;
}

// eslint-disable-next-line react/display-name
const VideoController = forwardRef((props: VideoControllerProps, ref) => {
  useImperativeHandle(ref, () => ImperativeObj);

  const ImperativeObj = {
    rotateFunc: (event: MouseEvent) => {
      setRotate({ x: event.screenX, y: event.screenY });
      setOpacity(1);
    },
    getCurrentTime: () =>
      setCurrentTime(videoRef.current && videoRef.current?.currentTime),
  };

  const [rotate, setRotate] = useState<{ x: number; y: number }>({
    x: 0,
    y: 0,
  });
  const [opacity, setOpacity] = useState<number>(0);
  const [currnetTime, setCurrentTime] = useState<number | null>(0);

  const { videoRef, videoBoxRef } = props;
  const videoDuration = videoRef.current && videoRef.current?.duration;

  const totalTime = (videoTime: number) => {
    let min = Math.floor(videoTime / 60);
    let sec = Math.floor(
      60 * (Number((videoTime / 60).toFixed(2).slice(-2)) / 100)
    );

    return `${min > 9 ? `${min}` : `0${min}`} : ${
      sec > 9 ? `${sec}` : `0${sec}`
    }`;
  };

  useEffect(() => {
    const timer = setTimeout(() => setOpacity(0), 3000);
    return () => clearTimeout(timer);
  }, [rotate]);

  const rotateFunc = (event: MouseEvent) => {
    setRotate({ x: event.screenX, y: event.screenY });
    setOpacity(1);
  };

  const getCurrentTime = () => {
    setCurrentTime(videoRef.current && videoRef.current.currentTime);
  };

  const controllPlaySpeed = (event: React.MouseEvent) => {
    const videoSpeed = videoRef.current!.playbackRate;
    switch (event.currentTarget.id) {
      case "fast": {
        if (1 <= videoSpeed && videoSpeed < 4) {
          videoRef.current!.playbackRate++;
        } else if (videoSpeed < 1) {
          videoRef.current!.playbackRate += 0.2;
        }
        break;
      }
      case "slow": {
        if (videoSpeed <= 1 && videoSpeed >= 0.3) {
          videoRef.current!.playbackRate -= 0.2;
        } else if (videoSpeed > 1) {
          videoRef.current!.playbackRate -= 1;
        }
        break;
      }
    }
  };

  const conttollScreen = () => {
    document.fullscreenElement
      ? videoBoxRef.current!.requestFullscreen()
      : document.exitFullscreen();
  };

  return (
    <Wrapper opacity={opacity}>
      <ProgressBox>
        <ProgressBar
          type="range"
          step="1"
          max={`${videoDuration}`}
          value={videoRef.current?.currentTime || 0}
          onChange={(e) =>
            (videoRef.current!.currentTime = Number(e.target.value))
          }
          disabled={
            props.videoRef.current && props.videoRef.current!.src === commercial
              ? true
              : false
          }
        />
        <Time>
          <span>{totalTime(currnetTime as number)} </span>
          <span>{totalTime(videoDuration as number)}</span>
        </Time>
      </ProgressBox>
      <SpeedBtn>
        <span id="slow" onClick={(event) => controllPlaySpeed(event)}>
          &lt;&lt;
        </span>
        <p>{videoRef.current?.playbackRate.toFixed(1)}</p>
        <span id="fast" onClick={(event) => controllPlaySpeed(event)}>
          &gt;&gt;
        </span>
      </SpeedBtn>
      <VolumeBtn>
        <svg
          onClick={() =>
            videoRef.current!.muted
              ? (videoRef.current!.muted = false)
              : (videoRef.current!.muted = true)
          }
          className="w-10 h-10"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          {videoRef.current && videoRef.current.muted ? (
            <>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
                clipRule="evenodd"
              ></path>
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="1"
                d="M17 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2"
              ></path>
            </>
          ) : (
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="1"
              d="M15.536 8.464a5 5 0 010 7.072m2.828-9.9a9 9 0 010 12.728M5.586 15H4a1 1 0 01-1-1v-4a1 1 0 011-1h1.586l4.707-4.707C10.923 3.663 12 4.109 12 5v14c0 .891-1.077 1.337-1.707.707L5.586 15z"
            ></path>
          )}
        </svg>

        <div>
          <input
            type="range"
            step="0.1"
            max="1"
            value={videoRef.current?.volume || 0}
            onChange={(e) =>
              (videoRef.current!.volume = Number(e.target.value))
            }
          />
        </div>
      </VolumeBtn>

      <FullScreenBtn
        onClick={() => {
          conttollScreen();
        }}
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
          xmlns="http://www.w3.org/2000/svg"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="1"
            d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
          ></path>
        </svg>
      </FullScreenBtn>
    </Wrapper>
  );
});

const Wrapper = styled.div<{ opacity: number }>`
  display: flex;
  position: absolute;
  bottom: 5px;
  width: 100%;
  justify-content: space-between;
  background-color: rgba(${(props) => props.theme.lightblackBg});
  padding: 10px 0;
  opacity: ${(props) => props.opacity};
`;

const ProgressBox = styled.div`
  display: flex;
  flex-direction: column;
  width: 80%;
  margin-left: 10px;
`;

const Time = styled.div`
  display: flex;
  justify-content: space-between;
  color: white;
  width: 100%;
  margin-top: 5px;
`;

const ProgressBar = styled.input``;

const VolumeBtn = styled.div`
  color: white;
  width: 30px;
  display: flex;
  justify-content: center;
  align-items: center;
  position: relative;
  height: 100%;
  padding: 10px 0;
  div {
    display: none;
  }
  &:hover {
    div {
      display: block;
      position: absolute;
      transform: rotate(-90deg);
      right: -60px;
      top: -90px;
      padding: 10px;
      background-color: rgba(${(props) => props.theme.lightblackBg});
      border-radius: 10px;
    }
  }
`;

const SpeedBtn = styled.div`
  display: flex;
  color: white;
  padding: 0 10px;
  margin: 5px 0;
  align-items: center;
  border: 1px solid white;
  border-radius: 5px;
  p {
    padding: 5px;
  }
  span {
    cursor: pointer;
    font-weight: 900;
  }
`;

const FullScreenBtn = styled.div`
  display: flex;
  width: 30px;
  color: white;
  margin-right: 25px;
  height: 100%;
  margin-top: 10px;
`;

export default VideoController;
