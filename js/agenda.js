const bookButton = document.getElementById("book-button");
const bookingForm = document.getElementById("booking-form");


bookButton.addEventListener("click", function () {
  // Exibe o formulário quando o botão é clicado
  bookingForm.style.display = "block";
});

const submitButton = document.getElementById("submit-button");
submitButton.addEventListener("click", function () {
  // Adicione aqui o código JavaScript para processar o formulário de agendamento
  displayModernAlert("Horario marcado com sucesso!");
});

function displayModernAlert(message) {
  const modernAlert = document.createElement("div");
  modernAlert.classList.add("modern-alert");
  modernAlert.textContent = message;
  document.body.appendChild(modernAlert);

  setTimeout(() => {
    modernAlert.style.opacity = "0";
    setTimeout(() => {
      document.body.removeChild(modernAlert);
      // Redireciona para outra página após o alerta
      window.location.href = "../index.html";
    }, 300);
  }, 2000);
}