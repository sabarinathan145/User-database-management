var userdb = require('../model/model');

//create adn save new user 
exports.create =(req,res)=>{
    //validation
    if(!req.body){
        res.status(400).send({message : "content cannot be empty"});
        return;
    }

    const user = new userdb({
        name : req.body.name,
        email : req.body.email,
        gender : req.body.gender,
        status :req.body.status
    })

    user
        .save(user)
        .then(data=>{
           res.redirect('/add-user');
        })
        .catch(err=>{
            res.status(500).send({
                message : err.message || "some error occures while creating a create function"
            });
        });

}

// retrieve and return all users 
exports.find=(req,res)=>{
 if(req.query.id){
    const id = req.query.id;
    userdb.findById(id)
        .then(data=>{
            if(!data){
                res.status(404).send({message :"Not found user with id " + id })
            }else{
                res.send(data);
            }
        })

        .catch(err=>{
            res.status(500).send({message:"Error retrieving user with id " + id})

        })
 }else{userdb.find()
    .then(user=>{
      res.send(user)
    })
    
.catch(err=>{
    res.status(500).send ({
        message : err.message || "Error Occured while retriving user information"
    });
});
}
    
}
//update a new identifier user by user id 
exports.update=(req,res)=>{
    if(!req.body){

        return res
            .status(400)
            .send({message :"data to update can not be empty"})
    }
    const id = req.params.id;
    userdb.findByIdAndUpdate(id, req.body,{useFindAndModify : false})

    .then(data=>{
        if(!data){
            res.send(400).send({message:`cannot update user with ${id}. Maybe user not found!`})
        }
        else{
            res.send(data);
        }
    })

    .catch(err=>{
        res.status(500).send({message:"error update user information"})
    })

}
// deleting the value by id 
exports.delete=(req,res)=>{
    const id = req.params.id;

    userdb.findByIdAndDelete(id)
    .then(data=> {
        if(!data){
            res.status(404).send({message : `cannot delete with id ${id}. May be id is wrong`})
        }
    else{
            res.send({
                message : "User is deleted sucessfully"
            })
         }
    })
    .catch(err=>{
        res.status(500).send({
            message : "Could not deleted user with id ="+id 
        })
    })
}

