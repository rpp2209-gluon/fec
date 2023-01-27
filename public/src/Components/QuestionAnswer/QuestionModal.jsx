import React, { useState, useEffect } from 'react';
import axios from 'axios';

const QuestionModal = (props) => {
  const [questionField, setQuestionField] = useState('');
  const [nicknameField, setNicknameField] = useState({ click: false, nickname: 'Example: jackson11!' });
  const [emailField, setEmailField] = useState({ click: false, email: 'Why did you like the product or not?' });
  const [questionCharacters, setQuestionCharacters] = useState(0);
  const [nicknameCharacters, setNicknameCharacters] = useState(0);
  const [emailCharacters, setEmailCharacters] = useState(0);
  const [failedSubmission, setFailedSubmission] = useState(false);
  console.log('qmodal', props)
  // Question Field
  const handleCloseButtonClick = () => {
    props.setShowQuestionModal(false);
  };

  const handleQuestionFieldChange = (event) => {
    if (event.target.value.length <= 1000) {
      setQuestionField(event.target.value);
    }
  };

  useEffect(() => { setQuestionCharacters(questionField.length) }, [questionField]);

  // Nickname Field
  const handleNicknameFieldChange = (event) => {
    if (event.target.value.length <= 60) {
      setNicknameField({ ...nicknameField, nickname: event.target.value });
    }
  };
  const handleNicknameFieldClick = () => {
    if (!nicknameField.click) {
      setNicknameField({ click: true, nickname: '' });
    }
  };

  useEffect(() => { setNicknameCharacters(nicknameField.nickname.length) }, [nicknameField]);

  // Email Field
  const handleEmailFieldChange = (event) => {
    if (event.target.value.length <= 60) {
      setEmailField({ ...emailField, email: event.target.value });
    }
  };
  const handleEmailFieldClick = () => {
    if (!emailField.click) {
      setEmailField({ click: true, email: '' });
    }
  };

  useEffect(() => { setEmailCharacters(emailField.email.length) }, [emailField]);

  const correctEmailFormat = () => {
    const abc = 'qwertyuiopasdfghjklzxcvbnm';
    const num = '1234567890';
    const usedSpecialCharacters = '!#$%&*+-/=?^_{|';
    const notUsedSpecialCharacters = '"(),:;<>[]';
    const lowerCaseEmailField = emailField.email.toLowerCase();
    var emailFormat = true;

    // [Recipent name] @ [Domain name] [Top domain name]
    // Check if the not used special characters are in the string

    // Check to see if there is an @ in the string
    const splitEmailField = lowerCaseEmailField.split('@');
    splitEmailField.length === 2 ? null : emailFormat = false;

    const recipentName = splitEmailField[0];
    const domainName = splitEmailField[1];
    if (!recipentName || !domainName || recipentName === '' || domainName === '') {
      return false;
    }

    // Recipent name
    for (var i of notUsedSpecialCharacters) {
      recipentName.includes(i) ? emailFormat = false : null;
    }

    usedSpecialCharacters.includes(recipentName[0]) || usedSpecialCharacters.includes(recipentName[recipentName.length - 1]) ? emailFormat = false : null;
    recipentName.length === 0 ? emailFormat = false : null;

    // Domain name & top domain name
    var cnt = 0;
    const topDomainNameArr = ['.com', '.net', '.org'];
    for (var i of topDomainNameArr) {
      if (domainName.includes(i)) {
        cnt++;
      }
    }
    cnt === 1 ? null : emailFormat = false;

    // Split the string with a .
    const domainNameSplit = domainName.split('.');
    domainNameSplit[0] === '' ? emailFormat = false : null;

    return emailFormat;
  };



  const handleFormSubmit = (event) => {
    event.preventDefault();
    const emailGood = correctEmailFormat();
    if (!emailGood || questionField.length === 0 || nicknameField.nickname.length === 0 || emailField.email.length === 0) {
      setFailedSubmission(true);
    } else {
      props.setShowQuestionModal(false);
      axios.post(`http://localhost:3000/questions`, {
        body: questionField,
        name: nicknameField.nickname,
        email: emailField.email,
        product_id: props.product_id,
      })
        .then(data => console.log(data))
        .catch(err => console.log(err));
    }
  };

  const failedSubmissionElement = () => {
    return (
      <ol> You must enter the following:
        <li>Any mandatory fields are blank</li>
        <li>The email address provided is not in correct email format</li>
      </ol>
    )
  }

  return (
    <div id='question-modal'>
      <form onSubmit={handleFormSubmit}>
        <h2 className='question-modal-heading'>Ask Your Question</h2>
        <h3 className='question-modal-subheading'>About the [Product Name Here]</h3>

        {failedSubmission ? failedSubmissionElement() : null}
        Your Question * <textarea className='question-modal-question' name='question-modal-question' type="text" rows='1' cols='60' value={questionField} onChange={handleQuestionFieldChange} />
        <p className='question-modal-question-characters-left'>{`${1000 - questionCharacters} characters remaining`}</p>

        What is your nickname * <input className='question-modal-nickname' name='question-modal-nickname' type="text" value={nicknameField.nickname} onChange={handleNicknameFieldChange} onClick={handleNicknameFieldClick} />
        <p className='question-modal-nickname-characters-left'>{`${60 - nicknameCharacters} characters remaining`}</p>
        <p className='question-modal-nickname-privacy'>For privacy reasons, do not use your full name or email address</p>


        Your email * <input className='question-modal-email' name='question-modal-email' type="text" value={emailField.email} onChange={handleEmailFieldChange} onClick={handleEmailFieldClick} />
        <p className='question-modal-email-characters-left'>{`${60 - emailCharacters} characters remaining`}</p>
        <p className='question-modal-email-authentication'>For authentication reasons, you will not be emailed</p>

        <button className='question-modal-close' onClick={handleCloseButtonClick}>Close</button>
        <input className='question-modal-submit' type='submit' />
      </form>
    </div>
  )
};

export default QuestionModal;