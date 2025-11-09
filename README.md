# 🔗 Integração do Formulário com o Google Sheets

Este repositório contém o código-fonte do formulário HTML/CSS/JS que se conecta com o Google Apps Script para salvar dados.

### 💾 Sobre a Persistência de Dados

Os dados inseridos pelos usuários no formulário são salvos diretamente em uma Planilha Google, que atua como nosso banco de dados.

* **Destino dos Dados (Google Sheet):** Os dados são enviados via API (Apps Script) para a planilha.
* **Link da Planilha:** [Planilha Google de Submissões](https://docs.google.com/spreadsheets/d/1D14ZF-UT5W2SVEJSPkjedMWF9_XLX0nREO8G6D-fj_eg/edit?usp=sharing)

* Aqui está o código inserido no AppScript para vincular o furmulário à planilha e, ao site:

/**
 * Função principal que é acionada por uma solicitação HTTP POST (envio do formulário).
 * Recebe os dados do formulário e os insere na planilha.
 *
 * @param {Object} e - Objeto de evento que contém os parâmetros (dados do formulário).
 */
function doPost(e) {
  // --- Configuração ---
  
  // Obtém a planilha ativa (a planilha vinculada a este script)
  var ss = SpreadsheetApp.getActiveSpreadsheet();
  // Obtém a primeira aba/folha da planilha. Se sua aba tiver outro nome, altere 'Sheet1'.
  var sheet = ss.getSheets()[0]; 
  
  // --- Processamento de Dados ---
  
  // Obtém os dados do formulário (as chaves são os atributos 'name' do HTML)
  var formValues = e.parameter;
  
  // Adiciona um carimbo de data/hora da submissão
  var timestamp = new Date();
  
  // Array com os valores a serem inseridos, na ordem das colunas da sua planilha.
  // **VERIFIQUE SE ESTA ORDEM CORRESPONDE ÀS SUAS COLUNAS!**
  var newRow = [
    timestamp,
    formValues.nome,      
    formValues.email,     
    formValues.mensagem, 
  ];

  // Insere a nova linha de dados no final da planilha
  sheet.appendRow(newRow);

  // --- Resposta ao Cliente (Seu JavaScript) ---
  
  // Cria uma resposta JSON de sucesso que seu JavaScript pode ler
  return ContentService.createTextOutput(JSON.stringify({
      result: 'success',
      message: 'Dados salvos com sucesso no Google Sheets.'
    }))
    .setMimeType(ContentService.MimeType.JSON);
}

/**
 * Função opcional para lidar com solicitações HTTP GET (acesso direto à URL do Apps Script).
 */
function doGet() {
  return ContentService.createTextOutput(
    'O Apps Script está ativo e aguardando submissões POST do seu formulário HTML.'
  ).setMimeType(ContentService.MimeType.TEXT);
}