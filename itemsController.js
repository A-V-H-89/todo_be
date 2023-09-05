const User = require('./models/User')

class ItemsController {

  async saveItem (req, res) {
    try {
      const {title} = req.body
      const {id} = req.user
      const user = await User.findOne({ _id : id })
      
      if(!user) {
        return res.status(400).json({message: "This user doesn't exist"})
      }

      user.todos.push(title)
      await user.save()

      res.status(200).json({message: "Item was saved!"})
      // req.user = id of user which can define where I should save collection

    } catch(err) {
        console.log(err)
        res.status(400).json({error: 'Save item error'})
    }
  }

  async deleteItem() {
    console.log('delete item')
  }

  async getItems() {
    console.log('get items')
  }
}

module.exports = new ItemsController();
