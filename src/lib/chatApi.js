export async function chatApi(endpoint, messages) {
  const r = await fetch(endpoint, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ messages }),
  });
  if (!r.ok) throw new Error("Chat API failed");
  const data = await r.json();
  return data.reply;
}
