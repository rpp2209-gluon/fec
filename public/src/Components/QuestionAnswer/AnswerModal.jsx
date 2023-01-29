import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AnswerModal = (props) => {
  const [answerField, setAnswerField] = useState('');
  const [nicknameField, setNicknameField] = useState({ click: false, nickname: 'Example: jack543!' });
  const [emailField, setEmailField] = useState({ click: false, email: 'Example: jack@email.com' });
  const [answerCharacters, setAnswerCharacters] = useState(0);
  const [nicknameCharacters, setNicknameCharacters] = useState(0);
  const [emailCharacters, setEmailCharacters] = useState(0);
  const [failedSubmission, setFailedSubmission] = useState(false);
  const [selectedImage, setSelectedImage] = useState([]);

  // Answer Field
  const handleCloseButtonClick = () => {
    props.setShowAnswerModal(false);
  };

  const handleAnswerFieldChange = (event) => {
    if (event.target.value.length <= 1000) {
      setAnswerField(event.target.value);
    }
  };

  useEffect(() => { setAnswerCharacters(answerField.length) }, [answerField]);

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

  // Upload image files
  const handleImageUploadChange = (event) => {
    setSelectedImage([...selectedImage, URL.createObjectURL(event.target.files[0])]);
  }

  const createImagePreview = () => {
    const imageArr = [];
    for (var i of selectedImage) {
      imageArr.push(<img src={i} height='60' width = '100'/>)
    }
    return <div>{imageArr}</div>;
  }

  const handleFormSubmit = (event) => {
    event.preventDefault();
    const emailGood = correctEmailFormat();
    if (!emailGood || answerField.length === 0 || nicknameField.nickname.length === 0 || emailField.email.length === 0) {
      setFailedSubmission(true);
    } else {
      props.setShowAnswerModal(false);
      console.log('photo', selectedImage)
      axios.post(`http://localhost:3000/answers/${props.question_id}` ,{
        body: answerField,
        name: nicknameField.nickname,
        email: emailField.email,
        photos: selectedImage,
      })
        .then(data => console.log(data))
        .catch(err => console.log(err))
    }
  };

  const failedSubmissionElement = () => {
    return (
      <ol> You must enter the following:
        <li>Any mandatory fields are blank</li>
        <li>The email address provided is not in correct email format</li>
        <li>The images selected are invalid or unable to be uploaded</li>
      </ol>
    )
  }

  return (
    <div id='answer-modal'>
      <form onSubmit={handleFormSubmit}>
        <h2 className='answer-modal-heading'>Submit your Answer</h2>
        <h3 className='answer-modal-subheading'>[Product Name]: [Question Body]</h3>

        {failedSubmission ? failedSubmissionElement() : null}
        Your Answer * <textarea className='answer-modal-answer' name='answer-modal-answer' type="text" rows='1' cols='60' value={answerField} onChange={handleAnswerFieldChange} />
        <p className='answer-modal-answer-characters-left'>{`${1000 - answerCharacters} characters remaining`}</p>

        What is your nickname * <input className='answer-modal-nickname' name='answer-modal-nickname' type="text" value={nicknameField.nickname} onChange={handleNicknameFieldChange} onClick={handleNicknameFieldClick} />
        <p className='answer-modal-nickname-characters-left'>{`${60 - nicknameCharacters} characters remaining`}</p>
        <p className='answer-modal-nickname-privacy'>For privacy reasons, do not use your full name or email address</p>


        Your email * <input className='answer-modal-email' name='answer-modal-email' type="text" value={emailField.email} onChange={handleEmailFieldChange} onClick={handleEmailFieldClick} />
        <p className='answer-modal-email-characters-left'>{`${60 - emailCharacters} characters remaining`}</p>
        <p className='answer-modal-email-authentication'>For authentication reasons, you will not be emailed</p>
        {selectedImage.length > 0 ? createImagePreview(): null}


        {selectedImage.length < 5 ? <input type="file" name="answer-photos-upload" className='answer-photos-upload'
          onChange={handleImageUploadChange} /> : null
        }
        <button className='answer-modal-close' onClick={handleCloseButtonClick}>Close</button>
        <input className='answer-modal-submit' type='submit' />
      </form>
    </div>
  )
};

export default AnswerModal;