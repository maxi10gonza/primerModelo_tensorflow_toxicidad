import { useState, useEffect } from 'react'
import clasificador from "./toxicityClassifier.js"


function App() {
  const [text, setText] = useState("")
  const [debounce, setDebounce] = useState("")
  const [classifier, setClassifier] = useState([
    { "label": "identity_attack", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] },
    { "label": "insult", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] },
    { "label": "obscene", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] },
    { "label": "severe_toxicity", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] },
    { "label": "sexual_explicit", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] },
    { "label": "threat", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] },
    { "label": "toxicity", "results": [{ "probabilities": { "0": 0.0, "1": 0.0 }, "match": false }] }
  ])

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebounce(text)
    }, 1000)
    return () => clearTimeout(timer)
  }, [text])

  useEffect(() => {
    clasificador(debounce).then((results) => {
      setClassifier(results)
      console.log(results)
    })
  }, [debounce])

  return (
    <div className='flex flex-col w-full h-screen text-black bg-gradient-to-br from-blue-100 to-purple-200'>
      <div className='w-4/5 max-w-4xl mx-auto my-auto bg-white p-8 rounded-3xl shadow-2xl flex flex-col gap-8'>
        <input
          type="text"
          name="frase"
          onChange={(e) => setText(e.target.value)}
          placeholder="Escribe una frase..."
          className='text-2xl p-4 rounded-xl border border-blue-400 focus:outline-none focus:ring-4 focus:ring-blue-300 transition-all bg-blue-950 text-white placeholder:text-blue-200'
        />
        <h1 className='text-2xl text-center font-semibold text-blue-800'>{debounce}</h1>
        <div className='flex flex-col gap-4'>
          {classifier.map((category, idx) => (
            <div key={idx} className='grid grid-cols-[1fr_auto] items-center gap-4'>
              <div className='h-8 bg-gradient-to-r from-red-400 to-red-600 rounded-xl transition-all duration-700 ease-in-out'
                   style={{ width: `${(category.results[0].probabilities[1] * 100).toFixed(2)}%` }}>
              </div>
              <div className='text-xl font-medium text-gray-700'>
                {category.label} ({(category.results[0].probabilities[1] * 100).toFixed(2)}%)
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

export default App
