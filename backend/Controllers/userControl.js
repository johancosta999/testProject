const User = require("../Model/userModel");

const getAllUsers = async (req, res, next) => {
    let users;

    try{
        users = await User.find();

    } catch (err) {
        console.log(err);
        return res.status(500).json({ message: "Server Error!" });
    }

    //not found
    if(!users){
        return res.status(404).json({message:"User not found!"})
    }

    //display all users
    return res.status(200).json({users });
};

//data insert
const addUsers = async (req, res, next ) => {
    const {name, gmail, age, address} = req.body;

    let user;

    try{
        user = new User({name, gmail, age, address});
        await user.save();
    }catch (err){
        console.log(err);
    }

    if(!user){
        return res.status(404).json({message:"User can't be added!"})
    }
    //display all users
    return res.status(200).json({user });

};

//get by id
const getByID = async(req, res, next) => {
    const id = req.params.id;

    let user;

    try{
        user = await User.findById(id);
    } catch(err){
        console.log(err);
    }

    if(!user){
        return res.status(404).json({message:"User not found!"})
    }
    //display all users
    return res.status(200).json({user });
}

//update user details
const updateUser = async (req, res, next) =>{

    const id = req.params.id;
    const {name, gmail, age, address} = req.body;

    let users;

    try{
        users = await User.findByIdAndUpdate (id, {
            name : name, gmail : gmail, age: age, address: address
        });
        users = await users.save();
    } catch (err){
        console.log(err);
    }

    //not available users
    if(!users){
        return res.status(404).json({message:"User unable to update!"})
    }
    //display all users
    return res.status(200).json({users });
}

const deleteUser = async(req, res, next) =>{

    const id = req.params.id;

    let user;

    try{
        user = await User.findByIdAndDelete(id);
    } catch (err){
        console.log(err);
    }

    //not available users
    if(!user){
        return res.status(404).json({message:"User unable to delete!"})
    }
    //display all users
    return res.status(200).json({ user });

}

exports.getAllUsers = getAllUsers;

exports.addUsers = addUsers;

exports.getByID = getByID;

exports.updateUser = updateUser;

exports.deleteUser = deleteUser;