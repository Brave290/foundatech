"use client";

import { useState } from "react";
import { Card, CardHeader, CardContent, CardTitle } from "@/components/ui/card";
import { ChevronDown, ChevronUp, Mail } from "lucide-react";

interface Template {
  name: string;
  subject: string;
  body: string;
}

const templates: Template[] = [
  {
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
  {
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
  {
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
  {
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
];

export function EmailTemplates() {
  const [openIndex, setOpenIndex] = useState<number | null>(null);

  return (
    <div className="space-y-4">
      {templates.map((tpl, i) => {
        const isOpen = openIndex === i;
        return (
          <Card key={i}>
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
              {isOpen ? <ChevronUp className="h-5 w-5 text-muted-foreground" /> : <ChevronDown className="h-5 w-5 text-muted-foreground" />}
            </button>
            {isOpen && (
              <CardContent>
                <div className="rounded-md border bg-muted/30 p-4">
                  <pre className="whitespace-pre-wrap font-mono text-xs leading-relaxed text-muted-foreground">
                    {tpl.body}
                  </pre>
                </div>
              </CardContent>
            )}
          </Card>
        );
      })}
    </div>
  );
}
