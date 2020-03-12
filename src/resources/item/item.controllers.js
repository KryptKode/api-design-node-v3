import Item from './item.model'
import { crudControllers } from '../../utils/crud'

const getOne = () => crudControllers(Item).getOne()
const getMany = () => crudControllers(Item).getMany()
const createOne = () => crudControllers(Item).createOne()
const removeOne = () => crudControllers(Item).removeOne()
const updateOne = () => crudControllers(Item).updateOne()

export default {
  getOne,
  getMany,
  createOne,
  removeOne,
  updateOne
}
