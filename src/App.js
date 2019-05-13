import React, { Component } from 'react';
import './App.css';
import styled from 'styled-components';
import Digits from './components/Digits';
import Word from './components/Word';
import Diagram from './components/Diagram';
import GameOver from './components/GameOver';
import NewGame from './components/NewGame';

const Name = styled.h1`
  font-size: 56px;
  font-family: "HelveticaNeue-Light";
  margin: 0;
`;

const SubWord = styled.h3`
  font-size: 22px;
  padding: 20px 0;
  text-transform: uppercase;
  margin: 0;
  visibility: ${props => (props.newGame ? 'visible' : 'hidden')};
`;

const Block = styled.div`
  display: flex;
  align-items: flex-start;
  justify-content: center;
  position: relative;
  min-height: 300px;
`;

const letters = /^[a-z0-9]+$/i;
const digits = document.getElementsByClassName('digit');
const winText = `You did it! Super awesome!`;
const loseText = 'Seriously? That was an easy one.';

class App extends Component {
  constructor(props) {
    super(props);
   this.state ={
    data: [
      
      {'china':'Middle income, Ship Building, Consumer Goods, Socialist Market Economy',
      'brazil':'BRICS member,meat, computer machinery exporter ',
      'russia':'BRICS member,energy and steel exporter ',
      'united states': 'Very rich, auto industry giant, food',
      'india': 'newly middle income, massive population',
      'japan':'stagnated economy, very little investment opportunity despite massive reserve assets',
      'venezuela': 'on track to becoming a low income country again'}
    ,
    
      {'21':'Money supply increased by 25%, real income grew by 3%... what is the percentage change in inflation?',
      'lower':'If courruption is high, confidence in government instituations is...?',
      'higher':'In low income countries unemployment is...?',
      'decreases':'If interest rates increase, demand for capital...?'}
    ,

  {'price ceiling':'A legally determined maximum price that sellers may charge',
  'price floor':'A legally determined minimum price that sellers may recieve',
  'consumer surplus':'The difference between the highest price a consumer is willing to pay for a good or service and the price the consumer actually pays',
  'producer surplus':'The difference between the lowest price a firm would be willing to accept for a good or service and the price it actually receives',
  'elasticity':'A measure of how much one economic variable responds to changes in another economic variable.',
  'law of diminishing returns':'The principle that at some point, adding more of a variable input such as labor, to the same amount of a fixed input, such as capital, will cause the marginal product of the variable input to decline',
  'mixed economy': 'An economy in which most economic decisions result from the interaction of buyers and sellers in markets but in which the government plays a significant role to the allocation of resources',
  'oligopoly':'A market structure in which a small number of interdependent firms compete',
  'natural monopoly':'A situation in which economies of scales are so large that one firm can supply the entire market at a lower average total cost than can two or more firms.',
  'market economy':'an economy that allocates resources through the decentralized decisions of many firms and households as they interact in markets for goods and services',
  'equilibrium':'a situation in which the market price has reached the level at which quantity supplied equals quantity demanded',
  'consumer price index (CPI)':'a measure of the overall cost of the goods and services bought by a typical consumer',
  'nominal gdp':'the production of goods and services valued at current prices',
  'real gdp': 'the production of goods and services valued at constant prices',
  'market for loanable funds':'the market in which those who want to save supply funds and those who want to borrow to invest demand funds',
  'structural unemployment':'unemployment that results because the number of jobs available in some labor markets is insufficient to provide a job for everyone who wants one',
  'central bank':'an institution designed to oversee the banking system and regulate the quantity of money in the economy',
  'crowding-out effect':'the offset in aggregate demand that results when expansionary fiscal policy raises the interest rate and thereby reduces investment spending'}

,

  {'protectionism':'the policy of imposing duties or quotas on imports in order to protect home industries from overseas competition',
  'monetary autonomy':'independence of a central bank to affect its own money supply and, through that, conditions in its domestic economy',
  'free flows':'simple economic model illustrating the flow of goods and services though the economy',
  'fix exchange':'keep a currency value within a narrow band',
  'dirty floating':'exchange rate where a central bank occasionally intervenes to change the direction or the pace of change of a currency value',
  'currency bound':'countries abandon their ability to print their own currency and abandon the power to issue local currency in favor of USD',
  'free floating regime':'no market intervention, supply and demand in the currency market determine the exchange rate, the current account deficit or surplus aproximates the capital and financial account or deficit',
  'interest rate parity' : 'interest rate differential between two countries is equal to the differential between the forward exchange rate and the spot exchange rate. It plays an essential role in foreign exchange markets, connecting interest rates, spot exchange rates and foreign exchange rates.'}

],
    lose: false,
    currentCategory: null,
    guesses: [],
    currentDiagram: 1,
    goodGuesses: [],
    missedLetters: [],
    newGame: true,
    clue: true,
    currentClue: null,
    currentWord: '',
    category: [
      "Global Economies",
      "Actual Calcuations",
      "Micro and Macro Vocab",
      "International Trade"
    ],
    firstGame: true
  };
}


  componentDidMount() {
    const wrapper = document.getElementsByClassName('App')[0];
    // eslint-disable-next-line
    wrapper ? wrapper.focus() : null;
  }
  getCategory() {
    let index = Math.floor(Math.random() * this.state.category.length);
    // let RandomCategories = this.state.categories[index];
    this.setState({ currentCategory: index }); 
    return index;
    console.log(index, this.state.currentCategory);
  }
  getWord() {
    let currentindex = this.getCategory();
    // let currentindex = this.state.currentCategory;
    let pairs = this.state.data[currentindex];
    let WordList = Object.keys(pairs);
    let WordIndex = Math.floor(Math.random() * WordList.length);
    
    let word = WordList[WordIndex];
    console.log("getting new word", word);
    this.setState({ currentWord: word})
    this.setState({currentClue: pairs[word] })
    return word;
  }

  startGame = () =>{
    if(this.state.firstGame){
      this.getWord();
      this.setState({firstGame: false});
    }
  }

  // getClue() {
  //   let index = Math.floor(Math.random() * this.state.category.length);
  //   let RandomCategories = this.state.categories[index];
  //   this.setState({ currentClue: RandomCategories });
  //   console.log(this.state.currentClue);
  // }

  handleClick = e => {
    const letter = e.target.textContent.toLowerCase();
    return letter.length > 1 ? null : this.checkLetter(letter);
  };

  handleKeyUp = e => {
    const keyName = e.key;
    if (letters.test(keyName)) {
      return this.isDisabled(keyName) ? null : this.checkLetter(keyName);
    }
  };

  isDisabled(letter) {
    for (let i = 0; i < digits.length; i++) {
      if (digits[i].textContent === letter) {
        return digits[i].hasAttribute('disabled');
      }
    }
  }

  checkLetter = currentLetter => {
    if (this.state.guesses.length > 0) {
      this.state.guesses.map(
        letter =>
          letter === currentLetter
            ? null
            : this.setState({
              guesses: this.state.guesses.concat(currentLetter),
            })
      );
    } else {
      this.setState({
        guesses: this.state.guesses.concat(currentLetter),
      });
    }
    if (!this.state.currentWord.includes(currentLetter)) {
      this.updateImage();
    } else {
      this.setState(
        {
          goodGuesses: this.state.goodGuesses.concat(currentLetter),
        },
        function () {
          this.isWin();
        }
      );
    }
  };

  updateImage = () => {
    if (this.state.currentDiagram < 6) {
      this.setState({
        currentDiagram: this.state.currentDiagram + 1,
      });
    }
    return this.state.currentDiagram === 6 ? this.gameOver('lose') : null;
  };

  isWin() {
    const lettersList = this.state.currentWord
      .replace(/ /g, '')
      .split('')
      .filter((value, index, self) => {
        return self.indexOf(value) === index;
      });
    return lettersList.sort().toString() ===
      this.state.goodGuesses.sort().toString()
      ? this.gameOver('win')
      : null;
  }

  gameOver = result => {
    if (result === 'lose') {
      this.setState({
        lose: true,
        newGame: false,
      });
      this.showRest();
    } else {
      this.setState({
        lose: false,
        newGame: false,
      });
    }
  };

  showRest() {
    const missedLetterList = this.state.currentWord
      .split('')
      .filter(letter => !this.state.goodGuesses.includes(letter));
    this.setState({
      missedLetters: missedLetterList.join(''),
    });
  }

  onClickRetry() {
    this.getWord();
    this.setState({
      guesses: [],
      currentDiagram: 1,
      goodGuesses: [],
      missedLetters: [],
      newGame: true,
    });
  }

  render() {
    return (
      <div className="App" tabIndex="1" onKeyUp={this.handleKeyUp}>
        <Name>EGB Flower Game</Name>
        <SubWord newGame={this.state.newGame}>Guess the word</SubWord>
        {this.state.data.length > 0 && (
          <div>
            <Block>
             
              <div>
              <p>{this.state.category[this.state.currentCategory]}</p>
              <p>{this.state.currentClue}</p>
              </div>
              {this.startGame()}
              <div>
              <Diagram
                currentDiagram={this.state.currentDiagram}
                newGame={this.state.newGame}
              />
              </div>
              <div>
              <GameOver
                text={this.state.lose ? loseText : winText}
                newGame={this.state.newGame}
                isLose={this.state.lose}
              />
              </div>
              <div>
              <NewGame
                onClick={this.onClickRetry.bind(this)}
                newGame={this.state.newGame}
              />
              </div>
              
            </Block>
            {/* {console.log("word", this.state.currentWord)} */}
            <div>
            <Word
              content={this.state}
              guesses={this.state.guesses}
              missedLetters={this.state.missedLetters}
            />
            </div>
            <div>
            <Digits
              guesses={this.state.guesses}
              onClick={this.handleClick}
              newGame={this.state.newGame}
            />
            </div>
          </div>
        )}
      </div>
    );
  }
}

export default App;