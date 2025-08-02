async function sendMessage() {
  const input = document.getElementById("userInput").value.trim();
  const responseDiv = document.getElementById("response");

  if (!input) {
    responseDiv.innerText = "Введите сообщение.";
    return;
  }

  responseDiv.innerText = "Идёт генерация ответа...";

  try {
    const res = await fetch("https://api-inference.huggingface.co/models/mosaicml/mpt-7b-chat", {
      method: "POST",
      headers: {
        "Authorization": "Bearer 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",
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ inputs: input })
    });

    if (!res.ok) throw new Error("Ошибка запроса");
    const data = await res.json();

    responseDiv.innerText = data?.[0]?.generated_text || "Нет ответа.";
  } catch (e) {
    responseDiv.innerText = "Ошибка при подключении к ИИ.";
    console.error(e);
  }
}
