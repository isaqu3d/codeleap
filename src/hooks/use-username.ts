import { useState } from 'react'

const STORAGE_KEY = 'codeleap_username'

export function useUsername() {
  const [username, setUsernameState] = useState<string>(
    () => localStorage.getItem(STORAGE_KEY) ?? ''
  )

  function saveUsername(value: string) {
    localStorage.setItem(STORAGE_KEY, value)
    setUsernameState(value)
  }

  function clearUsername() {
    localStorage.removeItem(STORAGE_KEY)
    setUsernameState('')
  }

  return { username, saveUsername, clearUsername }
}
