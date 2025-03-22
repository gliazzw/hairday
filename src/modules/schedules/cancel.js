import { schedulesDay } from "./load.js";
import { scheduleCancel } from "../../services/schedule-cancel.js";
const periods = document.querySelectorAll(".period");

// gera evento click para cada lista (manhã, tarde e noite)
periods.forEach((period) => {
  // captura o envento de clique na lista
  period.addEventListener("click", async (event) => {
    if (event.target.classList.contains("cancel-icon")) {
      // obtém a li pai do elemento cl1icado
      const item = event.target.closest("li");
      const { id } = item.dataset;

      if (id) {
        const isConfirm = confirm("Deseja cancelar esse agendamento?");

        if (isConfirm) {
          await scheduleCancel({ id });
          schedulesDay();
        }
      }
    }
  });
});
