const controller = {}
const User = require('../models/user')

controller.getUsers = async (req, res) => {
    const users = await User.find()
    res.json((users.length == 0) ? [] : users)
}

controller.createUser = async (req, res) => {
    const {username} = req.body
    const newUser = new User({username})
    await newUser.save()
    res.json({"message": 'User created'})
}

controller.getUser = async (req, res) => {
    const user = await User.findById(req.params.id)
    res.json((user == null) ? [] : user)
}

controller.updateUser = async (req, res) => {
    const oldUsername = await User.findById(req.params.id)
    if(oldUsername == null){
        res.json({"message": 'Something went wrong while updating...'})
    }
    else{
        await User.findByIdAndUpdate(req.params.id, req.body)
        res.json({"message": 'User updated'})
    }
}

controller.deleteUser = async (req, res) => {
    const oldUsers = await User.find()
    await User.findByIdAndDelete(req.params.id)
    const currentUsers = await User.find()
    res.json((oldUsers.length == currentUsers.length) ? {"message": 'Something went wrong while deleting...'} : {"message": 'User deleted'})
}

module.exports = controller
