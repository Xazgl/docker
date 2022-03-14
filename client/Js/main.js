function $(selector) {
    return document.querySelector(selector) // $ заместо document.querySelector(selector)
}


EventTarget.prototype.on = function (eventName, callback) {
    this.addEventListener(eventName, callback) // теперь пишется on заместо EventTarget
}


const body = document.querySelector('body')
const btnBegin= $('.btn-main')
const modalBackground= $('.modalBackground');
const modalWindow = $('.modalWindow');
const formRequest = $('#submit-form')

formRequest.onsubmit = function(event) {
    event.preventDefault()
    const formdata = {
        name: formRequest[0].value,
        phone: formRequest[1].value,
    }
    fetch('/send', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(formdata)
    }).then(res => {
        if (res.ok) {
            closeModal()
        }
    })
}


btnBegin.on('click' , () => {
    modalBackground.classList.add('modalBackground_show')
    body.classList.add('disable-scroll')
})

function closeModal() {

    modalBackground.classList.add('modalBackground_close-starting'); // повеси лкласс закрытия анимации

    function animationRemove() {
        modalBackground.classList.remove('modalBackground_close-starting');
        modalBackground.classList.remove('modalBackground_show');
        body.classList.remove('disable-scroll')
        // Удаляем слушатель (нужно передать именно ту же функцию, что и в addEventListenter)
        modalBackground.removeEventListener('animationend',animationRemove)
    }
    // Вешаем слушатель через addEventListenter
    modalBackground.on('animationend',animationRemove);
}


$('#close-modal').on('click',closeModal)
modalBackground.on('click', (event) => {
    if(event.target ===  modalBackground) closeModal()
})


const btnBegin2= $('.btn2')


btnBegin2.on('click' , () => {
    modalBackground.classList.add('modalBackground_show')
    body.classList.add('disable-scroll')
})



const video =document.getElementById('video')
let play = false
video.addEventListener('mouseenter', event => {
    video.play()
})

video.addEventListener('mouseleave', event => {
    video.pause()
})


let phoneMask = document.getElementById('phone');
    let maskOptions = {
        mask:'+{7}(000)000-00-00',

    }
    let mask = new IMask(phoneMask, maskOptions)



