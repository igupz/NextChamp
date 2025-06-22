const db = require("../models/init");
const jwt = require("jsonwebtoken");

exports.login = (req, res) => {
  const { username, password } = req.body;
  db.get("SELECT * FROM users WHERE username = ? AND password = ?", [username, password], (err, user) => {
    if (user) {
      const token = jwt.sign({ id: user.id, role: user.role }, "secreto", { expiresIn: "1h" });
      res.json({ token });
    } else {
      res.status(401).json({ error: "Credenciais inválidas" });
    }
  });
};

exports.register = (req, res) => {
  const { username, password, email, nickname, birthdate, platform } = req.body;
  db.run("INSERT INTO users (username, password, email, nickname, birthdate, platform) VALUES (?, ?, ?, ?, ?, ?)", 
    [username, password, email, nickname, birthdate, platform],
    err => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Usuário criado com sucesso" });
    });
};
