
// const User = require('../models/User');




// async function createUser(payload) {
//     let user = new User(payload)
//     try {
//         await user.save()
//         return { 
//             "username": user.username,
//             "email":user.email,
//             "status": "created" 
//         }
//     } catch (error) {
//         return {
//             "status":"error",
//             "message":error.message
//         }
//     }
// }


// async function findUser(payload) {
//     let user = await User.find({email:payload.email})
//     if(user){
//         return user
//     }
//     else{
//         return {
//             "status":"error",
//             "message":"user does not exist"
//         }
//     }
// }



// async  function findAllUsers() {
//     let users = await User.find()
//     return users
// }

// async function deleteUser(payload) {
//      let user = User.findOneAndDelete({email:payload.email})
//      if(user){
//          return {
//              "status":"deleted"
//          }
//      }
//      else{
//          return {
//              "status":"error",
//              "message":"Error deleting user"
//          }
//      }
// }


// module.exports = {
//     createUser,
//     findUser,
//     findAllUsers,
//     deleteUser
// };