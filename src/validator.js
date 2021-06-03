const {body, validationResult} = require('express-validator')

addmodValidation = [
    body('title').exists().withMessage('Title does not exist').bail(),
    body('title').notEmpty().withMessage('Title is empty').bail(),
    body('title').isString().withMessage('Title is not string').bail(),
    body('body').exists().withMessage('Body does not exist').bail(),
    body('body').notEmpty().withMessage('Body is empty').bail(),
    body('body').isString().withMessage('Body is not string').bail()
]

delVadition = [
    body('title').exists().withMessage('Title does not exist').bail(),
    body('title').notEmpty().withMessage('Title is empty').bail(),
    body('title').isString().withMessage('Title is not string').bail()
]

const errMsg =(req, res, next)=>{
    try{
    const error = validationResult(req)
    if(!error.isEmpty())
    {
        console.log(error.errors[0].msg)
        return res.status(400).render('index',{
            viewTitle: error.errors[0].msg
        })
    }
    next()
    }catch(e){
        console.log(e)
    }
}

module.exports = {
    addmodValidation: addmodValidation,
    delVadition: delVadition,
    errMsg: errMsg
}