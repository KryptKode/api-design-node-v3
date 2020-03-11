const getItems = (req, res) => {
  res.send('Get all items')
}

const getItem = (req, res) => {
  res.send(`Get item with id ${req.params.id}`)
}

const createItem = (req, res) => {
  res.send('Created item successfully')
}

const updateItem = (req, res) => {
  res.send('Updated item successfully')
}

const deleteItem = (req, res) => {
  res.send('Deleted item successfully')
}
export default {
  getItems,
  getItem,
  createItem,
  updateItem,
  deleteItem
}
