const db = require("../models/init");

exports.getAllEvents = (req, res) => {
  db.all("SELECT * FROM events", (err, rows) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(rows);
  });
};

exports.getEventById = (req, res) => {
  const id = req.params.id;
  db.get("SELECT * FROM events WHERE id = ?", [id], (err, row) => {
    if (err) return res.status(500).json({ error: err.message });
    res.json(row);
  });
};

exports.createEvent = (req, res) => {
  const { name, description, platform, date } = req.body;
  db.run("INSERT INTO events (name, description, platform, date) VALUES (?, ?, ?, ?)",
    [name, description, platform, date], function (err) {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ id: this.lastID });
    });
};

exports.updateEvent = (req, res) => {
  const { id } = req.params;
  const { name, description, platform, date, closed } = req.body;
  db.run(`UPDATE events SET name = ?, description = ?, platform = ?, date = ?, closed = ? WHERE id = ?`,
    [name, description, platform, date, closed, id], err => {
      if (err) return res.status(500).json({ error: err.message });
      res.json({ message: "Evento atualizado" });
    });
};

exports.deleteEvent = (req, res) => {
  const { id } = req.params;
  db.run("DELETE FROM events WHERE id = ?", [id], err => {
    if (err) return res.status(500).json({ error: err.message });
    res.json({ message: "Evento deletado" });
  });
};

exports.subscribeToEvent = (req, res) => {
  const { eventId } = req.params;
  const userId = req.user.id;

  db.get("SELECT * FROM registrations WHERE user_id = ? AND event_id = ?", [userId, eventId], (err, row) => {
    if (row) return res.status(400).json({ error: "Já inscrito" });

    db.run("INSERT INTO registrations (user_id, event_id) VALUES (?, ?)", [userId, eventId], err => {
      if (err) return res.status(500).json({ error: err.message });
      res.status(201).json({ message: "Inscrição realizada" });
    });
  });
};
