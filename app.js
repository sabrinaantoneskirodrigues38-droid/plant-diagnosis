const input = document.getElementById("imageInput");
const button = document.getElementById("analyzeButton");
const result = document.getElementById("result");

// 🔗 seu link do Replit aqui:
const REPL_URL = "https://09d4486b-9965-4e35-80e3-44d4196352be-00-1m28kvmi84fo2.spock.replit.dev";

button.addEventListener("click", async () => {
  if (!input.files || input.files.length === 0) {
    result.textContent = "Por favor, envie uma imagem!";
    return;
  }

  const file = input.files[0];
  const formData = new FormData();
  formData.append("image", file);

  result.innerText = "🔍 Enviando imagem para análise... aguarde.";

  try {
    const resp = await fetch(`${REPL_URL}/diagnose`, {
      method: "POST",
      body: formData
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Erro API:", resp.status, text);
      result.innerText = "Erro ao analisar a imagem.";
      return;
    }

    const data = await resp.json();

    if (data && data.result) {
      const r = data.result;
      if (r.raw) {
        result.innerText = r.raw;
      } else {
        result.innerHTML = `
          <strong>🌱 Doença:</strong> ${r.disease || "—"}<br/>
          <strong>🔎 Confiança:</strong> ${r.confidence || "—"}<br/>
          <strong>💡 Recomendação:</strong> ${r.recommendation || "—"}
        `;
      }
    } else {
      result.innerText = "❌ Nenhum resultado retornado da API.";
    }

  } catch (err) {
    console.error("Erro:", err);
    result.innerText = "⚠️ Erro ao conectar com a API.";
  }
});
