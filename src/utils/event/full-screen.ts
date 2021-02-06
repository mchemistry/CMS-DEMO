// fullscreen document: FullScreenDocument
interface FsDocument extends HTMLDocument {
  webkitFullscreenElement?: Element
  mozFullScreenElement?: Element
  msFullscreenElement?: Element
  msExitFullscreen?: () => void
  mozCancelFullScreen?: () => void
  webkitExitFullscreen?: () => void
}

// fullscreen Element: FullScreenDocumentElement
interface FsDocumentElement extends HTMLElement {
  webkitRequestFullscreen?: () => void
  msRequestFullscreen?: () => void
  mozRequestFullScreen?: () => void
}

/**
 * @description Toggle FullScreen of an element
 * @param {string} id  - as id of HTMLelement
 * @return {void} element when toggle Screen
 */
export const toggleFullScreen = (id: string) => {
  const fsDoc = <FsDocument>document
  const fsDocElem = <FsDocumentElement>document.getElementById(id)
  const isFullScreen = !!(
    fsDoc.fullscreenElement ||
    fsDoc.mozFullScreenElement ||
    fsDoc.webkitFullscreenElement ||
    fsDoc.msFullscreenElement
  )
  if (!isFullScreen) {
    if (fsDocElem.requestFullscreen) fsDocElem.requestFullscreen()
    else if (fsDocElem.msRequestFullscreen) fsDocElem.msRequestFullscreen()
    else if (fsDocElem.mozRequestFullScreen) fsDocElem.mozRequestFullScreen()
    else if (fsDocElem.webkitRequestFullscreen) { fsDocElem.webkitRequestFullscreen() }
  } else if (fsDoc.exitFullscreen) fsDoc.exitFullscreen()
  else if (fsDoc.msExitFullscreen) fsDoc.msExitFullscreen()
  else if (fsDoc.mozCancelFullScreen) fsDoc.mozCancelFullScreen()
  else if (fsDoc.webkitExitFullscreen) fsDoc.webkitExitFullscreen()
}

/**
 * @description add event before component is mounted
 * @param fn as function need add eventlistener
 */
export const getFullScreenStatus = (fn: any): void => {
  document.addEventListener('fullscreenchange', fn)
  document.addEventListener('mozfullscreenchange', fn)
  document.addEventListener('webkitfullscreenchange', fn)
  document.addEventListener('msfullscreenchange', fn)
}

/**
 * @description destroy event when component is destroyed
 * @param fn as function need remove eventlistener
 */
export const destroyFullScreenEvent = (fn: any): void => {
  document.removeEventListener('fullscreenchange', fn)
  document.removeEventListener('mozfullscreenchange', fn)
  document.removeEventListener('webkitfullscreenchange', fn)
  document.removeEventListener('msfullscreenchange', fn)
}
