const user=require('../model/users')

const searchUser=async(req,res)=>{
    const{email}=req.body
try{    
    const finduser= await user.findOne({email:email})
    if(!finduser){
        return res.status(400).send(`User doesn't exist ,please ask ${email} to register with us`)
    }
    res.status(200).send(finduser)
}
catch(error){
    res.status(400).send(error)
}
}

const adduser=async(req,res)=>{
    const{email,useremail}=req.body
try{    
    const find = await user.findOne({"email":useremail})
    await user.updateOne({email:email},{$push:{"team":{"firstName":find.firstName,"lastName":find.lastName,"useremail":useremail,"role":find.role}}})
    const data= await user.findOne({"email":email})
    res.status(200).send(data.team)
}
catch(error){
    res.status(400).send(error)
}
}

const getuser=async(req,res)=>{
    const{email}=req.body
    try{
        const findemail= await user.findOne({email:email})
    
        
        res.status(200).send(findemail.team)
    }
    catch(error){
        res.status(400).send(error)
    }    
}

const alluser=async(req,res)=>{
    
    try{
          const find= await user.find();
          
          res.status(200).send(find)
    }
    catch(error){
        res.status(400).send(error)
    }
}

//deleting the team user by admin
const deleteuser=async(req,res)=>{
    const{id}=req.params
    const{email}=req.body
   
try{    
       await user.updateOne({email:email},{$pull:{"team":{'_id':id}}})
       const find = await user.findOne({"email":email})
       res.status(200).send(find.team)
}
catch(error)
{
    res.status(400).send(error)
}
}

module.exports.alluser=alluser;
module.exports.deleteuser=deleteuser
module.exports.getuser=getuser
module.exports.adduser=adduser
module.exports.searchUser=searchUser;