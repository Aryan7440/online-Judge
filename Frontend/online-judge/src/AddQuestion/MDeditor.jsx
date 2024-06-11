import React from 'react'
import ReactMarkdown from 'react-markdown'
import DOMPurify from 'dompurify'

const MDeditor = ({ description, setDescription }) => {
  const handleChange = (e) => {
    setDescription(e.target.value)
  }

  const sanitizedMarkdown = DOMPurify.sanitize(description)

  return (
    <div className="flex flex-col md:flex-row mt-4">
      <div className="w-full md:w-1/2 p-2">
        <label className="mb-1 font-semibold">Description (Markdown):</label>
        <textarea
          className="w-full h-96 md:h-screen border border-gray-300 p-2 rounded-md text-black"
          value={description}
          onChange={handleChange}
          placeholder="Enter your markdown here..."
        />
      </div>
      <div className="w-full md:w-1/2 p-2 border-t md:border-t-0 md:border-l border-gray-300">
        <label className="mb-1 font-semibold">Preview:</label>
        <div className="h-96 md:h-screen overflow-auto p-2">
          <ReactMarkdown>{sanitizedMarkdown}</ReactMarkdown>
        </div>
      </div>
    </div>
  )
}

export default MDeditor
