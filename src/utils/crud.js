export const getOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const item = await model.findOne({ _id: id, createdBy: userId }).exec()

  if (!item) {
    return res.status(400).end()
  }

  return res.status(200).json({ data: item })
}

export const getMany = model => async (req, res) => {
  const userId = req.user._id

  const items = await model.find({ createdBy: userId }).exec()
  return res.status(200).json({ data: items })
}

export const createOne = model => async (req, res) => {
  const userId = req.user._id
  const body = req.body
  const modelInfo = { ...body, createdBy: userId }

  const result = await model.create(modelInfo)
  return res.status(201).json({ data: result })
}

export const updateOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id
  const body = req.body

  const result = await model
    .findOneAndUpdate({ _id: id, createdBy: userId }, body, {
      new: true
    })
    .exec()

  if (!result) {
    return res.status(400).end()
  }

  return res.status(200).json({ data: result })
}

export const removeOne = model => async (req, res) => {
  const id = req.params.id
  const userId = req.user._id

  const result = await model
    .findOneAndRemove({ _id: id, createdBy: userId })
    .exec()

  if (!result) {
    return res.status(400).end()
  }

  return res.status(200).json({ data: result })
}

export const crudControllers = model => ({
  removeOne: removeOne(model),
  updateOne: updateOne(model),
  getMany: getMany(model),
  getOne: getOne(model),
  createOne: createOne(model)
})
