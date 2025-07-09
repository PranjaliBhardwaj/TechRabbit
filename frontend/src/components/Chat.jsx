import "../../tailwind.css";
import React, { useState, useRef, useEffect } from "react";
import Header from "./Header";

const Chat = () => {
  const [messages, setMessages] = useState([
    { sender: "bot", text: "Hello! How can I help you today?" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const messagesEndRef = useRef(null);
  const inputRef = useRef(null);

  useEffect(() => {
    // Scroll to the bottom when messages change
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages, loading]);

  const handleSend = async (e) => {
    e.preventDefault();
    if (!input.trim()) return;
    const userMessage = { sender: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    if (inputRef.current) inputRef.current.focus();
    setLoading(true);

    // Call OpenAI API (replace YOUR_OPENAI_API_KEY with your actual key)
    try {
      const response = await fetch("https://api.openai.com/v1/chat/completions", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer YOUR_OPENAI_API_KEY`,
        },
        body: JSON.stringify({
          model: "gpt-3.5-turbo",
          messages: [
            { role: "system", content: "You are a helpful assistant." },
            ...[...messages, userMessage].map((msg) => ({
              role: msg.sender === "user" ? "user" : "assistant",
              content: msg.text,
            })),
          ],
        }),
      });
      const data = await response.json();
      const botReply = data.choices?.[0]?.message?.content || "Sorry, I couldn't get a response.";
      setMessages((prev) => [...prev, { sender: "bot", text: botReply }]);
    } catch (err) {
      setMessages((prev) => [...prev, { sender: "bot", text: "Error: Unable to reach the chatbot." }]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div
      className="relative flex min-h-screen flex-col bg-[#17141f] dark group/design-root overflow-x-hidden"
      style={{
        fontFamily: '"Space Grotesk", "Noto Sans", sans-serif',
      }}
    >
      <div className="flex flex-col flex-1 min-h-screen">
        <Header />

        {/* Chat Content */}
        <div className="flex flex-1 flex-col py-5 h-full">
          <h2 className="text-white text-[28px] font-bold leading-tight text-center pb-3 pt-5 px-4">
            Chat with our AI assistant
          </h2>
          <div className="flex-1 overflow-y-auto bg-[#191724] rounded-lg p-4 mb-4 mx-4" style={{ minHeight: 0 }}>
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`mb-2 flex ${msg.sender === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`px-4 py-2 rounded-lg max-w-[70%] text-sm ${
                    msg.sender === "user"
                      ? "bg-accent text-white"
                      : "bg-[#2b3240] text-white"
                  }`}
                >
                  {msg.text}
                </div>
              </div>
            ))}
            {loading && (
              <div className="mb-2 flex justify-start">
                <div className="px-4 py-2 rounded-lg bg-[#2b3240] text-white max-w-[70%] text-sm opacity-70">
                  Typing...
                </div>
              </div>
            )}
            <div ref={messagesEndRef} />
          </div>
          {/* Message Box */}
          <form
            onSubmit={handleSend}
            className="flex items-center gap-2 p-2 border-t border-[#2b3240] bg-[#191724] sticky bottom-0"
          >
            <input
              type="text"
              className="flex-1 rounded-lg px-4 py-2 bg-[#232136] text-white focus:outline-none"
              placeholder="Type your message..."
              value={input}
              onChange={(e) => setInput(e.target.value)}
              ref={inputRef}
            />
            <button
              type="submit"
              className="bg-accent text-white px-6 py-2 rounded-lg font-bold disabled:opacity-50"
              disabled={loading || !input.trim()}
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Chat;
