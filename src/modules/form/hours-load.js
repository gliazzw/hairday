import { openingHours } from "../../utils/opening-hours.js";
import dayjs, { Dayjs } from "dayjs";
import { hoursClick } from "./hours-click.js";

const hours = document.getElementById("hours");

export function hoursLoad({ date, dailySchedules  }) {
  //limpa a lista de horários 
  hours.innerHTML = ""

  //obtem a lista de todos os horários ocupados
  const unavailableHours = dailySchedules.map((schedule) => dayjs(schedule.when).format("HH:mm"))



  const opening = openingHours.map((hour) => {
    // recupera somente a hora
    const [scheduleHour] = hour.split(":");

    // adiciona a hora na data e verifica se está no passado
    const isHourPast = dayjs(date).add(scheduleHour, "hour").isBefore(dayjs());

    const available = !unavailableHours.includes(hour) && !isHourPast

    return {
      hour,
      available
    };
  });

  // renderiza os horários
  opening.forEach(({ hour, available }) => {
    const li = document.createElement("li");

    li.classList.add("hour");
    li.classList.add(available ? "hour-available" : "hour-unavailable");

    li.textContent = hour;

    if (hour === "9:00") {
      hourHeaderAdd("Manhã");
    } else if (hour === "13:00") {
      hourHeaderAdd("Tarde");
    } else if (hour === "18:00") {
      hourHeaderAdd("Noite");
    }

    hours.appendChild(li);
  });

  // Adiciona o evento de clique nos horários disponíveis
  hoursClick();
}

function hourHeaderAdd(title) {
  const header = document.createElement("li");
  header.classList.add("hour-period");
  header.textContent = title;

  hours.append(header);
}
