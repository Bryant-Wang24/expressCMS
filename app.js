const express = require('express')
const app = express()
var session = require('express-session')
// const ejs = require('ejs')

// 配置session中间件
app.use(session({
    secret: 'this is session',
    name: "itying",//修改session对应cookie的名称
    resave: false,//强制保存session即使它并没有变化
    saveUninitialized: true,//强制将未初始化的session存储
    cookie: {
        maxAge: 1000 * 60 * 30,
        secure: false//true表示只有https协议才能访问cookie
    },
    rolling: true//在每次请求时强行设置cookie，这将重置cookie过期时间（默认：false）
}))

app.set("view engine", "ejs")
// 配置静态web目录
app.use(express.static("static"))

// 直接使用express代替 bodyParser中间件 进行调用
app.use(express.urlencoded({ extended: false }))// 表单请求
app.use(express.json())// json请求

// 引入外部模块
const admin = require('./routes/admin')
const index = require('./routes/index')
const api = require('./routes/api')

// 挂载模块
app.use("/admin", admin)
app.use("/api", api)
app.use("/", index)

app.get('/', (req, res) => {
    res.send('首页')
})
app.listen(3001)











// var cookieParser = require('cookie-parser')
// app.use(cookieParser("wqs"))//配置cookieParser中间件



// app.set("view engine", "ejs")

// // 配置静态web目录
// app.use(express.static("static"))

// // 直接使用express代替 bodyParser中间件 进行调用
// app.use(express.urlencoded({ extended: false }))// 表单请求
// app.use(express.json())// json请求


// app.get('/', function (req, res) {
//     // 设置cookie 如果cookie没有过期的话，关闭浏览器重新打开，cookie不会销毁
//     // res.cookie("username", "zhangsan", { maxAge: 1000 * 60 * 60, path: "/login" })//path表示哪些路由可以访问cookie

//     // let title = "你好ejs"
//     // res.render("index", {
//     //     title: title
//     // })

//     // 多个域名共享cookie 比如aaa.lining.com和bbb.lining.com要共享cookie,需要设置domain
//     // res.cookie("username", "zhangsan", { maxAge: 1000 * 60 * 60, domain: "lining.com" })


//     // cookie的加密，设置signed
//     // 1、配置中间件的时候需要传入加密的参数
//     // app.use(cookieParser("itying"))//这里的itying就是要加密的参数
//     // 2、res.cookie("username", "zhangsan", { maxAge: 1000 * 60 * 60, signed: true })
//     // 3、res.signedCookies

//     res.cookie("username", "zhangsan", { maxAge: 1000 * 60 * 60, signed: true })
//     res.send('首页')
// })


// app.get('/art', function (req, res) {
//     let username = req.signedCookies.username
//     console.log('username', username);
//     res.send("登陆页面" + username)
// })
// app.get('/login', function (req, res) {
//     let username = req.cookies.username
//     console.log('username', username);
//     res.send("登陆页面" + username)
//     // res.render("login", {})
//     // let title = {
//     //     username: '王秋爽',
//     //     age: 23
//     // }
//     // let h = "<h3>我是h3标题</h3>"
//     // let list = ['3333333', '44444444', '555555']
//     // res.render("news", {
//     //     title: title,
//     //     h: h,
//     //     tags: true,
//     //     score: 60,
//     //     list: list
//     // })
//     // res.send('你好，express')
// })
// app.post("/doLogin", (req, res) => {
//     let body = req.body
//     console.log(body);
//     res.send("执行提交")
// })

// // // 4.内置中间件
// // app.use(express.static("static"))//可以匹配到base.css
// // // 4.内置中间件


// // // 1.应用级中间件（主要用在权限判断）
// // app.use((req, res, next) => {//所有的路由匹配之间都会先走到这一步
// //     console.log(new Date());
// //     next()
// // })
// // // 1.应用级中间件（主要用在权限判断）



// // // 2.路由级中间件
// // app.get('/edit/add', function (req, res, next) {
// //     console.log('执行增加新闻');
// //     next()//添加next之后他就可以继续向下匹配
// // })
// // app.get('/edit/:id', function (req, res) {
// //     const id = req.params['id'];
// //     res.send('动态路由' + id)
// // })
// // // 2.路由级中间件


// // // 3.错误处理中间件
// // app.use((req, res, next) => {
// //     res.status(404).send("404")
// // })
// // // 3.错误处理中间件





// // app.get('/', function (req, res) {
// //     res.send('首页')
// // })
// // app.get('/article', function (req, res) {
// //     res.send('新闻页面')
// // })
// // app.get('/login', function (req, res) {
// //     res.send('登陆页面')
// // })
// // app.get('/register', function (req, res) {
// //     res.send('注册页面')
// // })

// // app.post('/doLogin', function (req, res) {
// //     res.send('执行登陆')
// // })
// // app.put('/editUser', function (req, res) {
// //     res.send('修改用户')
// // })
// // app.delete('/editUser', function (req, res) {
// //     res.send('删除用户')
// // })









// // 路由多级目录
// app.get('/editUser/admin', function (req, res) {
//     res.send('多级目录用户')
// })


// // get传值
// app.get('/product', function (req, res) {
//     let query = req.query
//     console.log(query);
//     res.send('product' + query.id)
// })
// app.listen(3001)