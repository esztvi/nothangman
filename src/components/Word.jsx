import React from 'react';
import styled from 'styled-components';

const Section = styled.section`padding: 20px 0 0;`;

const StyledWord = styled.ul`
  display: inline-block;
  padding: 0;
  li {
    font-family: 'Roboto', sans-serif;
    font-weight: 100;
    text-transform: uppercase;
    list-style-type: none;
  }
  li::before {
    color: #8004e6;
    content: "";
  }
`;

const Word = props => {
  let word = props.content.currentWord.split('');
  console.log("word is", word);
  console.log("guesses", props.guesses)
  //const letters = words.map((word, i) => (
  const letters = word.map((letter) => (
  <StyledWord>
      
        <li
          className="wordLetter"
          data-red={props.missedLetters.includes(letter) ? 'true' : 'false'}>
          <span className={props.guesses.includes(letter) ? 'visible' : ''}>
            {letter} <br/>
          </span>
        </li>
      {/* <li>&nbsp;</li> */}
    </StyledWord>
  ))  
    
  // ));

  return <Section className="word">{letters}</Section>;
};

export default Word;
