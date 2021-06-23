import { Button, Icon } from '@chakra-ui/react';
import React from 'react';
import { FaVolumeMute, FaVolumeUp } from 'react-icons/fa';
import BackgroundMusic from '../BackgroundMusic';
import { useBakgroundMusic } from '../BackgroundMusicContext';

const SoundButton = () => {
  const { isMuted, setIsMuted } = useBakgroundMusic();

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  return (
    <>
      <Button onClick={toggleMute}>
        {isMuted ? <FaVolumeUp /> : <FaVolumeMute />}
      </Button>
      <BackgroundMusic isMuted={isMuted} />
    </>
  );
};

export default SoundButton;
