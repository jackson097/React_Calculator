import React from 'react';
import './styles/styles.css';
import isMobileDevice from './isMobile.js';
import Calculator from './layout/Calculator/Calculator';
import MobileCalculator from './layout/Calculator/MobileCalculator';

let app;
if (isMobileDevice()) {
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