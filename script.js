/*--------------------------DESTAQUE NO MENU AO ROLAR A PÁGINA-----------------------------*/

document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  let atual = "";

  /*--------------------------Verifica em qual seção o usuário está-----------------------------*/

  sections.forEach((sec) => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 200;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      atual = id; //guarda qual seção o usuario esta
    }
  });

  //atualiza o menu com a classe "ativo"
  navLinks.forEach((link) => {
    link.classList.remove("ativo");
    if (link.getAttribute("href") === "#" + atual) {
      link.classList.add("ativo");
    }
  });
});

/*-------------------------SIMULAÇÃO DE IRRIGAÇÃO AUTOMÁTICA --------------------------------*/

const umidadeSpan = document.getElementById("umidade");
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("status");
const botao = document.getElementById("iniciarBtn");

if (botao && umidadeSpan && progressBar && statusText) {
  botao.addEventListener("click", () => {
    let umidade = 0;
    statusText.textContent = "Status: Medindo umidade do solo...";
    botao.disabled = true;
    botao.textContent = "Simulando...";

    const intervalo = setInterval(() => {
      umidade = Math.min(umidade + Math.floor(Math.random() * 10), 100);
      umidadeSpan.textContent = umidade;
      progressBar.style.width = umidade + "%";

      if (umidade < 30) {
        progressBar.style.backgroundColor = "rgba(231, 76, 60, 1)";
        statusText.textContent = "Umidade baixa — irrigação ativada 💧";
      } else if (umidade < 70) {
        progressBar.style.backgroundColor = "rgba(241, 196, 15, 1)";
        statusText.textContent = "Umidade moderada — irrigação parcial 💦";
      } else {
        progressBar.style.backgroundColor = "rgba(39, 174, 96, 1)";
        statusText.textContent = "Solo úmido — irrigação desligada ✅";
      }

      if (umidade >= 100) {
        clearInterval(intervalo);
        botao.disabled = false;
        botao.textContent = "Reiniciar Simulação 🔄";
        statusText.textContent = "Simulação concluída ✔️";
      }
    }, 800);
  });
}

/* ------------------- GIRAR CARD NO CLIQUE ------------------ */

document.querySelectorAll(".card-flip").forEach(card => {
  card.addEventListener("click", () => {
    card.classList.toggle("girar");
  });
});
