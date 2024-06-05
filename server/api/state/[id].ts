const storage = useStorage('cache:state')

export default defineEventHandler(async event => {
  const id = getRouterParam(event, 'id')
  if (!id) {
    throw createError({
      status: 400,
      message: 'Missing id'
    })
  }

  const data = await storage.getItem(id)

  return data
})
