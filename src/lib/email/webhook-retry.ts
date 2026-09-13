export interface WebhookRetryItem {
  id: string;
  payload: unknown;
  attempt: number;
  maxAttempts: number;
  nextRetryAt: string;
  createdAt: string;
}

export async function retryWebhook(payload: unknown, attempt: number): Promise<void> {
  const maxAttempts = 3;

  if (attempt >= maxAttempts) {
    console.error(`[webhook-retry] Max attempts (${maxAttempts}) reached for payload:`, payload);
    return;
  }

  const nextAttempt = attempt + 1;
  const delayMs = Math.pow(2, attempt) * 1000;

  console.log(
    `[webhook-retry] Attempt ${attempt}/${maxAttempts}. Retrying in ${delayMs}ms...`
  );

  await new Promise((resolve) => setTimeout(resolve, delayMs));

  console.log(`[webhook-retry] Executing attempt ${nextAttempt}...`);

  // TODO: Re-invoke the actual webhook handler here
  // e.g., await processWebhook(payload);
}
