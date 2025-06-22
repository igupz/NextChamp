const API_URL = "http://localhost:3000/api";
const token = localStorage.getItem("token");

function login() {
  const username = document.getElementById("username").value;
  const password = document.getElementById("password").value;

  fetch(`${API_URL}/users/login`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ username, password }),
  })
    .then(res => res.json())
    .then(data => {
      if (data.token) {
        localStorage.setItem("token", data.token);
        window.location.href = "home.html";
      } else {
        alert("Login inválido");
      }
    });
}

function register() {
  const data = {
    username: document.getElementById("username").value,
    password: document.getElementById("password").value,
    email: document.getElementById("email").value,
    nickname: document.getElementById("nickname").value,
    birthdate: document.getElementById("birthdate").value,
    platform: document.getElementById("platform").value,
  };

  fetch(`${API_URL}/users/register`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(data),
  })
    .then(res => res.json())
    .then(() => {
      alert("Cadastro realizado!");
      window.location.href = "index.html";
    });
}

function logout() {
  localStorage.removeItem("token");
  window.location.href = "index.html";
}

function toggleMenu() {
  const menu = document.getElementById("sideMenu");
  menu.style.display = menu.style.display === "block" ? "none" : "block";
}

function carregarEventos() {
  fetch(`${API_URL}/events`)
    .then(res => res.json())
    .then(eventos => {
      const container = document.getElementById("eventos-container");
      eventos.forEach(evento => {
        const div = document.createElement("div");
        div.className = "evento-card";
        div.innerHTML = `
          <h3>${evento.name}</h3>
          <p>${evento.description}</p>
          <p><strong>Data:</strong> ${evento.date}</p>
          <p><strong>Plataforma:</strong> ${evento.platform}</p>
          <a href="evento.html?id=${evento.id}">
            <button ${evento.closed ? "disabled class='disabled'" : ""}>
              ${evento.closed ? "Encerrado" : "Ver mais"}
            </button>
          </a>
        `;
        container.appendChild(div);
      });
    });
}

function carregarEventoDetalhado() {
  const id = new URLSearchParams(window.location.search).get("id");
  fetch(`${API_URL}/events/${id}`)
    .then(res => res.json())
    .then(evento => {
      document.getElementById("eventoNome").textContent = evento.name;
      document.getElementById("eventoDescricao").textContent = evento.description;
      document.getElementById("eventoPlataforma").textContent = evento.platform;
      document.getElementById("eventoData").textContent = evento.date;
      if (evento.closed) {
        document.getElementById("btnInscrever").disabled = true;
        document.getElementById("btnInscrever").textContent = "Evento Encerrado";
      }
    });
}

function inscreverEvento() {
  const id = new URLSearchParams(window.location.search).get("id");

  fetch(`${API_URL}/events/subscribe/${id}`, {
    method: "POST",
    headers: {
      "Authorization": `Bearer ${token}`,
    },
  })
    .then(res => res.json())
    .then(data => {
      alert(data.message || "Inscrição realizada!");
    });
}

// Carregamento automático
if (window.location.pathname.endsWith("home.html")) carregarEventos();
if (window.location.pathname.endsWith("evento.html")) carregarEventoDetalhado();
