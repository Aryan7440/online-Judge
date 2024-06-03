import React, { useContext, useState } from 'react'
import axios from 'axios'
import Editor from 'react-simple-code-editor'
import { highlight, languages } from 'prismjs'
import 'prismjs/components/prism-clike'
import 'prismjs/components/prism-c'
import 'prismjs/components/prism-cpp'
import 'prismjs/components/prism-python'
import 'prismjs/components/prism-java'
import 'prismjs/themes/prism.css'
import AuthContext from '../Hooks/AuthContext'
// import { useParams } from 'react-router-dom'

const EditorSection = () => {
  const [code, setCode] = useState(`
    #include <iostream> 
    using namespace std;
    int main() { 
        int a,b;
        cin>>a>>b;
        cout<<a+b;
        return 0; 
    }`)
  const [output, setOutput] = useState('')
  const [userInput, setUserInput] = useState('')
  const [language, setLanguage] = useState('cpp')

  const { UserName } = useContext(AuthContext)
  // const { questionID } = useParams()
  const handleSubmit = async () => {
    const payload = {
      language: language,
      code,
      input: userInput,
      User: UserName,
    }

    try {
      const { data } = await axios.post(`http://localhost:3000/run`, payload)
      console.log(data)
      setOutput(data.output)
    } catch (error) {
      console.log(error.response)
    }
  }

  return (
    <div className="w-full md:w-1/2 p-4">
      <select
        className="select-box border border-gray-300 rounded-lg py-1.5 px-4 mb-1 focus:outline-none focus:border-indigo-500 text-black"
        value={language}
        onChange={(e) => setLanguage(e.target.value)}
      >
        <option value="cpp">C++</option>
        <option value="js">C</option>
        <option value="py">Python</option>
        <option value="java">Java</option>
      </select>

      <br />
      <div
        className="bg-gray-100 shadow-md w-full mb-4"
        style={{ height: '300px', overflowY: 'auto' }}
      >
        <Editor
          value={code}
          onValueChange={(code) => setCode(code)}
          highlight={(code) => highlight(code, languages[language])}
          padding={10}
          style={{
            fontFamily: '"Fira code", "Fira Mono", monospace',
            fontSize: 12,
            outline: 'none',
            border: 'none',
            backgroundColor: '#f7fafc',
            height: '100%',
            overflowY: 'auto',
            color: '#333',
          }}
        />
      </div>
      <textarea
        className="user-input-box border border-gray-300 rounded-lg py-1.5 px-4 mb-4 focus:outline-none focus:border-indigo-500 text-black w-full"
        placeholder="Enter your input here"
        value={userInput}
        onChange={(e) => setUserInput(e.target.value)}
        rows={4}
      />

      <button
        onClick={handleSubmit}
        type="button"
        className="text-center inline-flex items-center text-white bg-gradient-to-br from-pink-500 to-orange-400 hover:bg-gradient-to-bl focus:outline-none font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth="1.5"
          stroke="currentColor"
          className="w-5 h-5 me-2"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
          />
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.91 11.672a.375.375 0 0 1 0 .656l-5.603 3.113a.375.375 0 0 1-.557-.328V8.887c0-.286.307-.466.557-.327l5.603 3.112Z"
          />
        </svg>
        Run
      </button>

      {output && (
        <div className="outputbox mt-4 bg-gray-100 rounded-md shadow-md p-4">
          <p
            style={{
              fontFamily: '"Fira code", "Fira Mono", monospace',
              fontSize: 12,
              color: 'black',
            }}
          >
            {output}
          </p>
        </div>
      )}
    </div>
  )
}

export default EditorSection
