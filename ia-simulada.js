const imageInput = document.getElementById('imageInput');
const preview = document.getElementById('preview');
const sendBtn = document.getElementById('sendBtn');
const statusEl = document.getElementById('status');
const resultCard = document.getElementById('resultCard');
const resultContent = document.getElementById('resultContent');
const newBtn = document.getElementById('newBtn');

let currentFile = null;

imageInput.addEventListener('change', () => {
  const file = imageInput.files[0];
  if (!file) return;
  currentFile = file;
  const url = URL.createObjectURL(file);
  preview.src = url;
  preview.style.display = 'block';
  sendBtn.disabled = false;
  statusEl.textContent = '';
});

sendBtn.addEventListener('click', async () => {
  if (!currentFile) return;
  sendBtn.disabled = true;
  statusEl.textContent = 'Analisando imagem... (simulação)';

  // Simulação: vamos "adiar" 1.5s como se tivesse processando
  await new Promise(r => setTimeout(r, 1500));

  // Simulação simples de diagnóstico baseada em tamanho da imagem (apenas exemplo)
  const fakeScore = Math.random(); // 0 a 1
  let classe, conf, diagnosis, treatment;

  if (fakeScore < 0.35) {
    classe = 'Saudável';
    conf = 0.90 * fakeScore + 0.1; // só pra variar
    diagnosis = 'Planta parece saudável.';
    treatment = 'Nenhuma ação necessária. Monitore semanalmente.';
  } else if (fakeScore < 0.7) {
    classe = 'Mancha foliar';
    conf = 0.6 + 0.4 * Math.random();
    diagnosis = 'Possível mancha foliar (fungo/bactéria).';
    treatment = 'Remover folhas afetadas; evitar excesso de água; procure um técnico se piorar.';
  } else {
    classe = 'Oídio ou Míldio';
    conf = 0.6 + 0.4 * Math.random();
    diagnosis = 'Possível oídio/míldio (pó branco ou manchas).';
    treatment = 'Melhorar ventilação; aplicar medidas culturais; se necessário, consulte um agrônomo para fungicida adequado.';
  }

  // Se confiança baixa, avisa para validar com técnico
  if (conf < 0.55) {
    diagnosis += ' (confiança baixa — validar com um especialista).';
  }

  resultContent.innerHTML = `
    <div class="result-item"><strong>Classe:</strong> ${classe}</div>
    <div class="result-item"><strong>Confiança:</strong> ${(conf).toFixed(2)}</div>
    <div class="result-item"><strong>Diagnóstico:</strong><br/>${diagnosis}</div>
    <div class="result-item"><strong>Tratamento sugerido:</strong><br/>${treatment}</div>
  `;
  resultCard.style.display = 'block';
  statusEl.textContent = '';
});

newBtn.addEventListener('click', () => {
  preview.src = '';
  preview.style.display = 'none';
  imageInput.value = '';
  currentFile = null;
  sendBtn.disabled = true;
  resultCard.style.display = 'none';
  statusEl.textContent = '';
});
