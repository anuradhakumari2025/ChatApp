import {body} from 'express-validator'
export const registerValidator = ()=>[
  body("name","Please enter name").notEmpty(),
  body("username","Please enter username").notEmpty(),
  body("password","Please enter password").notEmpty(),
  body("bio","Please enter bio").notEmpty()
]

export const validateHandler = () =>{}