"use client";

import { useEffect, useRef, useState } from "react";
import { FiMessageSquare } from "react-icons/fi";
import { IoClose } from "react-icons/io5";
import "../styles/chat.css";

type Message = {
  role: "user" | "bot";
  text: string;
  time: string;
};

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "👋 Bonjour ! Posez-moi une question sur votre retraite.",
      time: getCurrentTime(),
    },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const chatBodyRef = useRef<HTMLDivElement>(null);

  function getCurrentTime(): string {
    return new Date().toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
    });
  }

  useEffect(() => {
    if (chatBodyRef.current) {
      chatBodyRef.current.scrollTop = chatBodyRef.current.scrollHeight;
    }
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim()) return;

    const userMessage: Message = {
      role: "user",
      text: input,
      time: getCurrentTime(),
    };
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

      const botMessage: Message = {
        role: "bot",
        text: data.reply || "🤖 Je n’ai pas pu répondre à votre demande.",
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
    } catch (err) {
      setMessages((prev) => [
        ...prev,
        {
          role: "bot",
          text: "❌ Une erreur est survenue avec l'IA.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const handleFeedback = (type: "up" | "down", message: string) => {
    console.log(`Feedback ${type === "up" ? "👍" : "👎"} pour :`, message);
  };

  return (
    <>
      <div
        className="chat-bubble"
        onClick={() => setIsOpen(true)}
        title="Assistant Elysion IA"
      >
        <FiMessageSquare size={24} />
      </div>

      {isOpen && (
        <div className="chat-window">
          <div className="chat-header">
            <span>Elysion Assistant IA</span>
            <button onClick={() => setIsOpen(false)}>
              <IoClose size={22} />
            </button>
          </div>

          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div
                  style={{
                    display: "flex",
                    alignItems: "flex-start",
                    gap: "14px",
                  }}
                >
                  <img
                    src={msg.role === "bot" ? "/bot-avatar.png" : "/user-avatar.png"}
                    alt={msg.role === "bot" ? "IA" : "Vous"}
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%", marginTop: 2 }}
                  />
                  <div>
                    <div style={{ fontSize: "1.1rem", lineHeight: 1.5 }}>{msg.text}</div>
                    <div
                      style={{
                        fontSize: "0.85rem",
                        color: "#6b7280",
                        marginTop: 6,
                      }}
                    >
                      {msg.time}
                    </div>

                    {msg.role === "bot" && (
                      <div
                        style={{
                          marginTop: 8,
                          display: "flex",
                          gap: 14,
                          fontSize: "1.4rem",
                        }}
                      >
                        <button
                          onClick={() => handleFeedback("up", msg.text)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          title="Utile"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleFeedback("down", msg.text)}
                          style={{
                            background: "transparent",
                            border: "none",
                            cursor: "pointer",
                          }}
                          title="Pas utile"
                        >
                          👎
                        </button>
                      </div>
                    )}
                  </div>
                </div>
              </div>
            ))}

            {loading && (
              <div className="chat-msg bot">
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    gap: "12px",
                  }}
                >
                  <img
                    src="/bot-avatar.png"
                    alt="IA"
                    width={40}
                    height={40}
                    style={{ borderRadius: "50%" }}
                  />
                  <span style={{ fontSize: "1.1rem" }}>⏳ Réflexion…</span>
                </div>
              </div>
            )}
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
