import { createContext, useContext, useEffect, useState } from 'react'

const DataContext = createContext()

export function DataProvider({ children }) {
  const [categories, setCategories] = useState([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState(null)
  const baseUrl = import.meta.env.BASE_URL || '/'

  useEffect(() => {
    const loadMetadata = async () => {
      try {
        setLoading(true)
        const response = await fetch(`${baseUrl}metadata.json`)
        if (!response.ok) {
          throw new Error(`Failed to load metadata: ${response.statusText}`)
        }
        const data = await response.json()
        setCategories(data)
        setError(null)
      } catch (err) {
        console.error('Error loading metadata:', err)
        setError(err.message)
      } finally {
        setLoading(false)
      }
    }

    loadMetadata()
  }, [])

  return (
    <DataContext.Provider value={{ categories, loading, error }}>
      {children}
    </DataContext.Provider>
  )
}

export function useData() {
  const context = useContext(DataContext)
  if (!context) {
    throw new Error('useData must be used within a DataProvider')
  }
  return context
}
