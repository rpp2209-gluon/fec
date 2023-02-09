import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
//import instance from 'configAxios.js';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
// import {Modal} from 'react-modal-overlay';
import ReactModal from 'react-modal';
import axios from 'axios';
import './QuestionAnswer.css';


const sortQuestionsByHelpfulness = (data) => {
  data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
  return data;
};
const initialQuestionInputField = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';

var QuestionAnswer = () => {
  const [initialQuestionData, setInitialQuestionData] = useState(null)
  const [questionData, setQuestionData] = useState({ results: [] });
  const [searchValue, setSearchValue] = useState(initialQuestionInputField)
  const [searchClickValue, setSearchClickValue] = useState(0);
  const [clickLoadMoreQuestions, setClickLoadMoreQuestions] = useState(false);
  const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(0);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  // const [lastNumberDisplayQuestions, setLastNumberDisplayQuestion] = useState(0);

  useEffect(() => {
    const product_id = 71698;
    axios.get(`/questions/${product_id}`)
      .then(data => {
        const sortedData = sortQuestionsByHelpfulness(data.data);
        setInitialQuestionData(sortedData);
        setQuestionData(sortedData);
      })
  }, []);

  useEffect(() => {
    setNumberDisplayQuestions(questionData.results.length > 1 ? 2 : questionData.results.length)
  }, [questionData])


  const removeSearchInitialValue = () => {
    if (searchClickValue === 0) {
      setSearchValue('');
      setSearchClickValue(searchClickValue + 1);
    }
  };

  const handleSearchChange = (event) => {
    event.preventDefault();
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    if (searchValue.length >= 3 && searchValue !== initialQuestionInputField) {
      var newQuestionList = [];
      for (var i of initialQuestionData.results) {
        if (i.question_body.toLowerCase().includes(searchValue.toLowerCase())) {
          newQuestionList.push(i);
        }
      }
      const searchObj = {
        ...questionData,
        results: newQuestionList
      };
      setQuestionData(searchObj);
      setNumberDisplayQuestions(searchObj.results.length);
    } else if (searchValue.length < 3 && searchValue !== initialQuestionInputField) {
      setQuestionData(initialQuestionData);
    }
  }, [searchValue])

  var displayQuestionAnswer = () => {
    var resultArr = [];
    for (var i = 0; i < numberDisplayQuestions; i++) {
      resultArr.push(<Question key={questionData.results[i].question_id} questionData={questionData.results[i]} />)
    }
    return resultArr;
  }

  const handleLoadMoreQuestions = () => {
    if (numberDisplayQuestions + 2 > questionData.results.length) {
      setNumberDisplayQuestions(questionData.results.length);
    } else {
      setNumberDisplayQuestions(numberDisplayQuestions + 2);
    }
  };

  var QuestionAnswerResult = () => {
    return (
      <div id='questions-and-answers'>QUESTIONS & ANSWERS
        <div id='questions-search'>
          <input type='text' data-testid='input-search' className='input-search' name='input-search' value={searchValue} onClick={removeSearchInitialValue} onChange={handleSearchChange}></input>
        </div>
        <div className='questions'>
          {displayQuestionAnswer()}
        </div>
        {numberDisplayQuestions !== questionData.results.length ? <button className='load-more-questions' data-testid='load-more-questions' onClick={handleLoadMoreQuestions}>MORE ANSWERED QUESTIONS</button> : null}

        <button className='add-a-question' data-testid='add-a-question' onClick={() => { setShowQuestionModal(true) }}>ADD A QUESTION  +</button>
        <ReactModal ariaHideApp={false} isOpen={showQuestionModal} onRequestClose={() => { setShowQuestionModal(false) }}>
          <QuestionModal product_id={questionData.product_id} setShowQuestionModal={setShowQuestionModal} />
        </ReactModal>
      </div>
    )
  }

  return QuestionAnswerResult();
};

export default QuestionAnswer;