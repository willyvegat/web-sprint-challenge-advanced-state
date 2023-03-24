import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { fetchQuiz, selectAnswer, setMessage} from '../state/action-creators'

export function Quiz(props) {
  console.log(props);

  const handleSubmit = (e) => {
    e.preventDefault();
  }

  useEffect(() =>{
    props.fetchQuiz()
  }, [])

  return (
    <div id="wrapper">
      {
        props.quiz ? (
          <>
            <h2>{props.quiz.question}</h2>

            <div id="quizAnswers">
              <div className={props.quiz.answers[0].text ? "answer selected" : "answer"}>
                {props.quiz.answers[0].text}
                <button onClick={() => props.selectAnswer(props.quiz.answers[0].answer_id)}>
                {props.selectedAnswer.answer_id !== props.quiz.answers[0].answer_id ? "Select" : "SELECTED"}
                </button>
              </div>

              <div className={props.selectedAnswer.answer_id === props.quiz.answers[1].answer_id ? "answer selected" : "answer"}>
              {props.quiz.answers[1].text}
                <button onClick={() => props.selectAnswer(props.quiz.answers[1].answer_id)}>
                  {props.selectedAnswer.answer_id !== props.quiz.answers[1].answer_id ? "Select" : "SELECTED"}
                </button>
              </div>
            </div>

            <button id="submitAnswerBtn" onSubmit={handleSubmit} disabled={!props.selectedAnswer.answer_id}>Submit answer</button>
          </>
        ) : 'Loading next quiz...'
      }
    </div>
  )
}

export default connect(st => ({
  quiz: st.quiz,
  selectedAnswer: st.selectedAnswer
}), {
  fetchQuiz,
  selectAnswer,
  setMessage
})(Quiz);