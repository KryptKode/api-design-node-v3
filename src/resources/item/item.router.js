import { Router } from 'express'
import controllers from './item.controllers'

const router = Router()

router
  .route('/')
  .get(controllers.getItems)
  .post(controllers.createItem)

router
  .route('/:id')
  .get(controllers.getItem)
  .delete(controllers.deleteItem)
  .put(controllers.updateItem)

export default router
