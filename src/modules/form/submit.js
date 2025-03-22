import dayjs from "dayjs"

import {scheculeNew} from "../../services/schedule-new.js"
import {schedulesDay} from "../schedules/load.js"

const form = document.querySelector("form")
const clientName = document.getElementById("client")
const selectedDate = document.getElementById("date")

// data atual para o input
const inputToday = dayjs(new Date()).format("YYYY-MM-DD")

// carrega a data atual
selectedDate.value = inputToday

// define a data mínima como sendo a data atual
selectedDate.min = inputToday

form.onsubmit = async (event) => {
  //previne que o navegador carregue ao enviar o formulário
  event.preventDefault()

  try {
    //recuperando o nome do cliente
    const name = clientName.value.trim()

    //recuperando horário selecionado
    const hourSelected = document.querySelector(".hour-selected")

    // recuperando horário selecionado
    if(!hourSelected){
      return alert ("Selecione a hora")
    }

    // recuperar somente a hora
    const [hour] = hourSelected.innerText.split(":")
    
    //insere a hora na data
    const when = dayjs (selectedDate.value).add(hour, "hour") 
    
    // gera um ID
    const id = new Date().getTime()

    // faz o agendamento
    await scheculeNew({
      id,
      name,
      when,
    })
     // recarrega os agendamentos. 
    await schedulesDay()
    
    //limpa o input de nome do cliente
    clientName.value = ""
  } catch (error) {
    alert("Não foi possível realizar o agendamento")
    console.log(error)
  }
}