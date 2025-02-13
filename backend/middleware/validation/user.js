const {check,validationResult}=require('express-validator')

exports.validateUserSignup=[

    check('firstName').trim().not().isEmpty().withMessage('first name is required!').isLength({min:3, max:30}).withMessage('first name must be between 3 to 30 characters'),
    check('middleName').trim().not().isEmpty().withMessage('middle name is required!').isLength({min:3, max:30}).withMessage('middle name must be between 3 to 30 characters'),
    check('lastName').trim().not().isEmpty().withMessage('last name is required!').isLength({min:3, max:30}).withMessage('last name must be between 3 to 30 characters'),
    check('username').trim().not().isEmpty().isLength({min:5, max:30}).withMessage('username must be between 5 to 20 characters'),
    check('email').normalizeEmail().isEmail().withMessage('Invalid email!'),
    check('password').trim().not().isEmpty().withMessage('password is required!').isLength({min:6, max:20}).withMessage('password must be between 8 to 20 characters long'),
    check('confirmPassword').trim().not().isEmpty().withMessage('password is required!').isLength({min:6, max:20}).withMessage('password has to be minimum of 8 characters and maximum of 20').custom((value,{req})=>{
        if(value!==req.body.password){
            throw new error ('passwords do not match!')
        }else{
            return true
        }
    }),

]


exports.userValidation=(req,res,next)=>{
const result=validationResult(req).array()
if (!result.length)return next()


const error=result[0].msg
res.json({success:false,message:error})

}
