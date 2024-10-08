// Função para remover tags HTML usando regex
function stripHtml(html) {
    return html.replace(/<\/?[^>]+(>|$)/g, "");
  }
  