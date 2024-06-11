import React from 'react'
import { useState } from 'react'
import axios from 'axios'
import MDeditor from './MDeditor'

const Addquestion = () => {
  const [title, setTitle] = useState('')
  const [description, setDescription] = useState('')
  const [difficulty, setDifficulty] = useState('easy')
  const [tags, setTags] = useState('')
  const [numTestCases, setNumTestCases] = useState(0)
  const [testCases, setTestCases] = useState([])
  const handleNumTestCasesChange = (e) => {
    const newNum = parseInt(e.target.value, 10) || 0
    setNumTestCases(newNum)
    setTestCases(Array(newNum).fill({ input: '', output: '' }))
  }
  const handleTestCaseChange = (index, type, value) => {
    const updatedTestCases = testCases.map((testCase, i) => {
      if (i === index) {
        return { ...testCase, [type]: value }
      }
      return testCase
    })
    setTestCases(updatedTestCases)
  }
  const handleSubmit = async (event) => {
    event.preventDefault()
    const submission = {
      tcs: numTestCases,
      testCases,
    }
    const tagArray = tags.split(',').map((tag) => tag.trim())
    console.log('Tag Array:', tagArray)
    console.log('Title:', title)
    console.log('Description:', description)
    console.log('testCases', submission)

    try {
      const response = await axios.post(
        `${process.env.REACT_APP_BACK_END_URL}/addquestion`,
        {
          title,
          description,
          difficulty,
          tags: tagArray,
          submission,
        }
      )
      console.log('Question saved:', response.data)
    } catch (error) {
      console.error('Error saving question:', error)
    }
  }

  return (
    <div className="container mx-auto p-4 ">
      <h1 className="text-2xl font-bold mb-4">Create a New Question</h1>
      <form onSubmit={handleSubmit} className="space-y-4">
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Title:</label>
          <input
            className="border border-gray-300 p-2 rounded-md text-black"
            type="text"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Difficulty:</label>
          <select
            className="border border-gray-300 p-2 rounded-md text-black"
            value={difficulty}
            onChange={(e) => setDifficulty(e.target.value)}
            required
          >
            <option value="easy">Easy</option>
            <option value="medium">Medium</option>
            <option value="hard">Hard</option>
          </select>
        </div>
        <div className="flex flex-col">
          <label className="mb-1 font-semibold">Tags (comma separated):</label>
          <input
            className="border border-gray-300 p-2 rounded-md text-black"
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
          />
        </div>
        <button
          type="submit"
          className="bg-blue-500 text-white p-2 rounded-md hover:bg-blue-600"
        >
          Create Question
        </button>
        <MDeditor description={description} setDescription={setDescription} />
        <div className="flex flex-col space-y-4">
          <div className="flex flex-col">
            <label className="mb-2 font-semibold text-gray-700">
              Number of test cases:
            </label>
            <input
              className="border border-gray-300 p-2 rounded-md text-black"
              type="number"
              value={numTestCases}
              onChange={handleNumTestCasesChange}
              placeholder="Number of Test Cases"
            />
          </div>
          {testCases.map((testCase, index) => (
            <div key={index} className="flex flex-col space-y-2">
              <textarea
                className="border border-gray-300 p-2 rounded-md text-black"
                value={testCase.input}
                onChange={(e) =>
                  handleTestCaseChange(index, 'input', e.target.value)
                }
                placeholder={`Input #${index + 1}`}
                rows={4}
              />
              <textarea
                className="border border-gray-300 p-2 rounded-md text-black"
                value={testCase.output}
                onChange={(e) =>
                  handleTestCaseChange(index, 'output', e.target.value)
                }
                placeholder={`Output #${index + 1}`}
                rows={4}
              />
            </div>
          ))}
        </div>
      </form>
    </div>
  )
}

export default Addquestion
