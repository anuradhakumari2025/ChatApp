import {faker} from "@faker-js/faker"
import User from "../models/User.js"
const createUser = async(numUsers)=>{
  try {
    const userPromise = []
    for(let i = 0;i<numUsers;i++){
      const tempUser = User.create({
        name:faker.person.fullName(),
        username:faker.internet.username(),
        bio:faker.lorem.sentence(10),
        password:"password",
        avatar:{
          url:faker.image.avatar(),
          public_id:faker.system.fileName()
        }
      })
      userPromise.push(tempUser)
     
    }
    await Promise.all(userPromise)
    console.log("Users created",numUsers);
    process.exit(1)
  } catch (error) {
    console.log(error)
    res.json({success:false,message:error.message})
  }
}

export {createUser}