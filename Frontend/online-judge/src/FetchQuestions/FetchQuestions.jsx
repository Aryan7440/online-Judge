import axios from 'axios'
import React, { useEffect, useState } from 'react'
import QuestionsTable from './QuestionsTable'

const FetchQuestions = () => {
  const [questions, setQuestions] = useState([])
  useEffect(() => {
    // console.log('use Effect')
    const getQuestions = async () => {
      const response = await axios.get(
        `${process.env.REACT_APP_BACK_END_URL}/fetchQuestions`,
        {
          withCredentials: true,
        }
      )
      //   console.log(Array.isArray(Questions))
      setQuestions(response.data)
      //   console.log(Questions)
    }
    getQuestions()
  }, [])
  return (
    <div className="container mx-auto mt-8 p-4">
      <h1 className="text-2xl font-bold mb-4">Questions List</h1>
      <QuestionsTable questions={questions} />
    </div>
  )
}

export default FetchQuestions
