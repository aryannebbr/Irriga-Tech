/*--------------------------DESTAQUE NO MENU AO ROLAR A PÁGINA-----------------------------*/

document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");

  let atual = "";

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      atual = id;
    }
  });

  navLinks.forEach(link => {
    link.classList.remove("ativo");
    if (link.getAttribute("href") === "#" + atual) {
      link.classList.add("ativo");
    }
  });
});

/*--------------------------VALIDAÇÃO DO FORMULÁRIO--------------------------------*/

const form = document.querySelector("form");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede envio automático para validação
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const msg = form.mensagem.value.trim();

  if (!nome || !email || !msg) {
    alert("Por favor, preencha todos os campos!");
    return;
  }

  alert("Mensagem enviada com sucesso!");
  form.reset();
});

/*--------------------------BOTÃO VOLTAR AO TOPO--------------------------------*/

const btnTopo = document.createElement("button");
btnTopo.innerText = "↑";
btnTopo.classList.add("btn-topo");
document.body.appendChild(btnTopo);

window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTopo.classList.add("visivel");
  } else {
    btnTopo.classList.remove("visivel");
  }
});

btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*--------------------------MODO CLARO/ESCURO--------------------------------*/

const toggleTema = document.createElement("button");
toggleTema.textContent ="🌘";
toggleTema.classList.add("tema-btn");
document.querySelector("header").appendChild(toggleTema);

toggleTema.addEventListener("click", () => {
   document.body.classList.toggle("dark-mode");
});
