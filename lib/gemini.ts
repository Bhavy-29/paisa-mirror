export async function callGemini(prompt: string): Promise<string> {
  const res = await fetch("/api/persona", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini call failed: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.text as string;
}

export async function callGeminiJSON<T>(prompt: string): Promise<T> {
  const res = await fetch("/api/persona", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ prompt, json: true })
  });

  if (!res.ok) {
    const errorText = await res.text();
    throw new Error(`Gemini JSON call failed: ${res.status} ${errorText}`);
  }

  const data = await res.json();
  return data.parsed as T;
}