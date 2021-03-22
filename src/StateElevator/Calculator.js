import { Component } from 'react';
import TextInput from './TextInput.js';

class Calculator extends Component {
  constructor(props) {
    super(props);
    this.handleTextChange = this.handleTextChange.bind(this);
    this.state = {text: ''};
  }

  handleTextChange(text) {
    this.setState({text});
  }

  render() {
    const text = this.state.text;

    return (
      <>
      <TextInput text={text} onTextChange={this.handleTextChange} />
      <br></br>
      <TextInput text={text} onTextChange={this.handleTextChange} />
      </>
    )
  }
}

export default Calculator;