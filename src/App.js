import React, { useState, useEffect } from "react";
import axios from "axios";
import SongList from "./components/SongList";
import Player from "./components/Player";
import "./App.css";

const API_URL = "https://cms.samespace.com/items/songs";

function App() {
  const [songs, setSongs] = useState([]);
  const [currentSong, setCurrentSong] = useState(null);
  const [isPlaying, setIsPlaying] = useState(false);
  const [backgroundColor, setBackgroundColor] = useState("#000");
  const [showSongList, setShowSongList] = useState(false);

  useEffect(() => {
    axios
      .get(API_URL)
      .then((response) => {
        setSongs(response.data.data);
        setCurrentSong(response.data.data[0]);
      })
      .catch((error) => console.error("Error fetching songs:", error));
  }, []);

  useEffect(() => {
    if (currentSong) {
      setBackgroundColor(
        "#" + Math.floor(Math.random() * 16777215).toString(16)
      );
    }
  }, [currentSong]);

  return (
    <div className="app" style={{ background: backgroundColor }}>
      <div className="content">
        <SongList
          songs={songs}
          setCurrentSong={setCurrentSong}
          showSongList={showSongList}
          setShowSongList={setShowSongList}
        />
        <Player
          currentSong={currentSong}
          isPlaying={isPlaying}
          setIsPlaying={setIsPlaying}
          setCurrentSong={setCurrentSong}
          songs={songs}
          setShowSongList={setShowSongList}
        />

        <img
          src="https://www.w3schools.com/howto/img_avatar.png"
          alt="Profile DP"
          className="fixed bottom-0 left-0 m-4 w-10 h-10 rounded-full border-2 border-white"
        />
      </div>
    </div>

 
  );
}

export default App;
