const {check,validationResult} = require('express-validator')

const validateSignin=[

    check('firstName').trim().not().isEmpty().withMessage('firstName is required').isLength({min:8, max:20}).withMessage('min an maxi abkab'),
    check('password').trim().not().isEmpty().withMessage('Password is required').isLength({min:8, max:20}).withMessage('min an maxi abkab'),
    check('confirmPassword').trim().not().isEmpty().withMessage('Password is required').isLength({min:8, max:20}).withMessage('min an maxi abkab').custom((value,{req})=>{

        if(value!==req.body.password){
            throw new Error('passwords do noot match')
        }else{
            return true;
        }
    }),
    check('email').trim().not().isEmpty().withMessage('Email is required').normalizeEmail().isEmail().withMessage('enter a valid Email')
]

exports.userValidation=(req,res,next)=>{

    const result=validationResult(req).array()
    if(result.lenght){
        return next()
    }
    const error=result[0].msg
    res.json({success:false, message:error})

}