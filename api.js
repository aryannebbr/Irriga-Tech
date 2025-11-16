/*--------------------------VALIDAÇÃO DO FORMULÁRIO--------------------------------*/
const form = document.querySelector("form");
const googleScriptURL =
  "https://script.google.com/macros/s/AKfycbzr7qg_nMxMsbbRk2G17IoPX1r4oMB2ShklJNGct5da77BRxJg7pgahkfUbdHIHwQ1DjQ/exec";

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Impede envio automático

  // Coleta e validação
  const nome = form.nome.value.trim();
  const email = form.email.value.trim();
  const mensagem = form.mensagem.value.trim();
  // Corrigi o erro de referência: deve ser form.mensagem, não apenas 'mensagem'

  if (!nome || !email || !mensagem) {
    alert("Por favor, preencha todos os campos!");
    return; // Sai da função se a validação falhar
  }

  // FormData coleta todos os campos do formulário
  const formData = new FormData(form);

  // Envia os dados para o Google Apps Script
  fetch(googleScriptURL, {
    method: "POST",
    body: formData,
  })
    .then((response) => {
      // Verifica se a resposta HTTP é OK, antes de tentar ler o JSON
      if (!response.ok) {
        throw new Error(
          "Erro na rede ou no servidor do Apps Script: " + response.statusText
        );
      }
      return response.json();
    })
    .then((data) => {
      // Verifica se o Apps Script retornou sucesso (result: 'success')
      if (data.result === "success") {
        alert("Mensagem enviada e salva com sucesso!");
        form.reset(); // limpa o campo
      } else {
        alert("Erro ao salvar dados no Google Sheets: " + data.message);
      }
    })
    .catch((error) => {
      console.error("Erro de submissão:", error);
      alert(
        "Ocorreu um erro ao tentar enviar a mensagem. Verifique a URL do script e as permissões."
      );
    });
});
