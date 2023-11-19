import { useState, useEffect } from 'react'

function App() {
  const [count, setCount] = useState(0)

  const getData = async () => {
    const res = await fetch('/api/hello')
    const data = await res.json()
    console.log('data:', data)
  }
  useEffect(() => {
    getData()
  }, [])

  return (
    <h1>Hello</h1>
  )
}

export default App
