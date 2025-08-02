const API_URL = "https://api-inference.huggingface.co/models/mistralai/Mistral-7B-Instruct-v0.1";

async function sendMessage() {
  const input = document.getElementById("input").value;
  const responseDiv = document.getElementById("response");
  responseDiv.textContent = "Генерация ответа...";

  try {
    const res = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        inputs: input
      })
    });

    if (!res.ok) throw new Error("Ошибка запроса к ИИ");

    const data = await res.json();
    if (data.error) throw new Error(data.error);

    responseDiv.textContent = data[0]?.generated_text || "Нет ответа.";
  } catch (err) {
    responseDiv.textContent = "Ошибка: " + err.message;
  }
}
