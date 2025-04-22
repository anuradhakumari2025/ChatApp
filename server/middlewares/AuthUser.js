import jwt from 'jsonwebtoken'
const authUser = async (req, res, next) => {
  const {token} = req.cookies;
  if(!token){
    return res.json({success:false ,message : "NOT AUTHORIZED"})
  }
  // console.log("cookies",req.cookies)
  try {
    const tokenDecode = jwt.verify(token, process.env.JWT_SECRET);
    // console.log(req.body)
    // console.log(tokenDecode)
    if(tokenDecode.id){
      req.userId = tokenDecode.id;
      // console.log("tokendecode id",tokenDecode.id)
    }else{
      return res.json({success:false ,message : "NOT AUTHORIZED"})
    }
    next()
  } catch (error) {
    console.error(error);
    res.json({success:false ,message : error.message})
  }
}

export default authUser