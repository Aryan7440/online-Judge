import React from 'react'
import { Link } from 'react-router-dom'

const QuestionsTable = ({ questions }) => {
  console.log(questions)
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full bg-white border border-gray-200">
        <thead>
          <tr>
            <th className="py-2 px-4 border-b text-center">Title</th>
            <th className="py-2 px-4 border-b text-center">Tags</th>
            <th className="py-2 px-4 border-b text-center">Difficulty</th>
            <th className="py-2 px-4 border-b text-center">Status</th>
          </tr>
        </thead>
        <tbody>
          {questions.map((question) => (
            <tr key={question._id} className="hover:bg-gray-100">
              <td className="py-2 px-4 border-b text-center">
                <Link
                  to={`/questions/${question._id}`}
                  className="text-blue-500 hover:underline"
                >
                  {question.title}
                </Link>
              </td>
              <td className="py-2 px-4 border-b">
                <div className="flex justify-center items-center flex-wrap">
                  {question.tags.map((tag, index) => (
                    <span
                      key={index}
                      className="bg-gray-200 text-gray-800 text-sm font-semibold mr-2 mb-2 px-2.5 py-0.5 rounded"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </td>
              <td className="py-2 px-4 border-b text-center">
                {question.difficulty}
              </td>
              <td className="py-2 px-4 border-b text-center">
                {question.totalSubmissions > 0
                  ? question.totalSubmissions !== question.WA
                    ? 'Solved'
                    : 'Attempted'
                  : 'Not Attempted'}
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  )
}

export default QuestionsTable
