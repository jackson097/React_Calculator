import React from 'react';
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';

class Calculator extends React.Component {
	
  state = {
    equation: '',
    result: 0
  }
  
  onButtonPress = event => {
    let equation = this.state.equation;
    const pressedButton = event.target.innerHTML;
    if (pressedButton === 'C') return this.clear();
    else if ((pressedButton >= '0' && pressedButton <= '9') || pressedButton === '.') {
		if (this.state.equation === '') this.setState({result: 0});  /* If a number is clicked and equation is empty, reset results */
		if (pressedButton === '.' && this.state.equation === '') equation += '0';
		equation += pressedButton;
	}
    else if (['+', '-', '*', '/', '%'].indexOf(pressedButton) !== -1) {
		if (this.state.equation === '')
			equation += this.state.result + ' ' + pressedButton + ' ';
		else equation += ' ' + pressedButton + ' ';
	}
    else if (pressedButton === '=') {
      try {
        const evalResult = eval(equation);
        const result = Number.isInteger(evalResult) ? evalResult : evalResult.toFixed(2);
		equation = '';
        this.setState({result});
		this.setState({equation});
      } catch (error) {
        alert('Invalid Mathematical Equation');
		return this.clear();
      }
    }
	// If the back arrow is clicked
    else {
      equation = equation.trim();
      equation = equation.substr(0, equation.length - 1);
    }
    this.setState({equation: equation});
  }
 
  clear() {
    this.setState({equation: '', result: 0});
  }

  render() {
    return (
      <main className="calculator">
        <Screen equation={this.state.equation} result={this.state.result} />
        <Keypad onButtonPress={this.onButtonPress} />
      </main>
    );
  }
}

export default Calculator;