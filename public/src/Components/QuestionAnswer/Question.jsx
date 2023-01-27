import React, { useState, useEffect } from "react";
import Answer from './Answer.jsx';
import ReactModal from 'react-modal';
import AnswerModal from './AnswerModal.jsx';
import axios from 'axios';


const sortAnswersByHelpfulness = (data) => {
  const sellerData = [];
  const otherData = [];
  for (var i of data.results) {
    if (i.answerer_name.toLowerCase() === 'seller') {
      sellerData.push(i);
    } else {
      otherData.push(i);
    }
  }
  sellerData.sort((a, b) => b.helpfulness - a.helpfulness);
  otherData.sort((a, b) => b.helpfulness - a.helpfulness);
  data.results = sellerData.concat(otherData);
  return data;
};

var Question = (props) => {
  const [answerData, setAnswerData] = useState({ results: [] });
  const [numberDisplayAnswers, setNumberDisplayAnswers] = useState(0);
  const [helpfulness, setHelpfulness] = useState({ click: false, helpfulness: props.questionData.question_helpfulness });
  const [showAnswerModal, setShowAnswerModal] = useState(false);

  // Get answers from the question id
  useEffect(() => {
    axios.get(`http://localhost:3000/answers/${props.questionData.question_id}`)
      .then(data => {
        setAnswerData(sortAnswersByHelpfulness(data.data))
      })
  }, [])

  // Wait until answerData is set and then display the number of answers
  useEffect(() => {
    setNumberDisplayAnswers(answerData.results.length > 1 ? 2 : answerData.results.length);
  }, [answerData])

  var displayAnswer = () => {
    var resultArr = [];
    for (var i = 0; i < numberDisplayAnswers; i++) {
      resultArr.push(<Answer key={answerData.results[i].id} answerData={answerData.results[i]} />)
    }
    return resultArr;
  };

  const handleLoadMoreAnswers = () => {
    setNumberDisplayAnswers(answerData.results.length);
  };

  const handleCollapseAnswers = () => {
    setNumberDisplayAnswers(2);
  };

  const showMoreAnswers = () => {
    if (answerData.results.length <= 2) {
      return null;
    } else if (numberDisplayAnswers !== answerData.results.length) {
      return <p className='see-more-answers' onClick={handleLoadMoreAnswers}>SEE MORE ANSWERS</p>
    } else {
      return <p className='collapse-answers' onClick={handleCollapseAnswers}>COLLAPSE ANSWERS</p>
    }
  };

  // Question helpfulness
  const handleClickHelpfulness = () => {
    if (!helpfulness.click) {
      var newHelpfulness = { click: true, helpfulness: helpfulness.helpfulness + 1 };
      axios.put('http://localhost:3000/questions/helpful', {
        question_id: answerData.question
      })
        .then(data => console.log(data))
        .catch(err => console.log(err))
      setHelpfulness(newHelpfulness);
    }
  };

  const handleAddAnswerClick = () => {
    setShowAnswerModal(true);
  };

  const AnswerResult = () => {
    return (
      <div>
        <p id='question'>Q: {props.questionData.question_body}</p>
        <p id='question-helpful' onClick={handleClickHelpfulness}>Helpful? Yes ({helpfulness.helpfulness})</p>
        {displayAnswer()}
        {showMoreAnswers()}
        <p id='add-answer' onClick={handleAddAnswerClick}>ADD ANSWER</p>
        <ReactModal isOpen={showAnswerModal} onRequestClose={() => { setShowAnswerModal(false) }}>
          <AnswerModal question_id={props.questionData.question_id} setShowAnswerModal={setShowAnswerModal} />
        </ReactModal>
      </div>
    )
  };

  return (
    <div>
      {AnswerResult()}
    </div>
  )
}

export default Question;