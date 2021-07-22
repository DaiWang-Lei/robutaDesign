import React, { RefObject, useEffect } from 'react';
const useClickOutside = (ref: RefObject<HTMLElement>, handler: Function) => {
  useEffect(() => {
    const listener = (evnet: MouseEvent) => {
      if (!ref || ref.current?.contains(evnet.target as HTMLElement)) {
        return;
      }
      handler(evnet)
    }
    document.addEventListener('click', listener)
    return () => {
      document.removeEventListener('click', listener)
    }
  },[ref,handler])
}

export default useClickOutside;