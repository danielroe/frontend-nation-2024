import { klona } from 'klona'
import { applyPatch } from 'mendoza'
import { hash } from 'ohash'

export function useSharedState <T extends Record<string, any>>(id = 'state') {
  const state = useState(() => ({} as T))

  onServerPrefetch(async () => {
    const data = await $fetch(`/api/state/${id}`, {
      responseType: 'json'
    })
    state.value = data as T || {}
  })

  if (import.meta.client) {
    let snapshot = hash(state.value)
    let oldState = klona(state.value)
    let paused = false

    const ws = useWebsocket()!
    const diff = useMendoza()!
    async function syncState(newState: T) {
      if (paused) {
        paused = false
        return
      }
      await ws.ready
      const patch = await diff(oldState, newState)
      ws.ws.send(JSON.stringify({ id, patch }))
    }

    ws.ws.addEventListener('message', event => {
      const data = JSON.parse(event.data)
      if (data.id === id) {
        const newState = applyPatch(oldState, data.patch)
        const newSnapshot = hash(newState)
        if (newSnapshot !== snapshot) {
          snapshot = newSnapshot
          paused = true
          state.value = newState
          oldState = klona(newState)
        }
      }
    })

    watch(state, syncState, { deep: true, flush: 'post' })
  }
  return state
}
