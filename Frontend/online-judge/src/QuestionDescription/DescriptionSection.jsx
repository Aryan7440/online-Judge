import React from 'react'
import ReactMarkdown from 'react-markdown'
import remarkGfm from 'remark-gfm'

const DescriptionSection = ({ description }) => {
  return (
    <div className="w-full md:w-1/2 p-4">
      <h2 className="text-2xl font-bold mb-4">Question Description</h2>
      <div className="markdown-body">
        <ReactMarkdown remarkPlugins={[remarkGfm]}>{description}</ReactMarkdown>
      </div>
    </div>
  )
}

export default DescriptionSection
