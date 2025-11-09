document.addEventListener("DOMContentLoaded", async () => {
  const input = document.getElementById("imageInput");
  const button = document.getElementById("analyzeButton");
  const result = document.getElementById("result");

  result.innerText = "🔄 Carregando modelo... aguarde.";

  try {
    const model = await mobilenet.load();
    result.innerText = "✅ Modelo carregado! Escolha uma imagem.";

    button.addEventListener("click", async () => {
      if (!input.files.length) {
        result.textContent = "Por favor, envie uma imagem!";
        return;
      }

      const file = input.files[0];
      const img = document.createElement("img");
      img.src = URL.createObjectURL(file);
      img.onload = async () => {
        const predictions = await model.classify(img);
        result.innerHTML = `<strong>🔎 Resultados:</strong><br>`;
        predictions.forEach(p => {
          result.innerHTML += `${p.className} — ${(p.probability * 100).toFixed(2)}%<br>`;
        });
      };
    });
  } catch (err) {
    console.error("Erro ao carregar modelo:", err);
    result.innerText = "⚠️ Erro ao carregar modelo.";
  }
});
