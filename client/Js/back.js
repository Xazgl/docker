function $(selector) {
  return document.querySelector(selector) // $ заместо document.querySelector(selector)
}


EventTarget.prototype.on = function (eventName, callback) {
  this.addEventListener(eventName, callback) // теперь пишется on заместо EventTarget
}

const formRequestReg = $('#formReg')
formRequestReg.onsubmit = function(event) {
    event.preventDefault() //убираем отправку изначальную на кнопку
    const login = formRequestReg[0].value
    const pass = formRequestReg[1].value
    try {
        fetch('/reg',{
           method:'POST',
           headers:{
              'Content-Type':'application/json'
           },
           body: JSON.stringify({login, pass})
        })
    }catch{
       res.status(500).send({message:"Ошибка сервера"})
    }
}




















/*
const form =  $('#formReg')
form.onsubmit = function(event) {
    event.preventDefault() //убираем отправку изначальную на кнопку
    const account = {
      login: form[0].value,
      pass: form[1].value,
    }
    try {
        fetch('/reg',{
           method:'POST',
           headers:{
              'Content-Type':'application/json'
           },
           body: JSON.stringify(account)
        })
    }catch{
       res.status(500).send({message:"Ошибка сервера"})
    }
}
*/