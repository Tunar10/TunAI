const API_KEY = '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';  // Вставь сюда свой токен Hugging Face

async function sendMessage() {
  const userInput = document.getElementById('userInput').value.trim();
  const responseDiv = document.getElementById('response');

  if (!userInput) {
    responseDiv.innerText = "Пожалуйста, введите вопрос.";
    return;
  }

  responseDiv.innerHTML = "⏳ TunAI думает...";

  try {
    const res = await fetch("https://api-inference.huggingface.co/models/gpt2", {
  method: "POST",
  headers: {
    "Content-Type": "application/json",
    "Authorization": `Bearer ${API_KEY}`
  },
  body: JSON.stringify({ inputs: userInput })
});


    if (!res.ok) {
      throw new Error(`Ошибка сервера: ${res.status}`);
    }

    const data = await res.json();

    let reply = "";

    if (Array.isArray(data) && data.length > 0) {
      reply = data[0].generated_text || "🤖 Нет ответа";
    } else if (data.generated_text) {
      reply = data.generated_text;
    } else {
      reply = "🤖 Нет ответа";
    }

    responseDiv.innerText = reply;

  } catch (err) {
    console.error(err);
    responseDiv.innerText = "⚠️ Ошибка при подключении к ИИ. Попробуйте позже.";
  }
}
