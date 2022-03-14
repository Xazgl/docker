/* Аккоридон 1*/
const accordion = document.getElementById('acc')
const text = document.querySelectorAll('.panel')
const background = document.getElementById('leftColumn')

accordion.addEventListener('click', function(event) {
    if(event.target.tagName === 'H3') {    //если при нажатии на элемент h3
        const dataId = event.target.dataset.id
        if (dataId) {
            background.style.backgroundImage= `url(images/vx/acc_1/${dataId}.webp)`
        }
        let selectFlag = false             //создается флаг
        // если при нажатии соседний элемент имеет класс show , то флаг + и ничего
        if(event.target.nextElementSibling.classList.contains('panel_show'))  {
            selectFlag = true
        }
        text.forEach(text => {             //дальше после нажатия на всех элементах text убираем класс show
            text.classList.remove('panel_show')
        })

        // если при нажатии флаг не равен true то на соседний элемент от нажатого вешается  show
        if(!selectFlag) {
            event.target.nextElementSibling.classList.add('panel_show')
        }
    }
})




/* Аккоридон 2*/
const accordion2 = document.getElementById('acc2')

const background2 = document.getElementById('leftColumn2')

accordion2.addEventListener('click', function(event) {
    if(event.target.tagName === 'H3') {    //если при нажатии на элемент h3
        const dataId = event.target.dataset.id
        if (dataId) {
            background2.style.backgroundImage= `url(images/vx/acc_2/${dataId}.webp)`
        }
        let selectFlag = false             //создается флаг
        // если при нажатии соседний элемент имеет класс show , то флаг + и ничего
        if(event.target.nextElementSibling.classList.contains('panel_show'))  {
            selectFlag = true
        }
        text.forEach(text => {             //дальше после нажатия на всех элементах text убираем класс show
            text.classList.remove('panel_show')
        })

        // если при нажатии флаг не равен true то на соседний элемент от нажатого вешается  show
        if(!selectFlag) {
            event.target.nextElementSibling.classList.add('panel_show')
        }
    }
})






/* Аккоридон 3*/
const accordion3 = document.getElementById('acc3')

const background3 = document.getElementById('leftColumn3')

accordion3.addEventListener('click', function(event) {
    if(event.target.tagName === 'H3') {    //если при нажатии на элемент h3
        const dataId = event.target.dataset.id
        if (dataId) {
            background3.style.backgroundImage= `url(images/vx/acc_3/${dataId}.webp)`
        }
        let selectFlag = false             //создается флаг
        // если при нажатии соседний элемент имеет класс show , то флаг + и ничего
        if(event.target.nextElementSibling.classList.contains('panel_show'))  {
            selectFlag = true
        }
        text.forEach(text => {             //дальше после нажатия на всех элементах text убираем класс show
            text.classList.remove('panel_show')
        })

        // если при нажатии флаг не равен true то на соседний элемент от нажатого вешается  show
        if(!selectFlag) {
            event.target.nextElementSibling.classList.add('panel_show')
        }
    }
})






/* Аккоридон 4*/
const accordion4 = document.getElementById('acc4')

const background4 = document.getElementById('leftColumn4')

accordion4.addEventListener('click', function(event) {
    if(event.target.tagName === 'H3') {    //если при нажатии на элемент h3
        const dataId = event.target.dataset.id
        if (dataId) {
            background4.style.backgroundImage= `url(images/vx/acc_4/${dataId}.webp)`
        }
        let selectFlag = false             //создается флаг
        // если при нажатии соседний элемент имеет класс show , то флаг + и ничего
        if(event.target.nextElementSibling.classList.contains('panel_show'))  {
            selectFlag = true
        }
        text.forEach(text => {             //дальше после нажатия на всех элементах text убираем класс show
            text.classList.remove('panel_show')
        })

        // если при нажатии флаг не равен true то на соседний элемент от нажатого вешается  show
        if(!selectFlag) {
            event.target.nextElementSibling.classList.add('panel_show')
        }
    }
})






const video =document.getElementById('video')
    let play = false
    video.addEventListener('mouseenter', event => {
    video.play()
})
    video.addEventListener('mouseleave', event => {
    video.pause()
})





// маска дял телефона
let phoneMask = document.getElementById('phone');
let maskOptions = {
    mask:'+{7}(000)000-00-00',

}
let mask = new IMask(phoneMask, maskOptions)


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
const formRequest = $('#submit-formVX')

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

