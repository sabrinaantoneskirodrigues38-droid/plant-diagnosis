// IA simulada para diagnóstico de plantas 🌿

const input = document.getElementById("imageInput");
const button = document.getElementById("analyzeButton");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  if (!input.files[0]) {
    result.textContent = "Por favor, envie uma imagem da planta!";
    return;
  }

  // Mostra mensagem de análise
  result.innerHTML = "🔍 Analisando imagem com IA...";

  // Simula o tempo da análise (2 segundos)
  setTimeout(() => {
    const respostas = [
      "🌿 Diagnóstico: Mancha Preta — Recomendado aplicar fungicida à base de cobre.",
      "🍃 Diagnóstico: Míldio — Evite excesso de umidade e use calda bordalesa.",
      "🐛 Diagnóstico: Pulgões — Use óleo de neem ou sabão inseticida.",
      "☀️ Diagnóstico: Planta saudável! Nenhum sinal de doença.",
      "🍂 Diagnóstico: Ferrugem — Retire folhas afetadas e aplique fungicida preventivo."
    ];

    // Escolhe uma resposta aleatória
    const respostaAleatoria = respostas[Math.floor(Math.random() * respostas.length)];

    // Mostra o resultado final
    result.innerHTML = respostaAleatoria;
  }, 2000);
});
