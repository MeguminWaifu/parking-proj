import React, { useState, useEffect } from 'react';
import './QueueModal.css';

function QueueModal({ isOpen, onClose, user }) {
  const [queueCount, setQueueCount] = useState(0);

  useEffect(() => {
    if (isOpen) {
      fetchQueueCount();
    }
  }, [isOpen]);

  const fetchQueueCount = async () => {
    try {
      const response = await fetch('http://10.121.59.243:3001/api/queue-count'); // Your API endpoint
      const data = await response.json();
      setQueueCount(data.count);
    } catch (err) {
      console.error("Error fetching queue:", err);
    }
  };

 const handleJoinQueue = async () => {
  try {
    const response = await fetch('http://10.121.59.243:3001/api/join-queue', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username: user }) 
    });

    if (response.ok) {
      alert("Queued successfully!");
      fetchQueueCount(); 
    } else {
      const errorData = await response.json();
      alert(errorData.message);
    }
  } catch (err) {
    console.error("Queue Error:", err);
    alert("Connection failed");
  }
};
  if (!isOpen) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-content" onClick={(e) => e.stopPropagation()}>
        <h2>Queue Status</h2>
        <div className="queue-number-display">
          <p>People currently in queue:</p>
          <h1 style={{ fontSize: '3rem', color: '#ffffff' }}>{queueCount}</h1>
        </div>
        <p>Hello! : <strong>{user}</strong></p>
        
        <div className="modal-actions">
          <button onClick={onClose} className="modal-close-btn">Close</button>
          <button onClick={handleJoinQueue} className="modal-Queue-btn">Join Queue</button>
        </div>
      </div>
    </div>
  );
}

export default QueueModal;