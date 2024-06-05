import { applyPatch } from "mendoza"

const storage = useStorage('cache:state')

export default defineWebSocketHandler({
  close (peer, details) {
    peer.unsubscribe('state-updates')
  },
  open (peer) {
    peer.subscribe('state-updates')
  },
  async message (peer, message) {
    const blob = message.text()
    peer.publish('state-updates', blob)
    
    const data = JSON.parse(blob)
    const existingData = storage.getItem(data.id)
    const newData = applyPatch(existingData, data.patch)
    await storage.setItem(data.id, newData)
  }
})
