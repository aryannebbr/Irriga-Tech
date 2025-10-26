/*--------------------------DESTAQUE NO MENU AO ROLAR A PÁGINA-----------------------------*/

document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
  const navLinks = document.querySelectorAll("nav ul li a");
  let atual = "";

/*--------------------------Verifica em qual seção o usuário está-----------------------------*/

  sections.forEach(sec => {
    const top = window.scrollY;
    const offset = sec.offsetTop - 150;
    const height = sec.offsetHeight;
    const id = sec.getAttribute("id");

    if (top >= offset && top < offset + height) {
      atual = id; //guarda qual seção o usuario esta
    }
  });

//atualiza o menu com a classe "ativo"
  navLinks.forEach(link => {
    link.classList.remove("ativo");
    if (link.getAttribute("href") === "#" + atual) {
      link.classList.add("ativo");
    }
  });
});

/*--------------------------VALIDAÇÃO DO FORMULÁRIO--------------------------------*/
const form = document.querySelector("form");
// ATENÇÃO: Substitua pelo link gerado após Implantação (Deploy) do Apps Script!
const googleScriptURL = 'https://script.google.com/macros/s/AKfycbzr7qg_nMxMsbbRk2G17IoPX1r4oMB2ShklJNGct5da77BRxJg7pgahkfUbdHIHwQ1DjQ/exec'; 

form.addEventListener("submit", (e) => {
    e.preventDefault(); // Impede envio automático

    // 1. Coleta e validação
    const nome = form.nome.value.trim();
    const email = form.email.value.trim();
    const mensagem = form.mensagem.value.trim();
    // Corrigi o erro de referência: deve ser form.mensagem, não apenas 'mensagem' 

    if (!nome || !email || !msg) {
        alert("Por favor, preencha todos os campos!");
        return; // Sai da função se a validação falhar
    }

    // 2. Prepara os dados para envio
    // O objeto FormData coleta todos os campos do formulário (usando seus atributos 'name')
    const formData = new FormData(form);

    // 3. Envia os dados para o Google Apps Script
    fetch(googleScriptURL, {
        method: 'POST',
        // O body deve ser o FormData para que o Apps Script receba corretamente
        body: formData 
    })
    .then(response => {
        // Verifica se a resposta HTTP é OK, antes de tentar ler o JSON
        if (!response.ok) {
            throw new Error('Erro na rede ou no servidor do Apps Script: ' + response.statusText);
        }
        return response.json();
    })
    .then(data => {
        // Verifica se o Apps Script retornou sucesso (result: 'success')
        if (data.result === 'success') {
            alert("Mensagem enviada e salva com sucesso!");
            form.reset(); // limpa o campo
        } else {
            alert("Erro ao salvar dados no Google Sheets: " + data.message);
        }
    })
    .catch(error => {
        console.error('Erro de submissão:', error);
        alert("Ocorreu um erro ao tentar enviar a mensagem. Verifique a URL do script e as permissões.");
    });
});

/*--------------------------BOTÃO VOLTAR AO TOPO--------------------------------*/

const btnTopo = document.createElement("button");
btnTopo.innerText = "↑";// icone botão
btnTopo.classList.add("btn-topo");
document.body.appendChild(btnTopo);

//mostra o botão ao rolar a pagina
window.addEventListener("scroll", () => {
  if (window.scrollY > 300) {
    btnTopo.classList.add("visivel");
  } else {
    btnTopo.classList.remove("visivel");
  }
});

//ação do clique - rolagem até o topo
btnTopo.addEventListener("click", () => {
  window.scrollTo({ top: 0, behavior: "smooth" });
});

/*--------------------------MODO CLARO/ESCURO--------------------------------*/

const toggleTema = document.createElement("button");
toggleTema.innerHTML = "🌙"; // Ícone inicial
toggleTema.classList.add("tema-btn");
document.body.appendChild(toggleTema);

// Define botão fixo 
toggleTema.style.position = "fixed";
toggleTema.style.top = "20px";
toggleTema.style.right = "25px";
toggleTema.style.zIndex = "1100";

// Evento de clique para alternar o tema 
toggleTema.addEventListener("click", () => {
  document.body.classList.toggle("dark-mode");

  //Altera o ícone conforme o modo
  if (document.body.classList.contains("dark-mode")) {
    toggleTema.innerHTML = "☀️"; // Sol → modo escuro ativo
  } else {
    toggleTema.innerHTML = "🌙"; // Lua → modo claro ativo
  }
});

// ======== SIMULAÇÃO DE IRRIGAÇÃO AUTOMÁTICA ========

const umidadeSpan = document.getElementById("umidade"); 
const progressBar = document.getElementById("progressBar");
const statusText = document.getElementById("status");
const botao = document.getElementById("iniciarBtn");

if (botao) {
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
        botao.textContent = "Reiniciar Simulação";
        statusText.textContent = "Simulação concluída ✔️";
      }
    }, 800);
  });
}
