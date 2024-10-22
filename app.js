import React, { useEffect, useState } from 'react';
import axios from 'axios';

const App = () => {
    const [players, setPlayers] = useState([]);
    const [selectedPlayers, setSelectedPlayers] = useState([]);
    const [teamName, setTeamName] = useState('');

    useEffect(() => {
        const fetchPlayers = async () => {
            const response = await axios.get('http://localhost:5000/players');
            setPlayers(response.data);
        };
        fetchPlayers();
    }, []);

    const handlePlayerSelect = (player) => {
        if (selectedPlayers.length < 11 && !selectedPlayers.includes(player)) {
            setSelectedPlayers([...selectedPlayers, player]);
        }
    };

    const createTeam = async () => {
        const teamData = { name: teamName, players: selectedPlayers.map(p => p._id) };
        await axios.post('http://localhost:5000/teams', teamData);
        alert('Team created!');
    };

    const totalPoints = selectedPlayers.reduce((total, player) => total + player.points, 0);

    return (
        <div>
            <h1>Fantasy Game</h1>
            <input
                type="text"
                placeholder="Team Name"
                value={teamName}
                onChange={(e) => setTeamName(e.target.value)}
            />
            <h2>Available Players</h2>
            <ul>
                {players.map(player => (
                    <li key={player._id} onClick={() => handlePlayerSelect(player)}>
                        {player.name} - {player.points} Points
                    </li>
                ))}
            </ul>
            <h2>Your Team</h2>
            <ul>
                {selectedPlayers.map(player => (
                    <li key={player._id}>
                        {player.name} - {player.points} Points
                    </li>
                ))}
            </ul>
            <h3>Total Points: {totalPoints}</h3>
            <button onClick={createTeam}>Create Team</button>
        </div>
    );
};

export default App;
