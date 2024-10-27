import React, { useState } from 'react';
import { useSprings, animated } from '@react-spring/web';
import { useDrag } from '@use-gesture/react';
import { FaCheck, FaTimes } from 'react-icons/fa';
import './FriendFinder.css';

const FriendFinder = () => {
  const [people] = useState([
    {
      id: 1,
      name: 'John Doe',
      age: 25,
      bio: 'Looking for hiking and gaming buddies!',
      image: 'https://via.placeholder.com/300',
      interests: ['hiking', 'gaming', 'movies']
    },
    {
      id: 2,
      name: 'Jane Smith',
      age: 23,
      bio: 'Coffee enthusiast and book lover',
      image: 'https://via.placeholder.com/300',
      interests: ['reading', 'coffee', 'art']
    }
  ]);

  const [gone] = useState(() => new Set());

  const [props, api] = useSprings(people.length, i => ({
    x: 0,
    y: 0,
    scale: 1,
    rotation: 0,
    opacity: 1,
    from: { x: 0, rotation: 0, scale: 1, y: 0, opacity: 1 },
    config: { friction: 50, tension: 500 }
  }));

  const handleFriendRequest = (personId, isAccepted) => {
    // make an API call to handle the friend request
    console.log(`Friend request ${isAccepted ? 'accepted' : 'rejected'} for user:`, personId);
  };

  const handleButtonClick = (index, isAccepted) => {
    if (!gone.has(index)) {
      gone.add(index);
      handleFriendRequest(people[index].id, isAccepted);
      
      api.start(i => {
        if (index !== i) return;
        const x = (200 + window.innerWidth) * (isAccepted ? 1 : -1);
        return {
          x,
          rotation: (isAccepted ? 1 : -1) * 10,
          scale: 1,
          opacity: 0,
          immediate: false
        };
      });
    }
  };

  const bind = useDrag(({ args: [index], down, movement: [mx], direction: [xDir], velocity }) => {
    const trigger = velocity > 0.2;
    const dir = xDir < 0 ? -1 : 1;

    if (!down && trigger) {
      gone.add(index);
      const isAccepted = dir === 1;
      handleFriendRequest(people[index].id, isAccepted);
    }

    api.start(i => {
      if (index !== i) return;
      const isGone = gone.has(index);
      const x = isGone ? (200 + window.innerWidth) * dir : down ? mx : 0;
      const rotation = mx / 100 + (isGone ? dir * 10 * velocity : 0);
      const scale = down ? 1.1 : 1;
      const opacity = isGone ? 0 : 1;

      return {
        x,
        rotation,
        scale,
        opacity,
        immediate: down,
        config: { friction: 50, tension: down ? 800 : 500 }
      };
    });
  });

  return (
    <div className="friend-finder">
      <div className="swipe-info">
        <p>Swipe right to connect, left to pass</p>
      </div>
      <div className="cards-container">
        {props.map(({ x, y, rotation, scale, opacity }, i) => (
          <animated.div
            key={people[i].id}
            style={{
              transform: x.to(x => `translate3d(${x}px,${y}px,0)`),
              opacity
            }}
            className="card-wrapper"
          >
            <animated.div
              {...bind(i)}
              style={{
                transform: rotation.to(r => `rotate(${r}deg)`),
                scale: scale.to(s => s)
              }}
              className="card"
            >
              <div className="swipe-overlay">
                <div className="accept-overlay">CONNECT</div>
                <div className="reject-overlay">PASS</div>
              </div>
              <img src={people[i].image} alt={people[i].name} />
              <div className="card-info">
                <h2>{people[i].name}, {people[i].age}</h2>
                <p>{people[i].bio}</p>
                <div className="interests">
                  {people[i].interests.map(interest => (
                    <span key={interest} className="interest-tag">
                      {interest}
                    </span>
                  ))}
                </div>
              </div>
            </animated.div>
            <div className="action-buttons">
              <button 
                className="reject-button"
                onClick={() => handleButtonClick(i, false)}
              >
                <FaTimes />
              </button>
              <button 
                className="accept-button"
                onClick={() => handleButtonClick(i, true)}
              >
                <FaCheck />
              </button>
            </div>
          </animated.div>
        ))}
        {gone.size === people.length && (
          <div className="no-more-profiles">
            <h3>No more profiles to show!</h3>
            <p>Check back later for more potential friends</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default FriendFinder;
