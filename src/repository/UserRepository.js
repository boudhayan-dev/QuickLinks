
const UserModel = require('../models/User');




async function createUser(payload) {
    let user = new UserModel(payload)
    try {
        await user.save()
        return { 
            "username": user.username,
            "email":user.email,
            "status": "created" 
        }
    } catch (error) {
        return {
            "status":"error",
            "message":error.message
        }
    }
}


async function findUser(payload) {
    let user = await UserModel.find({email:payload.email})
    if(user){
        return user
    }
    else{
        return {
            "status":"error",
            "message":"user does not exist"
        }
    }
}



async  function findAllUsers() {
    let users = await UserModel.find()
    return users
}

async function deleteUser(payload) {
     let user = UserModel.findOneAndDelete({email:payload.email})
     if(user){
         return {
             "status":"deleted"
         }
     }
     else{
         return {
             "status":"error",
             "message":"Error deleting user"
         }
     }
}


module.exports = {
    createUser,
    findUser,
    findAllUsers,
    deleteUser
};