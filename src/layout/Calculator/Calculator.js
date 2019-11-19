import React from 'react';
import Screen from './Screen/Screen';
import Keypad from './Keypad/Keypad';

class Calculator extends React.Component {
	
  state = {
    equation: '',
    result: 0,
	prevResult: 0
  }
  
  onButtonPress = event => {
	const MAX_EQUATION_LENGTH = 12;
    let equation = this.state.equation;
    const pressedButton = event.target.innerHTML;
    if (pressedButton === 'C') return this.clear();
    else if (pressedButton >= '0' && pressedButton <= '9') {
		if (equation.length <= MAX_EQUATION_LENGTH) equation += pressedButton;
	}
	else if (pressedButton === '.') {
		// Determine if a leading 0 should be added or not
		const lastCharOfEquation = this.state.equation.match(/[0-9]$/);
		if (this.state.equation === '' || Number.isInteger(parseInt(lastCharOfEquation)) === false 
			&& this.state.equation.endsWith(".") === false) equation += '0';
		if (equation.length <= MAX_EQUATION_LENGTH) equation += pressedButton;
	}
    else if (['+', '-', 'x', '÷', '%'].indexOf(pressedButton) !== -1) {
		if (this.state.equation === '') {
			this.setState({prevResult: this.state.result}); /* Store the result into the prevResult variable */
			equation += 'ANS ' + pressedButton + ' ';
		}
		else 
			if (equation.length <= MAX_EQUATION_LENGTH)  equation += ' ' + pressedButton + ' ';
	}
    else if (pressedButton === '=') {
      try {
		if (equation.includes('ANS')) equation = equation.replace("ANS", this.state.prevResult); /* Replace the word ANS with prevResult value for evaluation */
		equation = equation.replace(/x/g, "*") /* Replace on-screen multiplication symbol with correct operator */
		equation = equation.replace(/÷/g, "/") /* Replace on-screen division symbol with correct operator */
		const evalResult = eval(equation);
		const result = Number.isInteger(evalResult) ? evalResult : evalResult.toFixed(2);
		if (isNaN(result)) throw 'Invalid Mathematical Equation';
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