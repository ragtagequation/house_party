import React, { useState } from 'react';
import './HouseParties.css';

const HouseParties = () => {
  const [parties, setParties] = useState([]);
  const [showAddParty, setShowAddParty] = useState(false);
  const [newParty, setNewParty] = useState({
    title: '',
    date: '',
    location: '',
    description: '',
    maxGuests: 0
  });

  const handleAddParty = (e) => {
    e.preventDefault();
    setParties([...parties, { ...newParty, id: Date.now(), requests: [] }]);
    setNewParty({
      title: '',
      date: '',
      location: '',
      description: '',
      maxGuests: 0
    });
    setShowAddParty(false);
  };

  const handleJoinRequest = (partyId) => {
    setParties(parties.map(party => {
      if (party.id === partyId) {
        return {
          ...party,
          requests: [...party.requests, { userId: 'currentUser', status: 'pending' }]
        };
      }
      return party;
    }));
  };

  return (
    <div className="house-parties">
      <button 
        className="add-party-btn"
        onClick={() => setShowAddParty(true)}
      >
        Host a Party
      </button>

      {showAddParty && (
        <div className="modal">
          <form onSubmit={handleAddParty}>
            <input
              type="text"
              placeholder="Party Title"
              value={newParty.title}
              onChange={(e) => setNewParty({...newParty, title: e.target.value})}
            />
            <input
              type="date"
              value={newParty.date}
              onChange={(e) => setNewParty({...newParty, date: e.target.value})}
            />
            <input
              type="text"
              placeholder="Location"
              value={newParty.location}
              onChange={(e) => setNewParty({...newParty, location: e.target.value})}
            />
            <textarea
              placeholder="Description"
              value={newParty.description}
              onChange={(e) => setNewParty({...newParty, description: e.target.value})}
            />
            <input
              type="number"
              placeholder="Max Guests"
              value={newParty.maxGuests}
              onChange={(e) => setNewParty({...newParty, maxGuests: e.target.value})}
            />
            <button type="submit">Create Party</button>
          </form>
        </div>
      )}

      <div className="parties-list">
        {parties.map(party => (
          <div key={party.id} className="party-card">
            <h3>{party.title}</h3>
            <p>Date: {party.date}</p>
            <p>Location: {party.location}</p>
            <p>{party.description}</p>
            <p>Guests: {party.requests.length}/{party.maxGuests}</p>
            <button 
              onClick={() => handleJoinRequest(party.id)}
              disabled={party.requests.some(r => r.userId === 'currentUser')}
            >
              Request to Join
            </button>
          </div>
        ))}
      </div>
    </div>
  );
};

export default HouseParties;
