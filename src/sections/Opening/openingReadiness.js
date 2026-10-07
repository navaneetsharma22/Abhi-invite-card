const IMAGE_TIMEOUT_MS = 9000
const FONT_TIMEOUT_MS = 2500

function waitForImage(image, signal) {
  return new Promise((resolve) => {
    if (!image || signal.aborted) {
      resolve(false)
      return
    }

    let settled = false
    let decoding = false
    const timeout = window.setTimeout(() => finish(false), IMAGE_TIMEOUT_MS)

    function finish(ready) {
      if (settled) return
      settled = true
      window.clearTimeout(timeout)
      image.removeEventListener('load', decode)
      image.removeEventListener('error', onError)
      signal.removeEventListener('abort', onAbort)
      resolve(ready)
    }

    function decode() {
      if (decoding) return
      decoding = true
      if (!image.naturalWidth) {
        finish(false)
        return
      }
      if (typeof image.decode !== 'function') {
        finish(true)
        return
      }
      Promise.resolve()
        .then(() => image.decode())
        .then(() => finish(true), () => finish(image.naturalWidth > 0))
    }

    function onError() { finish(false) }
    function onAbort() { finish(false) }

    image.addEventListener('load', decode, { once: true })
    image.addEventListener('error', onError, { once: true })
    signal.addEventListener('abort', onAbort, { once: true })
    if (image.complete) decode()
  })
}

function waitForFonts(signal) {
  if (!document.fonts?.ready) return Promise.resolve(true)

  return new Promise((resolve) => {
    if (signal.aborted) {
      resolve(false)
      return
    }

    let settled = false
    const timeout = window.setTimeout(() => finish(false), FONT_TIMEOUT_MS)

    function finish(ready) {
      if (settled) return
      settled = true
      window.clearTimeout(timeout)
      signal.removeEventListener('abort', onAbort)
      resolve(ready)
    }

    function onAbort() { finish(false) }

    signal.addEventListener('abort', onAbort, { once: true })
    document.fonts.ready.then(() => finish(true), () => finish(false))
  })
}

export async function waitForOpeningReady(images, signal) {
  const [imageStates, fontsReady] = await Promise.all([
    Promise.all(images.map((image) => waitForImage(image, signal))),
    waitForFonts(signal),
  ])
  return { imageStates, fontsReady }
}
