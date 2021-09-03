import { useState, useCallback } from "react"

export const useHttp = () => {
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(false)

  const fetchAPI = useCallback(async (requestConfig, applyData) => {
    const { url, method, headers, body } = requestConfig
    setIsLoading(true)
    setError(null)
    try {
      const res = await fetch(url, {
        method,
        headers: headers ? headers : {},
        body: body ? JSON.stringify(body) : null
      })

      if (!res.ok) {
        throw new Error('Request Failed.')
      }

      const data = await res.json()
      applyData(data)
    } catch (error) {
      setError(error.message || 'Something went wrong!')
    }
    setIsLoading(false)
  },
    [],
  )

  return {
    error, isLoading, fetchAPI
  }
}