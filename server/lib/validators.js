import {body,check,param,validationResult} from 'express-validator'

export const registerValidator = ()=>[
  body("name","Please enter name").notEmpty(),
  body("username","Please enter username").notEmpty(),
  body("password","Please enter password").notEmpty(),
  body("bio","Please enter bio").notEmpty(),
]

export const loginValidator = ()=>[
  body("username","Please enter username").notEmpty(),
  body("password","Please enter password").notEmpty(),
]

export const newGroupValidator = ()=>[
  body("name","Please enter name").notEmpty(),
  check("members").notEmpty().withMessage("Please add members").isArray({min:2,max:100}).withMessage("Members must be 2-100"),
]
export const addMemberValidator = ()=>[
  body("chatId","Please enter Chat ID").notEmpty(),
  check("members").notEmpty().withMessage("Please add members").isArray({min:1,max:97}).withMessage("Members must be 1-97"),
]

export const removeMemberValidator = ()=>[
  body("chatId","Please enter Chat ID").notEmpty(),
  body("userId","Please enter User ID").notEmpty(),
]
 
export const sendAttachmentValidator = ()=>[
  body("chatId","Please enter Chat ID").notEmpty(),
]

export const chatIdValidator = ()=>[
  param("id","Please enter Chat ID").notEmpty(),
]

export const renameGroupValidator = ()=>[
  param("id","Please enter Chat ID").notEmpty(),
  body("name","Please enter name").notEmpty(),
]

export const sendRequestValidator = ()=>[
  body("userId","Please enter User ID").notEmpty(),
]

export const acceptRequestValidator = ()=>[
  body("requestId","Please enter Request ID").notEmpty(),
  body('accept').notEmpty().withMessage("Please enter accept").isBoolean().withMessage("Accept must be boolean"),
]

export const adminLoginValidator = () =>[
  body("secretKey","Please enter secret Key").notEmpty(),
]

export const validateHandler = (req,res,next) =>{
  const errors = validationResult(req)
  const errorMsg = errors.array().map((error) => error.msg).join(", ")
  if(errors.isEmpty()){
    return next()
  }
  else res.status(400).json({
    success:false,
    message:errorMsg
  })

}