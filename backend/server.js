const express = require("express");
const cors = require("cors");
const path = require("path");
const routes = require("./routes");

const app = express();
app.use(cors());
app.use(express.json());

// Rotas da API
app.use("/api", routes);

// Servir frontend
app.use("/", express.static(path.join(__dirname, "../frontend")));
app.get("*", (req, res) => {
  res.sendFile(path.join(__dirname, "../frontend/index.html"));
});

const PORT = 3000;
app.listen(PORT, () => console.log(`Servidor rodando na porta ${PORT}`));
