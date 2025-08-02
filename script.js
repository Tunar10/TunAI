const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";
const HF_TOKEN = "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"; // 👈 сюда вставь свой API токен

async function sendMessage() {
  const input = document.getElementById("input").value;
  const responseDiv = document.getElementById("response");
  responseDiv.textContent = "⏳ Генерация ответа...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Authorization": `Bearer ${HF_TOKEN}`,
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: input })
    });

    if (!res.ok) {
      const err = await res.json();
      throw new Error(err.error || "Ошибка от Hugging Face");
    }

    const data = await res.json();
    responseDiv.textContent = data[0]?.generated_text || "⚠️ Нет ответа.";
  } catch (err) {
    responseDiv.textContent = "❌ Ошибка: " + err.message;
  }
}
