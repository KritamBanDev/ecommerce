"use client";
import React, { useCallback, useEffect, useRef } from "react";

const CHATBOT_DIV_ID = "aichatbot";
const CHATBOT_SCRIPT_ID = "aichatbot-script";

const ChatIcon = () => {
  const injectedRef = useRef(false);

  const injectChatbot = useCallback(() => {
    if (injectedRef.current) return;
    injectedRef.current = true;
    // Create and append the chatbot container div
    if (!document.getElementById(CHATBOT_DIV_ID)) {
      const div = document.createElement("div");
      div.id = CHATBOT_DIV_ID;
      document.body.appendChild(div);
    }
    // Assign chatbotConfig to window
    (window as any).chatbotConfig = [
      "BAB7C759-C70C-45ED-9987-414B76B81F37",
      "dTtiij56YxTvc-eKxEMnJ",
      {
        apiHost:
          "https://api-BAB7C759-C70C-45ED-9987-414B76B81F37.sendbird.com",
      },
    ];
    // Inject the chatbot script if not already present
    if (!document.getElementById(CHATBOT_SCRIPT_ID)) {
      const f = document.getElementsByTagName("script")[0];
      const j = document.createElement("script");
      j.id = CHATBOT_SCRIPT_ID;
      j.defer = true;
      j.type = "module";
      j.src = "https://aichatbot.sendbird.com/index.js";
      f.parentNode?.insertBefore(j, f);
    }
  }, []);

  // Clean up on unmount
  useEffect(() => {
    return () => {
      const div = document.getElementById(CHATBOT_DIV_ID);
      if (div) document.body.removeChild(div);
      const script = document.getElementById(CHATBOT_SCRIPT_ID);
      if (script) script.remove();
      injectedRef.current = false;
    };
  }, []);

  return (
    <>
      <button
        aria-label="Open chat support"
        className="fixed z-50 bottom-6 right-6 bg-primary text-white rounded-full shadow-lg p-4 hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-primary transition-all animate-bounce"
        onClick={injectChatbot}
        tabIndex={0}
        title="Chat with us!"
      >
        <svg width="28" height="28" fill="none" viewBox="0 0 24 24">
          <path
            fill="currentColor"
            d="M12 3C6.477 3 2 6.797 2 11c0 1.61.67 3.13 1.89 4.41-.13.7-.51 2.09-.7 2.74-.11.36.25.7.6.59.66-.2 2.09-.63 2.8-.85C8.47 19.13 10.18 19.5 12 19.5c5.523 0 10-3.797 10-8.5S17.523 3 12 3Z"
          />
        </svg>
        <span className="sr-only">Open chat support</span>
      </button>
    </>
  );
};

export default ChatIcon;