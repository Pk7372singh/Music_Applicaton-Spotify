import React, { useState, useEffect, useRef } from "react";

const Player = ({
  currentSong,
  isPlaying,
  setIsPlaying,
  setCurrentSong,
  songs,
  setShowSongList,
}) => {
  const [volume] = useState(1);
  const [isMuted, setIsMuted] = useState(false);
  const [duration, setDuration] = useState(0);
  const [currentTime, setCurrentTime] = useState(0);
  const audioRef = useRef(null);
  const progressRef = useRef(null);

  useEffect(() => {
    const audio = audioRef.current;

    if (audio) {
      audio.volume = isMuted ? 0 : volume;

      if (isPlaying) {
        audio.play().catch((error) => {
          console.error("Audio playback failed:", error);
          setIsPlaying(false);
        });
      } else {
        audio.pause();
      }

      const handleLoadedMetadata = () => {
        setDuration(audio.duration);
      };

      const updateCurrentTime = () => {
        setCurrentTime(audio.currentTime);
      };

      audio.addEventListener("loadedmetadata", handleLoadedMetadata);
      audio.addEventListener("timeupdate", updateCurrentTime);

      return () => {
        audio.removeEventListener("loadedmetadata", handleLoadedMetadata);
        audio.removeEventListener("timeupdate", updateCurrentTime);
      };
    }
  }, [isPlaying, currentSong, volume, isMuted, setIsPlaying]);

  useEffect(() => {
    if (progressRef.current) {
      progressRef.current.value = currentTime;
      progressRef.current.max = duration;
    }
  }, [currentTime, duration]);

  const togglePlayPause = () => {
    setIsPlaying(!isPlaying);
  };

  const playNext = () => {
    const currentIndex = songs.indexOf(currentSong);
    setCurrentSong(songs[(currentIndex + 1) % songs.length]);
  };

  const playPrevious = () => {
    const currentIndex = songs.indexOf(currentSong);
    setCurrentSong(songs[(currentIndex - 1 + songs.length) % songs.length]);
  };

  const toggleMute = () => {
    setIsMuted(!isMuted);
  };

  const handleProgressChange = (e) => {
    if (audioRef.current) {
      audioRef.current.currentTime = e.target.value;
    }
  };

  return (
    <div className="player md:flex-grow-[4]">
      <button className="menu-button" onClick={() => setShowSongList(true)}>
        Menu
      </button>
      {currentSong && (
        <>
          <div className=" flex flex-col items-start justify-start mr-52 mb-4 ">
            <div>
              <h2 className=" font-semibold ">{currentSong.name}</h2>
              <h3 className=" mt-1  text-sm">{currentSong.artist}</h3>
            </div>
          </div>
          <img
            src={`https://cms.samespace.com/assets/${currentSong.cover}`}
            alt={currentSong.title}
            className="player-song-cover"
          />

          <audio ref={audioRef} src={currentSong.url} />

          <div className="prog mt-2">
            <input
              type="range"
              ref={progressRef}
              min="0"
              max={duration}
              step="0.1"
              className="progress-bar w-72"
              onChange={handleProgressChange}
            />
          </div>

          <div className="controls">
            <span className="ellipsis">...</span>
            <button onClick={playPrevious}>
              <i className="fas fa-backward"></i>
            </button>
            <button onClick={togglePlayPause}>
              <i className={isPlaying ? "fas fa-pause" : "fas fa-play"}></i>
            </button>
            <button onClick={playNext}>
              <i className="fas fa-forward"></i>
            </button>
            <button onClick={toggleMute} className="sound">
              <i
                className={isMuted ? "fas fa-volume-mute" : "fas fa-volume-up"}
              ></i>
            </button>
          </div>
        </>
      )}
    </div>
  );
};

export default Player;
