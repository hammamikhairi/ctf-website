import { useEffect, useState } from "react";

export default function Players() {
  const [players, setPlayers] = useState([]);
  const [time, setTime] = useState(null);

  function formatTime(temp) {
    if (temp < 10) {
      return `0${temp}`
    } else {
      return temp
    }
  }

  useEffect(() => {
    const fetchPlayers = async () => {
      const res = await fetch("/api/allPlayers");
      const data = await res.json();
      const now = new Date();
      const hours = now.getHours();
      const minutes = now.getMinutes();
      const seconds = now.getSeconds();

      setTime(`Current time is ${formatTime(hours)}:${formatTime(minutes)}:${formatTime(seconds)}`);

      setPlayers(data);
    };

    const timer = setInterval(() => {
      fetchPlayers();
    }, 5000);

    fetchPlayers();

    return () => clearInterval(timer);
  }, []);

  return (
    <div>
      <h3>{time}</h3>
      <h1>List of Players:</h1>
      <ul>
        {players.map((player) => (
          <li key={player.PLAYER_ID}>
            <p>ID: {player.PLAYER_ID}</p>
            <p>Email: {player.EMAIL}</p>
            <p>Player: {player.PLAYER}</p>
            <p>Level: {player.LEVEL}</p>
            <p>Updated at: {player.UPDATED_AT}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
