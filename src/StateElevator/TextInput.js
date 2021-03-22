import { Component } from 'react';

class TextInput extends Component {
  constructor(props) {
    super(props);
    this.handleChange = this.handleChange.bind(this);
  }

  handleChange(e) {
    this.props.onTextChange(e.target.value);
  }

  render() {
    const text = this.props.text;

    return (
      <fieldset>
        <legend>Digite o texto:</legend>
        <input value={text} onChange={this.handleChange} />
      </fieldset>
    )
  }
}

export default TextInput;