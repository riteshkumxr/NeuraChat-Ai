import React, { useEffect, useRef, useState } from "react";
import "./ChatMessages.css";

const ChatMessages = ({ messages, isSending }) => {
  const bottomRef = useRef(null);
  const [feedback, setFeedback] = useState({}); // { index: "like" | "dislike" }
  const [speaking, setSpeaking] = useState(null); // index of currently speaking message

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length, isSending]);

  const handleLike = (index) => {
    setFeedback((prev) => ({
      ...prev,
      [index]: prev[index] === "like" ? null : "like",
    }));
  };

  const handleDislike = (index) => {
    setFeedback((prev) => ({
      ...prev,
      [index]: prev[index] === "dislike" ? null : "dislike",
    }));
  };

  const handleSpeak = (content, index) => {
    if (speaking === index) {
      speechSynthesis.cancel();
      setSpeaking(null);
    } else {
      try {
        speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(content);
        utterance.onend = () => setSpeaking(null);
        speechSynthesis.speak(utterance);
        setSpeaking(index);
      } catch {
        console.warn("Speech synthesis not supported");
      }
    }
  };

  return (
    <div className="messages" aria-live="polite">
      {messages.map((m, index) => (
        <div key={index} className={`msg msg-${m.type}`}>
          <div className="msg-role" aria-hidden="true">
            {m.type === "user" ? "You" : "AI"}
          </div>

          <div className="msg-bubble">{m.content}</div>

          <div className="msg-actions" role="group" aria-label="Message actions">
            {/* Copy */}
            <button
              type="button"
              aria-label="Copy message"
              onClick={() => navigator.clipboard.writeText(m.content)}
            >
              <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                <rect x="9" y="9" width="13" height="13" rx="2" ry="2" />
                <path d="M5 15H4a2 2 0 0 1-2-2V4a2 2 0 0 1 2-2h9a2 2 0 0 1 2 2v1" />
              </svg>
            </button>

            {/* Like */}
            <button
              type="button"
              aria-label="Like message"
              onClick={() => handleLike(index)}
            >
              {feedback[index] === "like" ? (
                // Dark filled like
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M7 10v11" />
                  <path d="M15 21H9a2 2 0 0 1-2-2v-9l5-7 1 1a2 2 0 0 1 .5 1.3V9h5a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2Z" />
                </svg>
              ) : (
                // Outline like
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M7 10v11" />
                  <path d="M15 21H9a2 2 0 0 1-2-2v-9l5-7 1 1a2 2 0 0 1 .5 1.3V9h5a2 2 0 0 1 2 2l-2 8a2 2 0 0 1-2 2Z" />
                </svg>
              )}
            </button>

            {/* Dislike */}
            <button
              type="button"
              aria-label="Dislike message"
              onClick={() => handleDislike(index)}
            >
              {feedback[index] === "dislike" ? (
                // Dark filled dislike
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <path d="M17 14V3" />
                  <path d="M9 3h6a2 2 0 0 1 2 2v9l-5 7-1-1a2 2 0 0 1-.5-1.3V15H5a2 2 0 0 1-2-2l2-8a2 2 0 0 1 2-2Z" />
                </svg>
              ) : (
                // Outline dislike
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M17 14V3" />
                  <path d="M9 3h6a2 2 0 0 1 2 2v9l-5 7-1-1a2 2 0 0 1-.5-1.3V15H5a2 2 0 0 1-2-2l2-8a2 2 0 0 1 2-2Z" />
                </svg>
              )}
            </button>

            {/* Speak / Stop */}
            <button
              type="button"
              aria-label="Speak message"
              onClick={() => handleSpeak(m.content, index)}
            >
              {speaking === index ? (
                // Dark stop icon
                <svg viewBox="0 0 24 24" fill="currentColor" stroke="none">
                  <rect x="6" y="6" width="12" height="12" />
                </svg>
              ) : (
                // Outline speaker
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor">
                  <path d="M5 8v8" />
                  <path d="M8 4v16" />
                  <path d="M12 2v20" />
                  <path d="M19 5c1.5 2 1.5 12 0 14" />
                  <path d="M16 8c.8 1 1 7 0 8" />
                </svg>
              )}
            </button>
          </div>
        </div>
      ))}

      {isSending && (
        <div className="msg msg-ai pending">
          <div className="msg-role" aria-hidden="true">AI</div>
          <div className="msg-bubble typing-dots" aria-label="AI is typing">
            <span /><span /><span />
          </div>
        </div>
      )}

      <div ref={bottomRef} />
    </div>
  );
};

export default ChatMessages;
