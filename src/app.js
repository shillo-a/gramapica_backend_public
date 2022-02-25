import express, { urlencoded, json } from 'express';
import { sequelize } from './config/db.config.js';
import morgan from 'morgan';

import path from 'path';
const __dirname = path.resolve();

import initModels from './models/init-models.js';
import { HttpError, ValidationError } from './errors/Errors.js';

import authenticationApi from './components/authentication/authentication.api.js';
import articleApi from './components/article/article.api.js';
import tagApi from './components/tag/tag.api.js';
import userApi from './components/user/user.api.js';
import articleReviewApi from './components/articleReview/articleReview.api.js';
import regionApi from './components/region/region.api.js';
import commentApi from './components/comment/comment.api.js';

import uploadApi from './components/upload/upload.api.js';

const app = express();
const PORT = process.env.PORT;

// Каждый запрос проходит через всю цепочку
// 🔰🔰🔰

// Логируем HTTP req
app.use(morgan('dev'));

// Устанавливаем headers для res 
// Можно использовать helmet package, чтобы не прописывать вручную !
app.use((req, res, next) => {
    res.setHeader('Access-Control-Allow-Origin', '*');
    res.setHeader('Access-Control-Allow-Methods', 'OPTIONS, GET, POST, PUT, PATCH, DELETE');
    res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
    next();
})

// Все req.body перводим в json
app.use(urlencoded({extended: true})); 
app.use(json());
app.set('json spaces', 2);

// Подключаем все api routes
// Внутри api устроены так:
// api --> controller --> sanitization 
//                    --> validation
//                    --> service --> dal (+ hash password)
// На каждом уровне выдача ошибок "своего" уровня
app.use('/api', [
    authenticationApi,
    articleApi,
    tagApi,
    userApi,
    articleReviewApi,
    regionApi,
    commentApi,
    
    uploadApi
]);

//Отдельный API для управления загрузкой файлов - upload
//Все публчиные файлы доступны снаружи любому пользователю:
app.use(express.static(path.join(__dirname, 'src/public')));
// app.use(uploadApi)

// Если url req некорректный, возвращаем ошибку 404
app.use((req, res, next) => {
    const err = new HttpError(404)
    next(err)
})

// Ловим все ошибки в приложении, переданные из next(err)
// Express Error-handling middleware
app.use((err, req, res, next) => {

    //Только для режимма: Development
    console.log(err)

    if(err instanceof HttpError){
        res.status(err.status).json(err.message);
        return;
    }

    if(err instanceof ValidationError){
        res.status(422).json({message: err.message, remarks: err.remarks});
        return
    }

    //Если ошибка не ожидаемая, но не хотим, чтобы падал сервер
    res.status(500).json('500: Internal Server Error')
    
})

//Подключаем модели к sequelize
//Используем метод DB-First, по этой причине синхронизируем со стороны БД
initModels(sequelize);

// Запускае сервер
app.listen(PORT, ()=>{
    console.log(`Server started! Listening on port: ${PORT}`)
});