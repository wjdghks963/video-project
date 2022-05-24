import styled from "styled-components";

const PromotionVideo = ({ setPromotion, videoRef }) => {
  return (
    <Wrapper>
      <video
        onEnded={() => {
          setPromotion(false);
          videoRef.current.play();
        }}
        autoPlay
      >
        <source
          src="http://commondatastorage.googleapis.com/gtv-videos-bucket/sample/ForBiggerBlazes.mp4"
          type="video/mp4"
        />
      </video>
    </Wrapper>
  );
};

const Wrapper = styled.div``;

export default PromotionVideo;
