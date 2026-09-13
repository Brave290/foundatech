"use client";

import { useRef, useEffect } from "react";
import { User, Bot } from "lucide-react";
import { cn } from "@/lib/utils";

interface ChatMessage {
  role: "user" | "assistant";
  content: string;
  timestamp: string;
}

interface ChatHistoryProps {
  messages: ChatMessage[];
}

function formatTime(ts: string): string {
  const d = new Date(ts);
  return `${String(d.getHours()).padStart(2, "0")}:${String(d.getMinutes()).padStart(2, "0")}`;
}

export function ChatHistory({ messages }: ChatHistoryProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  if (messages.length === 0) {
    return (
      <div className="flex h-full items-center justify-center text-sm text-muted-foreground">
        No messages yet.
      </div>
    );
  }

  return (
    <div className="flex h-full flex-col overflow-y-auto p-4 space-y-3">
      {messages.map((m, i) => (
        <div
          key={i}
          className={cn(
            "flex gap-2 max-w-[85%]",
            m.role === "user" ? "ml-auto flex-row-reverse" : "mr-auto"
          )}
        >
          <div
            className={cn(
              "flex h-7 w-7 shrink-0 items-center justify-center rounded-full",
              m.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted text-muted-foreground"
            )}
          >
            {m.role === "user" ? (
              <User className="h-3.5 w-3.5" />
            ) : (
              <Bot className="h-3.5 w-3.5" />
            )}
          </div>
          <div
            className={cn(
              "rounded-lg px-3 py-2 text-xs leading-relaxed",
              m.role === "user"
                ? "bg-primary text-primary-foreground"
                : "bg-muted/40 text-foreground"
            )}
          >
            <p>{m.content}</p>
            <span className="mt-1 block text-[10px] opacity-60">
              {formatTime(m.timestamp)}
            </span>
          </div>
        </div>
      ))}
      <div ref={bottomRef} />
    </div>
  );
}
