let ws: WebSocket

export function useWebsocket () {
  if (import.meta.server) return

  if (!ws) {
    const protocol = location.protocol === 'https:' ? 'wss' : 'ws'
    ws = new WebSocket(`${protocol}://${location.host}/_ws`)
  }

  return {
    ws,
    ready: new Promise(resolve => {
      ws.addEventListener('open', resolve)
    })
  }
}
