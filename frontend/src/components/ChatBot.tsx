"use client";

import { useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import "../styles/chat.css";

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<{ role: string; text: string }[]>([]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage = { role: "user", text: input };
    setMessages((prev) => [...prev, userMessage]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: input }),
      });

      const data = await res.json();

      const botMessage = {
        role: "bot",
        text: data.reply || "Je n’ai pas pu répondre à votre demande.",
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        { role: "bot", text: "❌ Une erreur est survenue avec l'IA." },
      ]);
    } finally {
      setLoading(false);
    }
  };

  return (
    <>
      {/* Bulle flottante */}
      <div
        className="chat-bubble"
        onClick={() => setIsOpen(!isOpen)}
        title="Assistant Elysion IA"
      >
        <FiMessageSquare size={24} />
      </div>

      {/* Fenêtre du chatbot */}
      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">Elysion Assistant IA</div>
          <div className="chat-body">
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                {msg.text}
              </div>
            ))}
            {loading && <div className="chat-msg bot">⏳ Réflexion...</div>}
          </div>
          <div className="chat-input">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Posez votre question..."
              onKeyDown={(e) => e.key === "Enter" && sendMessage()}
            />
            <button onClick={sendMessage}>Envoyer</button>
          </div>
        </div>
      )}
    </>
  );
}
