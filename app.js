const input = document.getElementById("imageInput");
const button = document.getElementById("analyzeButton");
const result = document.getElementById("result");

button.addEventListener("click", () => {
  if (!input.files[0]) {
    result.textContent = "Por favor, envie uma imagem!";
    return;
  }

  const file = input.files[0];
  const reader = new FileReader();

  reader.onload = function() {
    result.innerHTML = `<p>Imagem carregada! (Simulação de análise...)</p>
                        <img src="${reader.result}" width="200" />`;
  };

  reader.readAsDataURL(file);
});
