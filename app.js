<!DOCTYPE html>
<html lang="pt-BR">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Analisador de Plantas</title>
</head>
<body>
  <h1>🌿 Diagnóstico de Plantas com IA</h1>

  <!-- Campo para enviar a imagem -->
  <input type="file" id="imageInput" accept="image/*" />
  <button id="analyzeButton">Analisar</button>

  <!-- Área onde aparecerá o resultado -->
  <div id="result">Aguardando carregamento...</div>

  <!-- TensorFlow e MobileNet -->
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow/tfjs@4.12.0/dist/tf.min.js"></script>
  <script src="https://cdn.jsdelivr.net/npm/@tensorflow-models/mobilenet@2.2.2/dist/mobilenet.min.js"></script>

  <!-- Seu script -->
  <script src="app.js"></script>
</body>
</html>
