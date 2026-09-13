"use client";

import { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import { Card, CardHeader, CardContent, CardTitle, CardDescription } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Loader2, CheckCircle2, AlertCircle } from "lucide-react";

export default function UnsubscribePage() {
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  const [status, setStatus] = useState<"loading" | "success" | "error" | "form">(
    token ? "loading" : "form"
  );
  const [errorMsg, setErrorMsg] = useState("");
  const [email, setEmail] = useState("");
  const [emailBusy, setEmailBusy] = useState(false);

  useEffect(() => {
    if (!token) return;
    fetch("/api/unsubscribe", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ token }),
    })
      .then((r) => r.json())
      .then((j) => {
        if (j.ok) setStatus("success");
        else {
          setErrorMsg(j.error || "Invalid link");
          setStatus("error");
        }
      })
      .catch(() => {
        setErrorMsg("Network error. Please try again.");
        setStatus("error");
      });
  }, [token]);

  async function handleEmailUnsubscribe(e: React.FormEvent) {
    e.preventDefault();
    if (!email.trim()) return;
    setEmailBusy(true);
    try {
      const res = await fetch("/api/unsubscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: email.trim() }),
      });
      const j = await res.json();
      if (j.ok) setStatus("success");
      else {
        setErrorMsg(j.error || "Something went wrong");
        setStatus("error");
      }
    } catch {
      setErrorMsg("Network error. Please try again.");
      setStatus("error");
    } finally {
      setEmailBusy(false);
    }
  }

  return (
    <div className="container py-20 sm:py-28">
      <Card className="mx-auto max-w-xl">
        <CardHeader className="text-center">
          {status === "loading" && (
            <>
              <Loader2 className="mx-auto mb-4 h-10 w-10 animate-spin text-primary" />
              <CardTitle className="font-serifdisplay text-2xl">Unsubscribing...</CardTitle>
              <CardDescription>Please wait while we process your request.</CardDescription>
            </>
          )}
          {status === "success" && (
            <>
              <CheckCircle2 className="mx-auto mb-4 h-10 w-10 text-green-500" />
              <CardTitle className="font-serifdisplay text-2xl">You&apos;re unsubscribed</CardTitle>
              <CardDescription>
                You won&apos;t receive any more newsletter emails from us. You can always resubscribe on our homepage.
              </CardDescription>
            </>
          )}
          {status === "error" && (
            <>
              <AlertCircle className="mx-auto mb-4 h-10 w-10 text-destructive" />
              <CardTitle className="font-serifdisplay text-2xl">Something went wrong</CardTitle>
              <CardDescription>{errorMsg}</CardDescription>
            </>
          )}
          {status === "form" && (
            <>
              <CardTitle className="font-serifdisplay text-2xl">Unsubscribe from newsletter</CardTitle>
              <CardDescription>
                Enter your email address below to unsubscribe from our newsletter.
              </CardDescription>
            </>
          )}
        </CardHeader>
        {status === "form" && (
          <CardContent>
            <form onSubmit={handleEmailUnsubscribe} className="space-y-4">
              <div className="space-y-1.5">
                <Label htmlFor="unsub-email">Email address</Label>
                <Input
                  id="unsub-email"
                  type="email"
                  placeholder="you@company.com"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                />
              </div>
              <Button type="submit" disabled={emailBusy || !email.trim()} className="w-full">
                {emailBusy ? (
                  <><Loader2 className="mr-2 h-4 w-4 animate-spin" aria-hidden /> Processing...</>
                ) : (
                  "Unsubscribe"
                )}
              </Button>
            </form>
          </CardContent>
        )}
        {(status === "error" || status === "success") && (
          <CardContent className="text-center">
            <Button variant="outline" onClick={() => window.location.reload()}>
              Try again
            </Button>
          </CardContent>
        )}
      </Card>
    </div>
  );
}
