"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { Card, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Mail, Save } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import { saveSetting } from "@/lib/admin/actions";

interface Template {
  key: string;
  name: string;
  subject: string;
  body: string;
}

const TEMPLATE_KEYS = [
  { key: "email_contact_confirmation", name: "Contact Confirmation" },
  { key: "email_newsletter_welcome", name: "Newsletter Welcome" },
  { key: "email_delivery_access", name: "Delivery Access" },
  { key: "email_auto_reply", name: "Auto-Reply" },
] as const;

const FALLBACK_TEMPLATES: Record<string, Template> = {
  email_contact_confirmation: {
    key: "email_contact_confirmation",
    name: "Contact Confirmation",
    subject: "We received your message — Founda Technologies",
    body: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
  <h2 style="color: #1a1a1a;">Thanks for reaching out!</h2>
  <p>We've received your message and will get back to you within 24 hours.</p>
  <p>If your matter is urgent, reply to this email with additional details.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">Founda Technologies — Building digital solutions that work.</p>
</body>
</html>`,
  },
  email_newsletter_welcome: {
    key: "email_newsletter_welcome",
    name: "Newsletter Welcome",
    subject: "Welcome to the Founda Technologies newsletter",
    body: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
  <h2 style="color: #1a1a1a;">You're in!</h2>
  <p>Welcome to the Founda Technologies newsletter. Every week we share:</p>
  <ul>
    <li>Project spotlights and case studies</li>
    <li>Tips for choosing the right tech stack</li>
    <li>Early access to new services</li>
  </ul>
  <p>No spam. Unsubscribe anytime.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">Founda Technologies — Building digital solutions that work.</p>
</body>
</html>`,
  },
  email_delivery_access: {
    key: "email_delivery_access",
    name: "Delivery Access",
    subject: "Your project is ready — Founda Technologies",
    body: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
  <h2 style="color: #1a1a1a;">Your project is ready!</h2>
  <p>Great news — your project has been delivered and is ready for you.</p>
  <p><a href="{{DELIVERY_LINK}}" style="display:inline-block; padding:12px 24px; background:#1a1a1a; color:#fff; text-decoration:none; border-radius:6px; font-weight:600;">View Your Project</a></p>
  <p style="margin-top:16px;">If you have any questions or need revisions, just reply to this email.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">Founda Technologies — Building digital solutions that work.</p>
</body>
</html>`,
  },
  email_auto_reply: {
    key: "email_auto_reply",
    name: "Auto-Reply",
    subject: "We've got your inquiry — Founda Technologies",
    body: `<!DOCTYPE html>
<html>
<head><meta charset="utf-8"></head>
<body style="font-family: sans-serif; max-width: 600px; margin: 0 auto; padding: 32px;">
  <h2 style="color: #1a1a1a;">Inquiry received</h2>
  <p>Thank you for your interest in Founda Technologies. A team member will review your inquiry and respond shortly.</p>
  <p>In the meantime, feel free to explore our work at <a href="https://foundatech.name.ng">foundatech.name.ng</a>.</p>
  <hr style="border: none; border-top: 1px solid #eee; margin: 24px 0;">
  <p style="font-size: 12px; color: #999;">Founda Technologies — Building digital solutions that work.</p>
</body>
</html>`,
  },
};

export function EmailTemplates() {
  const router = useRouter();
  const [openIndex, setOpenIndex] = useState<number | null>(null);
  const [templates, setTemplates] = useState<Template[]>(() =>
    TEMPLATE_KEYS.map((t) => ({ ...FALLBACK_TEMPLATES[t.key] }))
  );
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState<string | null>(null);
  const [feedback, setFeedback] = useState<{ type: "success" | "error"; message: string } | null>(null);

  useEffect(() => {
    async function fetchTemplates() {
      try {
        const res = await fetch("/api/admin/settings");
        if (!res.ok) throw new Error("Failed to fetch settings");
        const data: { key: string; value: unknown }[] = await res.json();

        setTemplates((prev) =>
          prev.map((tpl) => {
            const found = data.find((s) => s.key === tpl.key);
            if (found && typeof found.value === "string") {
              try {
                const parsed = JSON.parse(found.value) as { subject?: string; body?: string };
                return {
                  ...tpl,
                  subject: parsed.subject ?? tpl.subject,
                  body: parsed.body ?? tpl.body,
                };
              } catch {
                return tpl;
              }
            }
            return tpl;
          })
        );
      } catch {
        // Fall back to hardcoded defaults
      } finally {
        setLoading(false);
      }
    }
    fetchTemplates();
  }, []);

  function updateField(index: number, field: "subject" | "body", value: string) {
    setTemplates((prev) =>
      prev.map((tpl, i) => (i === index ? { ...tpl, [field]: value } : tpl))
    );
    setFeedback(null);
  }

  async function handleSave(tpl: Template) {
    setSaving(tpl.key);
    setFeedback(null);
    try {
      const payload = JSON.stringify({ subject: tpl.subject, body: tpl.body });
      await saveSetting(tpl.key, payload);
      setFeedback({ type: "success", message: `"${tpl.name}" saved successfully.` });
      router.refresh();
    } catch (e: unknown) {
      setFeedback({
        type: "error",
        message: e instanceof Error ? e.message : "Failed to save template.",
      });
    }
    setSaving(null);
  }

  if (loading) {
    return (
      <div className="space-y-4">
        {[0, 1, 2, 3].map((i) => (
          <Card key={i}>
            <div className="flex items-center gap-3 p-6">
              <Mail className="h-5 w-5 text-muted-foreground animate-pulse" />
              <div className="h-4 w-48 animate-pulse rounded bg-muted" />
            </div>
          </Card>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {feedback && (
        <div
          className={`rounded-lg border px-4 py-3 text-sm ${
            feedback.type === "success"
              ? "border-green-200 bg-green-50 text-green-800 dark:border-green-800 dark:bg-green-950 dark:text-green-200"
              : "border-destructive/30 bg-destructive/10 text-destructive"
          }`}
        >
          {feedback.message}
        </div>
      )}

      {templates.map((tpl, i) => {
        const isOpen = openIndex === i;
        return (
          <Card key={tpl.key}>
            <button
              type="button"
              className="flex w-full items-center justify-between p-6 text-left"
              onClick={() => setOpenIndex(isOpen ? null : i)}
            >
              <div className="flex items-center gap-3">
                <Mail className="h-5 w-5 text-muted-foreground" />
                <div>
                  <CardTitle className="text-base">{tpl.name}</CardTitle>
                  <p className="text-sm text-muted-foreground">Subject: {tpl.subject}</p>
                </div>
              </div>
              {isOpen ? (
                <ChevronUp className="h-5 w-5 text-muted-foreground" />
              ) : (
                <ChevronDown className="h-5 w-5 text-muted-foreground" />
              )}
            </button>
            {isOpen && (
              <CardContent className="space-y-4">
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Subject</label>
                  <Input
                    value={tpl.subject}
                    onChange={(e) => updateField(i, "subject", e.target.value)}
                    placeholder="Email subject line"
                  />
                </div>
                <div className="space-y-2">
                  <label className="text-sm font-medium text-muted-foreground">Body (HTML)</label>
                  <Textarea
                    value={tpl.body}
                    onChange={(e) => updateField(i, "body", e.target.value)}
                    rows={12}
                    placeholder="Email body (HTML)"
                    className="font-mono text-xs"
                  />
                </div>
                <div className="flex items-center justify-end gap-3 pt-2">
                  <Button
                    variant="default"
                    size="sm"
                    disabled={saving === tpl.key}
                    onClick={() => handleSave(tpl)}
                  >
                    <Save className="h-4 w-4" aria-hidden />
                    {saving === tpl.key ? "Saving..." : "Save"}
                  </Button>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
