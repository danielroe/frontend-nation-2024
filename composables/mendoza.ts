let diff: (blobA: any, blobB: any) => Promise<string>

export function useMendoza() {
  if (import.meta.server) { return }

  if (diff) return diff

  const go = new Go()

  let p = WebAssembly.instantiateStreaming(fetch('/dozadiff.wasm'), go.importObject).then((result) => {
    go.run(result.instance)
  })

  diff = async (blobA, blobB) => {
    if (!window.diff) {
      await p
    }
    const result = await window.diff!(JSON.stringify(blobA), JSON.stringify(blobB))
    return JSON.parse(result)
  }

  return diff
}

declare global {
  interface Window {
    diff?: (a: string, b: string) => Promise<string>
  }
}
