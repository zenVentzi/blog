import { Button } from '@chakra-ui/react';
import React, { useEffect, useRef, useState } from 'react';
import YouTube, { YouTubeProps } from 'react-youtube';

type BackgrkoundMusicProps = {
  isMuted: boolean;
};

// spent way too much time on this bullshit
// 3h and not being able to programmatically make a player play is not acceptable
const BackgroundMusic = ({ isMuted }: BackgrkoundMusicProps) => {
  const isMutedBinary = isMuted ? 1 : 0;
  const [player, setPlayer] = useState<any>();

  const onReady = (event: any) => {
    setPlayer(event.target);
  };

  useEffect(() => {
    if (!player) return;

    if (isMuted) {
      player.pauseVideo();
      player.mute();
    } else {
      player.playVideo();
      player.unMute();
    }

    // player.playVideo();
  }, [isMuted, player]);

  return (
    <div /* style={{ display: 'none' }} */>
      {/* <iframe
        title="youtube"
        width="420"
        height="345"
        src="https://www.youtube.com/embed/tgbNymZ7vqY?autoplay=1&mute=0"
      ></iframe> */}
      <Button
        onClick={() => {
          player.playVideo();
        }}
      >
        Play
      </Button>
      <YouTube
        videoId={'Mf9IMWXS7iU'}
        onReady={onReady}
        opts={{
          height: '390',
          width: '640',
          playerVars: {
            // mute: 1,
            // https://developers.google.com/youtube/player_parameters
            autoplay: 1,
          },
        }}
      />
    </div>
  );
};

export default BackgroundMusic;
