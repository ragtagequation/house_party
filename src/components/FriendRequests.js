import React, { useState } from 'react';
import './FriendRequests.css';

const FriendRequests = () => {
  const [requests, setRequests] = useState([
    {
      id: 1,
      sender: {
        id: 101,
        name: 'John Doe',
        image: 'https://via.placeholder.com/50',
        interests: ['hiking', 'gaming']
      },
      status: 'pending'
    },
    // Add more dummy requests
  ]);

  const handleRequest = (requestId, action) => {
    setRequests(requests.map(request => {
      if (request.id === requestId) {
        return { ...request, status: action };
      }
      return request;
    }));
  };

  return (
    <div className="friend-requests">
      <h2>Friend Requests</h2>
      <div className="requests-list">
        {requests.map(request => (
          <div key={request.id} className={`request-card ${request.status}`}>
            <img src={request.sender.image} alt={request.sender.name} />
            <div className="request-info">
              <h3>{request.sender.name}</h3>
              <div className="interests">
                {request.sender.interests.map(interest => (
                  <span key={interest} className="interest-tag">{interest}</span>
                ))}
              </div>
            </div>
            {request.status === 'pending' && (
              <div className="request-actions">
                <button 
                  className="accept-btn"
                  onClick={() => handleRequest(request.id, 'accepted')}
                >
                  Accept
                </button>
                <button 
                  className="reject-btn"
                  onClick={() => handleRequest(request.id, 'rejected')}
                >
                  Reject
                </button>
              </div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
};

export default FriendRequests;
