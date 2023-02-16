import React, { useState, useEffect } from "react";
import parseDate from './parseDate.js';
import axios from 'axios';

var Answer = (props) => {
  const [helpfulness, setHelpfulness] = useState({ click: false, helpfulness: props.answerData.helpfulness });
  const [reportStatus, setReportStatus] = useState(false);
  const usernameDate = () => {
    const name = props.answerData.answerer_name;
    return (
      <p className='answer-by'>by {name.toLowerCase() === 'seller' ? <b>{name}</b> : name}, {parseDate(props.answerData.date)}
      </p>
    )
  }

  const handleClickHelpfulness = () => {
    if (!helpfulness.click) {
      var newHelpfulness = { click: true, helpfulness: helpfulness.helpfulness + 1 };
      setHelpfulness(newHelpfulness);
      axios.put(':id/answers/helpful', {
        answer_id: props.answerData.answer_id,
      })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  };

  const handleReportClick = () => {
    if (!reportStatus) {
      setReportStatus(true);
      axios.put(':id/answers/report', {
        answer_id: props.answerData.answer_id,
      })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  }

  const handleImages = () => {
    let answerImagesElements = [];
    for (let i of props.answerData.photos) {
      answerImagesElements.push(<img className='answer-image' src={i.url}></img>);
    }
    return answerImagesElements;
  }

  return (
    <div className='answers'>
      <div className='answer' data-testid='answer'>A: {props.answerData.body}</div>
      {handleImages()}
      <div className='answerer-helpful-report'>
        {usernameDate()}
        <p className='answer-helpful' onClick={handleClickHelpfulness} data-testid='answer-helpful'>Helpful? Yes ({helpfulness.helpfulness})</p>
        <p className='answer-report' onClick={handleReportClick} data-testid='answer-report'>{reportStatus ? 'Reported' : 'Report'}</p>
      </div>
    </div>
  )
}

export default Answer;