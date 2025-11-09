/*--------------------------DESTAQUE NO MENU AO ROLAR A PÁGINA-----------------------------*/

document.addEventListener("scroll", () => {
  const sections = document.querySelectorAll("section");
    const navLinks = document.querySelectorAll("nav ul li a");
      let atual = "";

    /*--------------------------Verifica em qual seção o usuário está-----------------------------*/

    sections.forEach(sec => {
     const top = window.scrollY;
     const offset = sec.offsetTop - 200;
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
     const googleScriptURL = 'https://script.google.com/macros/s/AKfycbzr7qg_nMxMsbbRk2G17IoPX1r4oMB2ShklJNGct5da77BRxJg7pgahkfUbdHIHwQ1DjQ/exec'; 

     form.addEventListener("submit", (e) => {
     e.preventDefault(); // Impede envio automático

     // Coleta e validação
     const nome = form.nome.value.trim();
     const email = form.email.value.trim();
     const mensagem = form.mensagem.value.trim();

     if (!nome || !email || !mensagem) {
      alert("Por favor, preencha todos os campos!");
       return; // Sai da função se a validação falhar
     }

     // FormData coleta todos os campos do formulário
      const formData = new FormData(form);
     // Envia os dados para o Google Apps Script
      fetch(googleScriptURL, {
      method: 'POST', 
      body: formData 
     })
     .then(response => {
     // Se a resposta NÃO for OK (por exemplo, status 400 ou 500), lança o erro
      if (!response.ok) {
       throw new Error('Erro na rede ou no servidor do Apps Script: ' + response.statusText);
     } 
     // Se a resposta for OK, retorna o JSON (que será consumido pelo próximo .then)
      return response.json(); 
     })
     .then(data => {
     // Verifica se o Apps Script retornou sucesso (result: 'success')
      if (data.result === 'success') {
       alert("Mensagem enviada e salva com sucesso!");
       form.reset(); // limpa o campo
     }
     else {
      alert("Erro ao salvar dados no Google Sheets: " + data.message);
     }
     })
     .catch(error => {
      console.error('Erro de submissão:', error);
      alert("Ocorreu um erro ao tentar enviar a mensagem. Verifique a URL do script e as permissões.");
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
     } 
      else if (umidade < 70) {
      progressBar.style.backgroundColor = "rgba(241, 196, 15, 1)";
      statusText.textContent = "Umidade moderada — irrigação parcial 💦";
     }
      else {
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
                                                                                                                                                                                                                                                                                                                                                                                                                                                                            