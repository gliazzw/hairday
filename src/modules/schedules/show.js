import dayjs from "dayjs";

// seleciona as sessões (manhã, tarde, noite)
const periodMorning = document.getElementById("period-morning")
const periodAfternoon = document.getElementById("period-afternoon")
const periodNight = document.getElementById("period-night")

export function schedulesShow({dailySchedules}) {
try {

  //limpa a lista
  periodMorning.innerHTML =  ""
  periodAfternoon.innerHTML = ""
  periodNight.innerHTML = ""


 //renderiza os agendamentos por período. 
  dailySchedules.forEach((schedule) => {
    const item = document.createElement("li")
    const time = document.createElement("span")
    const name = document.createElement("span")

    //adicionar o id do agendamento
    item.setAttribute("data-id", schedule.id)

    time.textContent = dayjs(schedule.when).format ("HH:mm")
    name.textContent = schedule.name

    //criar icone de cancelar 
    const cancelIcon = document.createElement("img")
    cancelIcon.classList.add("cancel-icon")
    cancelIcon.setAttribute("src", "./src/assets/cancel.svg")
    cancelIcon.setAttribute("alt", "Cancelar")

    //Adiciona o tempo, icone e nome no item
    item.append(time, name, cancelIcon)

    // obtem somente a hora
    const hour = dayjs(schedule.when).hour()

    // renderiza o agendamento na sessão (de forma condicional // => manhã, tarde OU noite)
    if(hour <= 12){
      periodMorning.appendChild(item)
    }else if(hour > 12 && hour <= 17){
      periodAfternoon.appendChild(item)
    }else {
      periodNight.appendChild(item)
    }

  })
} catch (error) {
  alert("Não foi possível exibir os agendamentos")
  console.log("error")
}
}