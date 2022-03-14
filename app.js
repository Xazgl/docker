const express = require("express")
require('dotenv').config()
const app = express();
const ClientModel = require('./client.model')
const UserModel = require('./user.model')
const sequelize = require('./db');
const nodemailer = require('nodemailer');
const bcrypt = require("bcryptjs/dist/bcrypt");
const bcryptjs = require("bcryptjs");
const jwtToken=require('jsonwebtoken');
const { redirect } = require("express/lib/response");
const port = process.env.PORT || 3000;
app.use(express.urlencoded({ extended: true }))
app.use(express.json())


function verifyToken(request,response,next) {
    const token = request.headers.authorization //берем из заголовка авторизацию
    if(token && token.length) {// если токен есть и его длинна больше 1
        //отделяем в заголовке от токена слово bearer и пробел после него и дальше с
       jwtToken.verify(token.replace(/bearer\s+/,''),process.env.secret,(error,decodedToken) => {
        if(error) {
            return response.status(401).send({status:"error token"})
        }
        request.user={id:decodedToken.id}
        next()
    })
    }else{
        res.status(401).send({stauts:"Неверный токен"}) 
    }
}

app.get('/clients', verifyToken, async (req, res) => {
    const clients = await ClientModel.findAll()
    res.send(clients)
})

//заявка в базе данных и отправка на почту 
app.post("/send", async function (request, response) {
    const {name, phone} = request.body
    try{
        //письмо
        let testEmailAccount = await nodemailer.createTestAccount()
        let transporter = nodemailer.createTransport({
            host: 'smtp.yandex.ru',
            port: 465,
          secure: true,
          auth: {
            user: 'UriyAPKOHT@yandex.ru',
            pass: 'hhioyggtvmasygyq',
          },
       })
          let result = await transporter.sendMail({
            from: '"Заявка на ТО" UriyAPKOHT@yandex.ru',
            to: 'UriyAPKOHT@yandex.ru,elizaveta.zhigunova@arkont.ru',
            subject: 'Заявка на ТО',
            text: `Заявка ТО от ${name} ${phone} с exeed-arkont.ru`,
            html:
            `Заявка ТО от ${name} ${phone} с exeed-arkont.ru`,
       }) 
        //регистрация в базу
        const clientSend = await ClientModel.create({
            name: name,
            phone: phone
        })
        response.send(clientSend);
    }catch(error){
        response.status(500).send({message:"Ошибка сервера"})
    }
})


app.post("/reg", async function (request, response) {
    const {login, pass} = request.body
    try {
        const passHash = await bcryptjs.hash(pass,10)
        const userByLogin = await UserModel.findOne ({ where: {login:login} }) // ищем совпадения  в базе 
          if(!userByLogin) {
            const admin = await UserModel.create({
              login: login,
              pass: passHash
            })
             response.send(admin);
         }else{
             response.status(400).send({message:'Такой пользователь уже сущ.'})
         }
    }catch(error){
        console.log(error)
        response.status(500).send({message:"Ошибка сервера"})
    }
})


app.post("/login", async(request,response) => {
      const {login, pass} = request.body
    try {
        const userByRegLogin = await UserModel.findOne({ where:{login:login} }) //ищется логин в базе
       if(userByRegLogin) {
         const plainedUser = userByRegLogin.get({plain:true}) // получаем из более сложного объекта более простой 
         if(await bcryptjs.compare(pass,plainedUser.pass)) // если при логине пароль захешируется и совпадет с уже захешерированным в базе 
            {
              const token=jwtToken.sign({id:plainedUser.id},process.env.secret,{expiresIn:"2 days"})
              response.send({token}) //токен
            //   if(response.ok) {
            //       redirect("/clients.html")
            //   }
             
            }else{
              res.status(401).send({status:"wrong password"})
         }  
       }else{
        res.status(401).send({status:"User not find"})
       }
   }catch(error){
    res.status(401).send({status:"error server"})
   }
})

app.use(express.static('./client'))





async function start() {
    try {
        await sequelize.authenticate()
        await sequelize.sync()
        console.log('Successful db sync');
        // начинаем прослушивать подключения на 3000 порту
        app.listen(port)
    } catch (error) {
        console.error(error)
    }
}

start()
