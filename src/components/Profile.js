import { useState } from 'react';
import './Profile.css';

const Profile = () => {
  const [profile, setProfile] = useState({
    name: '',
    age: '',
    bio: '',
    interests: [],
    image: null
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle profile update logic here
  };

  const handleInterestAdd = (e) => {
    if (e.key === 'Enter' && e.target.value) {
      setProfile({
        ...profile,
        interests: [...profile.interests, e.target.value]
      });
      e.target.value = '';
    }
  };

  return (
    <div className="profile-container">
      <h2>My Profile</h2>
      <form onSubmit={handleSubmit} className="profile-form">
        <div className="form-group">
          <label>Profile Picture</label>
          <input
            type="file"
            accept="image/*"
            onChange={(e) => setProfile({...profile, image: e.target.files[0]})}
          />
        </div>

        <div className="form-group">
          <label>Name</label>
          <input
            type="text"
            value={profile.name}
            onChange={(e) => setProfile({...profile, name: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Age</label>
          <input
            type="number"
            value={profile.age}
            onChange={(e) => setProfile({...profile, age: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Bio</label>
          <textarea
            value={profile.bio}
            onChange={(e) => setProfile({...profile, bio: e.target.value})}
          />
        </div>

        <div className="form-group">
          <label>Interests (Press Enter to add)</label>
          <input
            type="text"
            onKeyPress={handleInterestAdd}
            placeholder="Add your interests"
          />
          <div className="interests-tags">
            {profile.interests.map((interest, index) => (
              <span key={index} className="interest-tag">
                {interest}
                <button
                  type="button"
                  onClick={() => {
                    setProfile({
                      ...profile,
                      interests: profile.interests.filter((_, i) => i !== index)
                    });
                  }}
                >
                  ×
                </button>
              </span>
            ))}
          </div>
        </div>

        <button type="submit" className="save-button">Save Profile</button>
      </form>
    </div>
  );
};

export default Profile;
