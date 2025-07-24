document.addEventListener("keydown", function (event) {
  const currentFile = window.location.pathname.split("/").pop(); // ex: spiderman2.html
  const match = currentFile.match(/spiderman(\d+)\.html/);

  if (!match) return;

  const currentNumber = parseInt(match[1]);
  let nextNumber;

  if (event.key === "ArrowDown") {
    nextNumber = currentNumber + 1;
  } else if (event.key === "ArrowUp") {
    nextNumber = currentNumber - 1;
  }

  if (nextNumber >= 1) {
    const nextPage = `spiderman${nextNumber}.html`;

    // Verifica se o arquivo existe antes de redirecionar
    fetch(nextPage, { method: 'HEAD' })
      .then(response => {
        if (response.ok) {
          window.location.href = nextPage;
        } else {
          console.warn(`Página ${nextPage} não existe.`);
        }
      })
      .catch(() => {
        console.warn(`Erro ao tentar acessar ${nextPage}.`);
      });
  }
});
