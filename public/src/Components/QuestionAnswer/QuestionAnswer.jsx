import React, { useState, useEffect } from "react";
import { createPortal } from 'react-dom';
import instance from '../../../../configAxios.js';
import Question from './Question.jsx';
import QuestionModal from './QuestionModal.jsx';
// import {Modal} from 'react-modal-overlay';
import ReactModal from 'react-modal';

const exampleData = {
  "product_id": "5",
  "results": [{
    "question_id": 37,
    "question_body": "Why is this product cheaper here than other sites?",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 10,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
        // ...
      }
    }
  },
  {
    "question_id": 38,
    "question_body": "How long does it last?",
    "question_date": "2019-06-28T00:00:00.000Z",
    "asker_name": "funnygirl",
    "question_helpfulness": 20,
    "reported": false,
    "answers": {
      70: {
        "id": 70,
        "body": "Some of the seams started splitting the first time I wore it!",
        "date": "2019-11-28T00:00:00.000Z",
        "answerer_name": "sillyguy",
        "helpfulness": 6,
        "photos": [],
      },
      78: {
        "id": 78,
        "body": "9 lives-31",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "iluvdogz",
        "helpfulness": 31,
        "photos": [],
      },
      1: {
        "id": 1,
        "body": "Seller-100",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 100,
        "photos": [],
      },
      2: {
        "id": 2,
        "body": "Seller-31",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 31,
        "photos": [],
      },
      3: {
        "id": 3,
        "body": "9 lives-600",
        "date": "2019-11-12T00:00:00.000Z",
        "answerer_name": "iluvdogz",
        "helpfulness": 600,
        "photos": [],
      }
    }
  },
  {
    "question_id": 1,
    "question_body": "Example 1?",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
        // ...
      }
    }
  },
  {
    "question_id": 2,
    "question_body": "Example 2",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
        // ...
      }
    }
  },
  {
    "question_id": 3,
    "question_body": "Example 3",
    "question_date": "2018-10-18T00:00:00.000Z",
    "asker_name": "williamsmith",
    "question_helpfulness": 4,
    "reported": false,
    "answers": {
      68: {
        "id": 68,
        "body": "We are selling it here without any markup from the middleman!",
        "date": "2018-08-18T00:00:00.000Z",
        "answerer_name": "Seller",
        "helpfulness": 4,
        "photos": []
        // ...
      }
    }
  },
    // ...
  ]
};
const sortQuestionsByHelpfulness = (data) => {
  data.results.sort((a, b) => b.question_helpfulness - a.question_helpfulness);
  return data;
};
const initialQuestionInputField = 'HAVE A QUESTION? SEARCH FOR ANSWERS...';
const initialData = sortQuestionsByHelpfulness(exampleData);

var QuestionAnswer = () => {
  const [questionData, setQuestionData] = useState(initialData);
  const [searchValue, setSearchValue] = useState(initialQuestionInputField)
  const [searchClickValue, setSearchClickValue] = useState(0);
  const [clickLoadMoreQuestions, setClickLoadMoreQuestions] = useState(false);
  const [numberDisplayQuestions, setNumberDisplayQuestions] = useState(questionData.results.length > 1 ? 2 : questionData.results.length);
  const [showQuestionModal, setShowQuestionModal] = useState(false);
  // const [lastNumberDisplayQuestions, setLastNumberDisplayQuestion] = useState(0);
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
      for (var i of initialData.results) {
        if (i.question_body.toLowerCase().includes(searchValue.toLowerCase())) {
          newQuestionList.push(i);
        }
      }
      // console.log({
      //   ...initialData,
      //   results: newQuestionList
      // })
      const searchObj = {
        ...initialData,
        results: newQuestionList
      };
      // setLastNumberDisplayQuestion(numberDisplayQuestions);
      setQuestionData(searchObj);
      setNumberDisplayQuestions(searchObj.results.length > 1 ? 2 : searchObj.results.length);
      // } else if (searchValue !== initialQuestionInputField && searchValue !== '') {
    } else {
      // setNumberDisplayQuestions(lastNumberDisplayQuestions);
      setQuestionData(initialData);
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

  // const modalQuestionContents = () => {
  //   return <QuestionModal />;
  // }

  var QuestionAnswerResult = () => {
    return (
      <div id='questions-and-answers'> QUESTIONS & ANSWERS
        <div id='questions-search'>
          <input type='text' id='inputsearch' name='inputsearch' value={searchValue} onClick={removeSearchInitialValue} onChange={handleSearchChange}></input>
        </div>

        {displayQuestionAnswer()}
        {numberDisplayQuestions !== questionData.results.length ? <button className='loadmorequestions' onClick={handleLoadMoreQuestions}>MORE ANSWERED QUESTIONS</button> : null}

        <button onClick={() => { setShowQuestionModal(true) }}>ADD A QUESTION</button>
        <ReactModal isOpen={showQuestionModal} onRequestClose={() => { setShowQuestionModal(false) }}>
          <QuestionModal setShowQuestionModal={setShowQuestionModal}/>
        </ReactModal>
      </div>
    )
  }

  return (
    <div id='questions'>
      {QuestionAnswerResult()}
    </div>
  );
};

export default QuestionAnswer;