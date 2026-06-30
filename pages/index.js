import Head from 'next/head'
import { useState } from 'react'

export default function Home() {
  const [prompt, setPrompt] = useState('')
  const [scenario, setScenario] = useState('general')
  const [loading, setLoading] = useState(false)
  const [generated, setGenerated] = useState(null)

  const handleGenerate = async (e) => {
    e.preventDefault()
    setLoading(true)

    try {
      const response = await fetch('/api/generate', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ prompt, scenario }),
      })
      
      const result = await response.json()
      setGenerated(result)
    } catch (error) {
      console.error('Error:', error)
    } finally {
      setLoading(false)
    }
  }

  return (
    <>
      <Head>
        <title>PromptGen Pro - AI Prompt Generator</title>
      </Head>

      <div className="min-h-screen bg-gray-50">
        <header className="bg-white shadow h-16 flex items-center justify-between px-8">
          <span className="text-2xl font-bold">PromptGen Pro</span>
          <a href="/dashboard" className="bg-blue-600 text-white px-4 py-2 rounded-lg">Dashboard</a>
        </header>

        <main className="max-w-7xl mx-auto px-4 py-12">
          <h1 className="text-4xl font-bold text-center mb-4">PromptGen Pro</h1>
          <p className="text-xl text-gray-600 text-center mb-8">AI-powered prompt generator</p>

          <div className="bg-white rounded-lg shadow-lg p-8 mb-8">
            <h2 className="text-2xl font-bold mb-6">Generate Prompts</h2>
            <form onSubmit={handleGenerate} className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Describe What You Need
                </label>
                <textarea
                  value={prompt}
                  onChange={(e) => setPrompt(e.target.value)}
                  placeholder="Describe the task or scenario..."
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                  rows={4}
                  required
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Scenario
                </label>
                <select
                  value={scenario}
                  onChange={(e) => setScenario(e.target.value)}
                  className="w-full px-4 py-2 border border-gray-300 rounded-lg"
                >
                  <option value="general">General</option>
                  <option value="coding">Coding</option>
                  <option value="writing">Writing</option>
                  <option value="analysis">Analysis</option>
                </select>
              </div>
              <button
                type="submit"
                disabled={loading}
                className="bg-blue-600 text-white px-6 py-2 rounded-lg font-semibold hover:bg-blue-700 disabled:bg-gray-400"
              >
                {loading ? 'Generating...' : 'Generate Prompt'}
              </button>
            </form>

            {generated && (
              <div className="mt-8 p-6 bg-green-50 border border-green-200 rounded-lg">
                <h3 className="text-lg font-semibold text-green-900 mb-4">Generated Prompt</h3>
                <pre className="whitespace-pre-wrap text-sm text-green-800">
                  {JSON.stringify(generated, null, 2)}
                </pre>
              </div>
            )}
          </div>

          <div className="grid md:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-4">🤖</div>
              <h3 className="text-lg font-semibold mb-2">AI-Powered</h3>
              <p className="text-gray-600">Smart prompt generation</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-4">🎯</div>
              <h3 className="text-lg font-semibold mb-2">Multiple Scenarios</h3>
              <p className="text-gray-600">Coding, Writing, Analysis</p>
            </div>
            <div className="bg-white p-6 rounded-lg shadow">
              <div className="text-3xl mb-4">⚡</div>
              <h3 className="text-lg font-semibold mb-2">Instant Results</h3>
              <p className="text-gray-600">Prompts in seconds</p>
            </div>
          </div>
        </main>
      </div>
    </>
  )
}
