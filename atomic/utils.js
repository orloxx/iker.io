export function randomId(size = 6) {
  let result = ''
  const characters = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789'
  const charactersLength = characters.length
  for (let i = 0; i < size; i++) {
    result += characters.charAt(Math.floor(Math.random() * charactersLength))
  }
  return result
}

export async function customFetch(url) {
  const res = await fetch(url, {
    method: 'GET',
    headers: {
      'Content-Type': 'application/json',
    },
  })

  if (res.status !== 200) throw res

  return res.json()
}

export function injectScript(src) {
  return new Promise((resolve, reject) => {
    const script = document.createElement('script')
    script.defer = true
    script.async = true
    script.src = src
    script.addEventListener('load', resolve)
    script.addEventListener('error', (e) => reject(e.error))
    document.head.appendChild(script)
  })
}

/**
 * Listens to click outside an element
 *
 * @param {Array} insideEls - The elements that don't trigger the outside click
 * @param {Function} callback - The function to call when outside click is detected
 * @return {Function} - Unsubscribe function to remove the event when unmounting components
 */
export function listenOutsideClick(insideEls, callback = () => {}) {
  function isOutside({ target }, elements) {
    return !elements.filter((el) => !!el).some((el) => target === el || el.contains(target))
  }

  function onClick(e) {
    if (isOutside(e, insideEls)) {
      callback(e)
    }
  }

  window.addEventListener('click', onClick)

  // unsubscribe function
  return () => {
    window.removeEventListener('click', onClick)
  }
}

/**
 * Initializes multi-key listeners for 3d-object control
 *
 * @return {{destroy(): void, controlMapping: {}}}
 */
export function addMultiTouchKeyboardControl() {
  const controlMapping = {}

  function handleKeydown({ key }) {
    controlMapping[key.toLowerCase()] = true
  }

  function handleKeyup({ key }) {
    controlMapping[key.toLowerCase()] = false
  }

  document.addEventListener('keydown', handleKeydown)
  document.addEventListener('keyup', handleKeyup)

  return {
    controlMapping,
    destroy() {
      document.removeEventListener('keydown', handleKeydown)
      document.removeEventListener('keyup', handleKeyup)
    },
  }
}
