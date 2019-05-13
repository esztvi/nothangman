import React from 'react';
import { shallow } from 'enzyme';
import toJson from 'enzyme-to-json';
import Word from './Word';

describe('Word', () => {
  it('should render the component', () => {
    const wrapper = shallow(<Word 
      content='yay'
      guesses='abc'
      missedLetters='y'
      />);
    expect(toJson(wrapper)).toMatchSnapshot();
  });
});
