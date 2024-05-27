import axios from 'axios'
import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import DescriptionSection from './DescriptionSection'
import EditorSection from './EditorSection'

const QuestionDescription = () => {
  const { questionID } = useParams()
  const [question, setquestion] = useState({})
  useEffect(() => {
    console.log(questionID)
    const getQuestion = async (questionID) => {
      try {
        const que = await axios.get(
          `${process.env.REACT_APP_BACK_END_URL}/questions/${questionID}`,
          {
            withCredentials: true,
          }
        )
        console.log(que.data)
        setquestion(que.data)
      } catch (error) {
        console.error('Error fetching the question:', error)
      }
    }
    getQuestion(questionID)
  }, [])

  return (
    <div className="container mx-auto py-8">
      <div className="flex flex-wrap md:flex-nowrap">
        <DescriptionSection description={question.description} />
        <EditorSection />
      </div>
    </div>
  )
}

export default QuestionDescription
