import React from 'react'
import { connect } from 'react-redux'
import * as actionCreators from '../state/action-creators'

export function Form(props) {
  // console.log(props)

  const onChange = evt => {
    // console.log(evt.target.value)
    const {name, value } = evt.target
    props.inputChange({ name, value })
  }

  const isDisabled = () => {
    return (
      props.form.newQuestion.trim().length < 2 || 
      props.form.newTrueAnswer.trim().length < 2 || 
      props.form.newFalseAnswer.trim().length < 2
    )
  }

  const onSubmit = evt => {
    evt.preventDefault()  
    props.postQuiz({ "question_text": props.form.newQuestion, "true_answer_text": props.form.newTrueAnswer, "false_answer_text": props.form.newFalseAnswer })
  }

  return (
    <form id="form" onSubmit={onSubmit}>
      <h2>Create New Quiz</h2>
      <input maxLength={50} name="newQuestion" value={props.form.newQuestion} onChange={onChange} id="newQuestion" placeholder="Enter question" />
      <input maxLength={50} name="newTrueAnswer" value={props.form.newTrueAnswer} onChange={onChange} id="newTrueAnswer" placeholder="Enter true answer" />
      <input maxLength={50} name="newFalseAnswer" value={props.form.newFalseAnswer} onChange={onChange} id="newFalseAnswer" placeholder="Enter false answer" />
      <button id="submitNewQuizBtn" disabled={isDisabled()} >Submit new quiz</button>
    </form>
  )
}

export default connect(st => st, actionCreators)(Form)
