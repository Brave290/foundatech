"use server";

import { revalidatePath } from "next/cache";
import { createAdminClient } from "@/lib/supabase/admin";

type UploadArgs = { bucket: "previews" | "team"; path: string; dataUrl: string; contentType: string };
type UploadResult = { url: string } | { error: string };

export async function uploadImage({ bucket, path, dataUrl, contentType }: UploadArgs): Promise<UploadResult> {
  try {
    const admin = createAdminClient();
    const base64 = dataUrl.split(",")[1];
    if (!base64) return { error: "Invalid file data" };
    const buf = Buffer.from(base64, "base64");
    const { error } = await admin.storage.from(bucket).upload(path, buf, {
      contentType,
      upsert: true,
      cacheControl: "31536000",
    });
    if (error) return { error: error.message };
    const { data: pub } = admin.storage.from(bucket).getPublicUrl(path);
    return { url: pub.publicUrl };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Upload failed" };
  }
}

export async function deleteProject(id: string) {
  const admin = createAdminClient();
  await admin.from("projects").delete().eq("id", id);
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function saveProject(data: Record<string, unknown>, id?: string) {
  const admin = createAdminClient();
  if (id) {
    const { error } = await admin.from("projects").update({ ...data, updated_at: new Date().toISOString() }).eq("id", id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await admin.from("projects").insert(data as never);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/projects");
  revalidatePath("/");
  revalidatePath("/projects");
}

export async function saveFounder(data: Record<string, unknown>) {
  const admin = createAdminClient();
  const { data: existing } = await admin.from("founder").select("id").maybeSingle();
  const payload = { ...data, updated_at: new Date().toISOString() };
  if (existing?.id) {
    const { error } = await admin.from("founder").update(payload).eq("id", existing.id);
    if (error) throw new Error(error.message);
  } else {
    const { error } = await admin.from("founder").insert(payload as never);
    if (error) throw new Error(error.message);
  }
  revalidatePath("/admin/founder");
  revalidatePath("/");
}

export async function saveSetting(key: string, value: unknown) {
  const admin = createAdminClient();
  const { error } = await admin.from("settings").upsert({ key, value, updated_at: new Date().toISOString() } as never);
  if (error) throw new Error(error.message);
  revalidatePath("/admin/settings");
  revalidatePath("/");
}

export async function moderateReview(id: string, status: "approved" | "rejected") {
  const admin = createAdminClient();
  if (status === "approved") {
    const { data: review } = await admin.from("reviews").select("*").eq("id", id).single();
    if (review) {
      await admin.from("testimonials").insert({
        quote: review.quote,
        author: review.name,
        role: null,
        source: "email",
        verified: true,
      });
    }
  }
  await admin.from("reviews").update({ status, verified_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/admin/reviews");
  revalidatePath("/testimonials");
  revalidatePath("/");
}

export async function updateLeadStatus(id: string, status: "replied" | "closed") {
  const admin = createAdminClient();
  await admin.from("contact_submissions").update({ status, replied_at: new Date().toISOString() }).eq("id", id);
  revalidatePath("/admin/leads");
}

export type SubmitContactResult = { ok: true } | { error: string };

export async function submitContact(name: string, email: string, message: string): Promise<SubmitContactResult> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("contact_submissions").insert({ name, email, message } as never);
    if (error) return { error: error.message };
    const { sendContactConfirmation } = await import("@/lib/email");
    await sendContactConfirmation(name, email);
    return { ok: true };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Submission failed" };
  }
}

export type SubmitReviewResult = { ok: true } | { error: string };

export async function submitReview(name: string, quote: string): Promise<SubmitReviewResult> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("reviews").insert({ name, quote } as never);
    if (error) return { error: error.message };
    return { ok: true };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Submission failed" };
  }
}

export type SubscribeResult = { ok: true } | { error: string };

export async function subscribe(email: string): Promise<SubscribeResult> {
  try {
    const { createClient } = await import("@/lib/supabase/server");
    const supabase = await createClient();
    const { error } = await supabase.from("subscribers").insert({ email } as never);
    if (error) {
      if (error.code === "23505") return { ok: true };
      return { error: error.message };
    }
    const { sendNewsletterWelcome } = await import("@/lib/email");
    await sendNewsletterWelcome(email);
    return { ok: true };
  } catch (e: unknown) {
    return { error: e instanceof Error ? e.message : "Subscription failed" };
  }
}
