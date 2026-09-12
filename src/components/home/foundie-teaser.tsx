"use client";

import { useEffect, useRef, useState } from "react";
import { MessageCircle, X, Send, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

type Message = { role: "user" | "assistant"; content: string };

const SUGGESTIONS = ["What services do you offer?", "How much does a project cost?", "How fast can you start?"];

export function FoundieTeaser() {
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [busy, setBusy] = useState(false);
  const ref = useRef<HTMLDivElement>(null);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!open) return;
    const onDown = (e: PointerEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false);
    };
    const onKey = (e: KeyboardEvent) => e.key === "Escape" && setOpen(false);
    document.addEventListener("pointerdown", onDown);
    document.addEventListener("keydown", onKey);
    return () => {
      document.removeEventListener("pointerdown", onDown);
      document.removeEventListener("keydown", onKey);
    };
  }, [open]);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  async function send(text: string) {
    if (!text.trim() || busy) return;
    const userMsg: Message = { role: "user", content: text.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setBusy(true);
    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: text.trim() }),
      });
      const json = await res.json();
      const reply = json.error || json.reply || "Something went wrong.";
      setMessages((prev) => [...prev, { role: "assistant", content: reply }]);
    } catch {
      setMessages((prev) => [...prev, { role: "assistant", content: "Connection error. Please try again." }]);
    }
    setBusy(false);
  }

  return (
    <div ref={ref} className="fixed bottom-6 right-6 z-30">
      {open && (
        <div className="mb-3 flex w-80 flex-col overflow-hidden rounded-lg border border-border/60 bg-background shadow-lift sm:w-96">
          <div className="flex items-center justify-between border-b border-border/60 px-4 py-3">
            <div className="flex items-center gap-2">
              <span className="flex h-7 w-7 items-center justify-center rounded-full bg-primary/10 text-xs font-bold text-primary">F</span>
              <div>
                <span className="font-display text-sm font-bold">Foundie</span>
                <span className="ml-2 inline-block h-1.5 w-1.5 rounded-full bg-primary" />
              </div>
            </div>
            <button
              type="button"
              onClick={() => setOpen(false)}
              aria-label="Close chat"
              className="flex h-7 w-7 items-center justify-center rounded-full transition-colors duration-fast hover:bg-accent"
            >
              <X className="h-4 w-4" aria-hidden />
            </button>
          </div>

          <div className="flex-1 overflow-y-auto p-4" style={{ maxHeight: 320 }}>
            {messages.length === 0 && (
              <div className="space-y-2 text-center">
                <p className="text-xs text-muted-foreground">Ask me anything about Founda Technologies.</p>
                <div className="flex flex-wrap justify-center gap-1.5 pt-2">
                  {SUGGESTIONS.map((s) => (
                    <button
                      key={s}
                      onClick={() => send(s)}
                      className="rounded-full border border-border/60 bg-muted/20 px-2.5 py-1 text-[11px] text-muted-foreground transition-colors hover:bg-accent/40 hover:text-foreground"
                    >
                      {s}
                    </button>
                  ))}
                </div>
              </div>
            )}
            {messages.map((m, i) => (
              <div key={i} className={cn("mb-2 max-w-[85%] rounded-lg px-3 py-2 text-xs leading-relaxed", m.role === "user" ? "ml-auto bg-primary text-primary-foreground" : "bg-muted/40 text-foreground")}>
                {m.content}
              </div>
            ))}
            {busy && (
              <div className="mb-2 flex w-fit items-center gap-1.5 rounded-lg bg-muted/40 px-3 py-2 text-xs text-muted-foreground">
                <Loader2 className="h-3 w-3 animate-spin" aria-hidden /> Thinking...
              </div>
            )}
            <div ref={bottomRef} />
          </div>

          <form
            onSubmit={(e) => { e.preventDefault(); send(input); }}
            className="flex items-center gap-2 border-t border-border/60 p-3"
          >
            <input
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type a question..."
              disabled={busy}
              className="flex-1 rounded-md border border-border/60 bg-muted/20 px-3 py-2 text-xs focus:outline-none focus:ring-1 focus:ring-primary disabled:opacity-60"
            />
            <button
              type="submit"
              disabled={!input.trim() || busy}
              className="flex h-8 w-8 items-center justify-center rounded-md bg-primary text-primary-foreground transition-colors hover:bg-primary/90 disabled:opacity-40"
              aria-label="Send message"
            >
              <Send className="h-3.5 w-3.5" aria-hidden />
            </button>
          </form>
        </div>
      )}
      <button
        type="button"
        onClick={() => setOpen((v) => !v)}
        aria-label={open ? "Close Foundie chat" : "Open Foundie chat"}
        aria-expanded={open}
        className={cn(
          "group flex h-14 items-center gap-2 rounded-full px-5 shadow-lift transition-all duration-base ease-soft hover:-translate-y-0.5 active:scale-95",
          open ? "bg-foreground text-background" : "bg-primary text-primary-foreground"
        )}
      >
        {open ? <X className="h-5 w-5" aria-hidden /> : <MessageCircle className="h-5 w-5" aria-hidden />}
        <span className="hidden font-display text-sm font-bold sm:inline">{open ? "Close" : "Ask Foundie"}</span>
      </button>
    </div>
  );
}
