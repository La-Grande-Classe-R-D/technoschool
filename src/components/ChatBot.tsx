"use client";

import { useState, useRef, useEffect } from "react";
import { MessageCircle, X, Send, Bot, Loader2 } from "lucide-react";

interface Message {
  role: "user" | "assistant";
  content: string;
}

function renderContent(text: string): string {
  return text
    .replace(/\*\*(.+?)\*\*/g, "<strong>$1</strong>")
    .replace(/\*(.+?)\*/g, "<em>$1</em>")
    .replace(/\n/g, "<br />");
}

const WELCOME: Message = {
  role: "assistant",
  content:
    "Bonjour ! Je suis l'assistant de La Grande Classe LGC R&D. Posez-moi vos questions sur le BTS SIO, nos formations ou notre fonctionnement. 🎓",
};

export function ChatBot() {
  const [isOpen, setIsOpen] = useState(false);
  const [isClosing, setIsClosing] = useState(false);
  const [messages, setMessages] = useState<Message[]>([WELCOME]);
  const [input, setInput] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  useEffect(() => {
    if (isOpen) setTimeout(() => inputRef.current?.focus(), 350);
  }, [isOpen]);

  const closeChat = () => {
    if (isClosing) return;
    setIsClosing(true);
    setTimeout(() => {
      setIsOpen(false);
      setIsClosing(false);
    }, 400);
  };

  const sendMessage = async () => {
    if (!input.trim() || isLoading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    const history = [...messages, userMsg];
    setMessages([...history, { role: "assistant", content: "" }]);
    setInput("");
    setIsLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ messages: history }),
      });

      if (!res.ok) throw new Error("Erreur serveur");

      const reader = res.body?.getReader();
      const decoder = new TextDecoder();
      if (!reader) throw new Error();

      while (true) {
        const { done, value } = await reader.read();
        if (done) break;

        const lines = decoder
          .decode(value, { stream: true })
          .split("\n")
          .filter((l) => l.startsWith("data: "));

        for (const line of lines) {
          const data = line.slice(6);
          if (data === "[DONE]") continue;
          try {
            const delta =
              JSON.parse(data).choices?.[0]?.delta?.content ?? "";
            if (delta) {
              setMessages((prev) => {
                const updated = [...prev];
                updated[updated.length - 1] = {
                  role: "assistant",
                  content: updated[updated.length - 1].content + delta,
                };
                return updated;
              });
            }
          } catch {
            // ligne SSE non-JSON ignorée
          }
        }
      }
    } catch {
      setMessages((prev) => {
        const updated = [...prev];
        updated[updated.length - 1] = {
          role: "assistant",
          content:
            "Désolé, une erreur est survenue. Contactez-nous au 01 40 10 27 22 ou par email à contact@lgc-rd.fr.",
        };
        return updated;
      });
    } finally {
      setIsLoading(false);
    }
  };

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === "Enter" && !e.shiftKey) {
      e.preventDefault();
      sendMessage();
    }
  };

  return (
    <>
      {/* Bouton flottant */}
      <button
        type="button"
        onClick={() => setIsOpen(true)}
        aria-label="Ouvrir l'assistant LGC"
        className={`chatbot-fab ${isOpen ? "chatbot-fab-hidden" : ""}`}
      >
        <MessageCircle className="w-6 h-6 text-white" />
        <span className="chatbot-fab-pulse" />
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className={`chatbot-window ${isClosing ? "chatbot-window-out" : "chatbot-window-in"}`}>
          {/* Header */}
          <div className="chatbot-header">
            <div className="chatbot-avatar">
              <Bot className="w-4 h-4 text-white" />
            </div>
            <div className="chatbot-header-info">
              <p className="chatbot-header-title">Assistant LGC</p>
              <p className="chatbot-header-sub">BTS SIO · Recherche &amp; Développement</p>
            </div>
            <button
              type="button"
              onClick={closeChat}
              aria-label="Fermer"
              className="chatbot-close-btn"
            >
              <X className="w-4 h-4" />
            </button>
          </div>

          {/* Messages */}
          <div
            className="chatbot-messages"
            role="log"
            aria-live="polite"
            aria-label="Messages du chat"
          >
            {messages.map((msg, i) => (
              <div
                key={i}
                className={`chatbot-msg-row ${msg.role === "user" ? "chatbot-msg-row-user" : ""}`}
              >
                {msg.role === "assistant" && (
                  <div className="chatbot-bot-dot">
                    <Bot className="w-3 h-3 text-white" />
                  </div>
                )}
                <div
                  className={`chatbot-bubble ${
                    msg.role === "user" ? "chatbot-bubble-user" : "chatbot-bubble-bot"
                  }`}
                >
                  {!msg.content && isLoading && i === messages.length - 1 ? (
                    <span className="chatbot-typing">
                      <span /><span /><span />
                    </span>
                  ) : (
                    <span dangerouslySetInnerHTML={{ __html: renderContent(msg.content) }} />
                  )}
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>

          {/* Input */}
          <div className="chatbot-input-area">
            <textarea
              ref={inputRef}
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKeyDown}
              placeholder="Posez votre question… (Entrée pour envoyer)"
              rows={1}
              className="chatbot-input"
              aria-label="Votre message"
              disabled={isLoading}
            />
            <button
              type="button"
              onClick={sendMessage}
              disabled={!input.trim() || isLoading}
              className="chatbot-send-btn"
              aria-label="Envoyer"
            >
              {isLoading ? (
                <Loader2 className="w-4 h-4 text-white animate-spin" />
              ) : (
                <Send className="w-4 h-4 text-white" />
              )}
            </button>
          </div>
        </div>
      )}
    </>
  );
}
