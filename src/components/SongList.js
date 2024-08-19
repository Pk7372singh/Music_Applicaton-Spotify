import React, { useEffect, useState } from "react";
import Header from "./Header";

const SongList = ({ songs, setCurrentSong, showSongList, setShowSongList }) => {
  const [durations, setDurations] = useState({});
  const [searchTerm, setSearchTerm] = useState("");

  useEffect(() => {
    songs.forEach((song) => {
      const audio = new Audio(song.url);
      audio.addEventListener("loadedmetadata", () => {
        setDurations((prevDurations) => ({
          ...prevDurations,
          [song.id]: audio.duration,
        }));
      });
    });
  }, [songs]);

  const formatDuration = (duration) => {
    const minutes = Math.floor(duration / 60);
    const seconds = Math.floor(duration % 60);
    return `${minutes}:${seconds < 10 ? "0" : ""}${seconds}`;
  };

  const filteredSongs = songs.filter(
    (song) =>
      song.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      song.artist.toLowerCase().includes(searchTerm.toLowerCase()) ||
      (song.description &&
        song.description.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleSongClick = (song) => {
    setCurrentSong(song);
    if (window.innerWidth <= 768) {
      setShowSongList(false);
    }
  };

  return (
    <div className={`song-list md:flex-grow[4] ${showSongList ? "show" : ""}`}>
      <Header />
      {window.innerWidth <= 768 && (
        <button
          className="close-button md:hidden"
          onClick={() => setShowSongList(false)}
        >
          Close
        </button>
      )}
      <div className="search-bar">
        <input
          type="text"
          placeholder="Search by song, artist, or description..."
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          className="text-black"
        />
      </div>
      {filteredSongs.map((song) => (
        <div
          key={song.id}
          className="song"
          onClick={() => handleSongClick(song)}
        >
          <img
            src={`https://cms.samespace.com/assets/${song.cover}`}
            alt={song.name}
          />
          <div className="song-info">
            <h4>{song.name}</h4>
            <p>{song.artist}</p>
            {song.description && (
              <p className="song-description">{song.description}</p>
            )}
          </div>
          {durations[song.id] && (
            <p className="song-duration">
              {formatDuration(durations[song.id])}
            </p>
          )}
        </div>
      ))}
    </div>
  );
};

export default SongList;
