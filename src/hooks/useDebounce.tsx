import React, { FC, useEffect, useState } from "react";

const useDebounce = (value: any, delay: number = 300) => {
  const [debouncedValue, setDebouncedValue] = useState(value)
  useEffect(() => {
    const timer = window.setTimeout(() => {
      setDebouncedValue(value)
    }, delay)
    return () => {
      window.clearTimeout(timer)
    }
  }, [value, delay])

  return debouncedValue;
}

export default useDebounce;