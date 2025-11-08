// app.js - roda MobileNet no navegador e dá recomendações genéricas
const input = document.getElementById("imageInput");
const analyzeButton = document.getElementById("analyzeButton");
const preview = document.getElementById("preview");
const modelStatus = document.getElementById("modelStatus");
const predictionsDiv = document.getElementById("predictions");
const recommendationDiv = document.getElementById("recommendation");

let model = null;

// Mapa simples: palavras-chave nas classes -> recomendações genéricas
const mapping = [
  { keywords: ["leaf", "foliage", "plant"], text: "A imagem mostra características de folhas/plantas. Observe manchas, descoloração, ou presença de pó/bolor." },
  { keywords: ["fungus", "mildew", "mold", "fungus"], text: "Possível presença de fungos. Recomendação genérica: remover áreas afetadas, melhorar ventilação/irrigação, consultar agrônomo para tratamento fungicida adequado." },
  { keywords: ["rust"], text: "Pode indicar ferrugem (sinais alaranjados). Retire folhas afetadas e consulte controle fungicida." },
  { keywords: ["aphid", "insect", "worm", "beetle", "caterpillar"], text: "Possível ataque de pragas. Inspeção manual recomendada; controle mecânico ou consultar especialista antes de aplicar inseticida." },
  { keywords: ["powder", "mildew"], text: "Possível míldio/oidio (poeira branca). Remover, melhorar circulação de ar e buscar orientação técnica." },
  { keywords: ["flower"], text: "A imagem pode conter flores; se o problema for ornamental, verifique manchas nas pétalas ou sinais no caule." },
  { keywords: ["tree"], text: "Classe detectada como árvore — análise de folha isolada pode ter menos precisão. Verificar sintomas locais." },
];

// Carrega modelo
async function loadModel() {
  try {
    modelStatus.innerText = "carregando modelo (MobileNet)...";
    model = await mobilenet.load({ version: 2, alpha: 1.0 });
    modelStatus.innerText = "modelo carregado ✓";
    analyzeButton.disabled = false;
  } catch (err) {
    console.error("Erro ao carregar modelo:", err);
    modelStatus.innerText = "erro ao carregar modelo";
  }
}

loadModel();

// mostra preview
input.addEventListener("change", (evt) => {
  const file = evt.target.files && evt.target.files[0];
  if (!file) return;
  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.hidden = false;
  predictionsDiv.innerHTML = "";
  recommendationDiv.innerHTML = "";
});

// função que busca uma recomendação a partir das classes
function getRecommendationFromPreds(preds) {
  const names = preds.map(p => p.className.toLowerCase());
  // para cada mapping, se alguma palavra-chave aparecer em qualquer className -> retorna text
  for (const map of mapping) {
    for (const kw of map.keywords) {
      if (names.some(n => n.includes(kw))) {
        return map.text;
      }
    }
  }
  // fallback: use texto descritivo das top classes para guiar usuário
  const top = preds[0];
  return `Classe principal detectada: "${top.className}" (${(top.probability*100).toFixed(1)}%). Interprete essa descrição e, se houver manchas, necrose, ou sinais de pragas, consulte um agrônomo para diagnóstico preciso.`;
}

// analisar imagem ao clicar
analyzeButton.addEventListener("click", async () => {
  if (!model) {
    alert("Modelo ainda não carregado. Aguarde.");
    return;
  }
  if (!input.files || input.files.length === 0) {
    alert("Por favor, escolha uma imagem antes de analisar.");
    return;
  }

  analyzeButton.disabled = true;
  analyzeButton.innerText = "Analisando…";
  predictionsDiv.innerHTML = "";
  recommendationDiv.innerHTML = "";

  const file = input.files[0];
  // dimensionamento: cria um elemento img para o model
  const img = new Image();
  img.src = URL.createObjectURL(file);
  img.onload = async () => {
    try {
      // roda classificação (top 5)
      const preds = await model.classify(img, 5);
      // mostra resultados
      const listHtml = preds.map(p => {
        const percent = (p.probability * 100).toFixed(1);
        return `<div class="pred"><strong>${p.className}</strong> — ${percent}%</div>`;
      }).join("");
      predictionsDiv.innerHTML = listHtml;

      // montar recomendação
      const rec = getRecommendationFromPreds(preds);
      recommendationDiv.innerHTML = `<div style="padding:12px;border-radius:8px;background:#fff7e6;border:1px solid #ffdca8;"><strong>Recomendação genérica:</strong><div style="margin-top:8px">${rec}</div></div>`;

    } catch (err) {
      console.error("Erro durante classificação:", err);
      recommendationDiv.innerHTML = `<div class="warning">Erro ao classificar a imagem. Tente outra foto (boa luminosidade, foco na folha).</div>`;
    } finally {
      analyzeButton.disabled = false;
      analyzeButton.innerText = "Analisar imagem";
    }
  };

  img.onerror = () => {
    recommendationDiv.innerHTML = `<div class="warning">Não foi possível carregar a imagem. Tente outro arquivo.</div>`;
    analyzeButton.disabled = false;
    analyzeButton.innerText = "Analisar imagem";
  };
});
