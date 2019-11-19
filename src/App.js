import React from 'react';
import './styles/styles.css';
import isMobile from 'react-device-detect';
import Calculator from './layout/Calculator/Calculator';
import MobileCalculator from './layout/Calculator/MobileCalculator';

let app;
if (isMobile) {
	app = () => (
	  <div className="app">
	    <MobileCalculator />
	  </div>
    );
}
else {
	app = () => (
	  <div className="app">
	    <Calculator />
	  </div>
    );
}

export default app;