import React from 'react';
import { useNavigate } from 'react-router-dom';
import './ChatSidebar.css';

const ChatSidebar = ({ chats, activeChatId, onSelectChat, onNewChat, open }) => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Clear auth tokens or user data from storage
    localStorage.removeItem('authToken'); 
    // Redirect to login page
    navigate('/login');
  };
  

  
  return (
    <aside className={"chat-sidebar " + (open ? 'open' : '')} aria-label="Previous chats">
      <div className="sidebar-header">
        <h2>NeuraChat</h2>
        <button className="small-btn" onClick={onNewChat}>+ Newchat</button>
      </div>

      <nav className="chat-list" aria-live="polite">
        {chats.map(c => (
          <button
            key={c._id}
            className={"chat-list-item " + (c._id === activeChatId ? 'active' : '')}
            onClick={() => onSelectChat(c._id)}
          >
            
            <span className="title-line">{c.title}</span>
          </button>
        ))}
        {chats.length === 0 && <p className="empty-hint">No chats yet.</p>}
      </nav>

      {/* Logout Button fixed at bottom */}
      <div className="sidebar-footer">
        <button className="small-btn logout-btn" onClick={handleLogout}>
          Logout
        </button>
        
      </div>

      
    </aside>
  );
};

export default ChatSidebar;
