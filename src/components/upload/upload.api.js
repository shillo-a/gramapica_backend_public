import { Router } from 'express';
import { isAuth } from '../../middleware/isAuth.middleware.js';
import multer from 'multer';
import { v4 as uuidv4 } from 'uuid';


import path from 'path';
const __dirname = path.resolve();

import { postUploadController } from './upload.controller.js';
import { HttpError } from "../../errors/Errors.js";

const router = Router();

//Настройка multer
//where and how to save our files
const fileStorageEngine = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, path.join(__dirname, 'src/public/uploads'))
    },
    filename: (req, file, cb) => {
        cb(null, uuidv4() + path.extname(file.originalname))
    }
})

const fileFilter = (req, file, cb) => {
    // file.mimetype === 'image/png'
    let extensionName = path.extname(file.originalname);
    if(
        extensionName !== '.png' && 
        extensionName !== '.jpg' && 
        extensionName !== '.gif' && 
        extensionName !== '.jpeg'
    ) {
        return cb(new HttpError(400, 'Загружать можно только изображения'))
    }
    cb(null, true)
    
}

//Создание multer uploadMiddleware 
const uploadMiddleware = multer({
    storage: fileStorageEngine,
    fileFilter: fileFilter
})

router.post('/uploads', 
    uploadMiddleware.single('image'), 
    postUploadController
)

export default router;
