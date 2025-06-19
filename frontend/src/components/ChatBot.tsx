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

// ─────────────────────────────────────────────────────────────
// 1. Réponses rapides (FAQs)
// ─────────────────────────────────────────────────────────────
const canned = [
  {
    pattern: /\bpea\b/i,
    reply:
      "PEA (Plan d’\u00C9pargne en Actions) – l’enveloppe fiscale pour investir en actions europ\u00E9ennes.\n\n• Plafond : 150 000 € (225 000 € avec PEA‑PME).\n• Gains exonérés d’IR après 5 ans (17,2 % prél. sociaux).\n• Idéal pour capitaliser long terme en vue de la retraite.",
  },
];

const defaultSuggestions = [
  { label: "Ouvrir un PEA", trigger: "Comment ouvrir un PEA ?" },
  { label: "Parler à un conseiller", trigger: "Je veux parler à un conseiller." },
  { label: "Simuler mon rendement", trigger: "Peux‑tu simuler le rendement d’un PEA ?" },
];

export default function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([
    {
      role: "bot",
      text: "👋 Bonjour ! Comment puis‑je vous aider à préparer votre retraite ?",
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
  }, [messages, loading]);

  // ─────────────────────────────────────────────────────────────
  // ✉️ 2. Envoi d’un message
  // ─────────────────────────────────────────────────────────────
  const sendMessageInternal = async (text: string) => {
    const trimmed = text.trim();
    if (!trimmed) return;

    const userMessage: Message = {
      role: "user",
      text: trimmed,
      time: getCurrentTime(),
    };
    setMessages((prev) => [...prev, userMessage]);
    setLoading(true);

    // 2.a Check réponses rapides
    const cannedFound = canned.find((c) => c.pattern.test(trimmed));
    if (cannedFound) {
      const botMessage: Message = {
        role: "bot",
        text: cannedFound.reply,
        time: getCurrentTime(),
      };
      setMessages((prev) => [...prev, botMessage]);
      setLoading(false);
      return;
    }

    // 2.b Fallback : call back‑end
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: trimmed }),
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
          text: "❌ Une erreur est survenue avec l’IA.",
          time: getCurrentTime(),
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const sendMessage = () => {
    sendMessageInternal(input);
    setInput("");
  };

  const handleQuickReply = (trigger: string) => {
    sendMessageInternal(trigger);
  };

  const handleFeedback = (type: "up" | "down", message: string) => {
    console.log(`Feedback ${type === "up" ? "👍" : "👎"} pour :`, message);
  };

  const formatText = (text: string) =>
    text.split("\n").map((line, idx) => (
      <span key={idx}>
        {line}
        <br />
      </span>
    ));

  return (
    <>
      {/* ─────────── BUBBLE LAUNCHER ─────────── */}
      <div
        className="chat-bubble"
        onClick={() => setIsOpen(true)}
        title="Assistant Elysion IA"
      >
        <FiMessageSquare size={24} />
      </div>

      {isOpen && (
        <div className="chat-window">
          {/* ─────────── HEADER ─────────── */}
          <div className="chat-header-gradient">
            <div className="chat-header-content">
              <img src="/bot-avatar.png" alt="IA" className="chat-header-avatar" />
              <div className="chat-header-text">
                <strong>Elysion IA</strong>
                <span className="chat-header-status">Nous sommes en ligne !</span>
              </div>
              <button
                className="chat-header-close"
                onClick={() => setIsOpen(false)}
                title="Fermer"
              >
                <IoClose size={22} color="#fff" />
              </button>
            </div>
          </div>

          {/* ─────────── BODY ─────────── */}
          <div className="chat-body" ref={chatBodyRef}>
            {messages.map((msg, i) => (
              <div key={i} className={`chat-msg ${msg.role}`}>
                <div className="chat-avatar-row">
                  <img
                    src={msg.role === "bot" ? "/bot-avatar.png" : "/user-avatar.png"}
                    alt={msg.role === "bot" ? "IA" : "Vous"}
                    className="chat-avatar"
                  />
                  <div className="chat-bubble-content">
                    <div className="chat-text">{formatText(msg.text)}</div>
                    <div className="chat-time">{msg.time}</div>

                    {msg.role === "bot" && (
                      <div className="chat-feedback">
                        <button
                          onClick={() => handleFeedback("up", msg.text)}
                          title="Utile"
                        >
                          👍
                        </button>
                        <button
                          onClick={() => handleFeedback("down", msg.text)}
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
                <div className="chat-avatar-row">
                  <img src="/bot-avatar.png" alt="IA" className="chat-avatar" />
                  <span className="chat-text">⏳ Réflexion…</span>
                </div>
              </div>
            )}

            {/* ─────────── QUICK REPLIES ─────────── */}
            {!loading && (
              <div className="quick-replies">
                {defaultSuggestions.map((sug) => (
                  <button
                    key={sug.label}
                    className="quick-reply-chip"
                    onClick={() => handleQuickReply(sug.trigger)}
                  >
                    {sug.label}
                  </button>
                ))}
              </div>
            )}
          </div>

          {/* ─────────── INPUT ─────────── */}
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