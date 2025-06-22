const jwt = require("jsonwebtoken");

exports.user = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token necessário" });

  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    req.user = decoded;
    next();
  });
};

exports.admin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) return res.status(403).json({ error: "Token necessário" });

  jwt.verify(token, "secreto", (err, decoded) => {
    if (err) return res.status(403).json({ error: "Token inválido" });
    if (decoded.role !== "admin") return res.status(403).json({ error: "Acesso restrito a administradores" });
    req.user = decoded;
    next();
  });
};
