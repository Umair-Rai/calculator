import { Component } from '@angular/core';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  standalone: true,
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  displayValue: string = '';
  firstOperand: number | null = null;
  operator: string | null = null;
  waitingForSecondOperand: boolean = false;

  // Function to append number to the display
  appendNumber(number: string) {
    if (this.waitingForSecondOperand) {
      this.displayValue = '';
      this.waitingForSecondOperand = false;
    }
    this.displayValue = this.displayValue === '0' ? number : this.displayValue + number;
  }

  // Function to append a decimal point
  appendDot() {
    if (!this.displayValue.includes('.')) {
      this.displayValue += '.';
    }
  }

  // Function to handle when an operation (+, -, *, /) is clicked
  setOperation(operator: string) {
    if (this.firstOperand === null) {
      this.firstOperand = parseFloat(this.displayValue);
    } else if (this.operator) {
      this.calculate();
    }
    this.operator = operator;
    this.waitingForSecondOperand = true;
  }

  // Function to calculate the result
  calculate() {
    if (this.operator === null || this.firstOperand === null) return;

    const secondOperand = parseFloat(this.displayValue);
    let result: number;

    switch (this.operator) {
      case '+':
        result = this.firstOperand + secondOperand;
        break;
      case '-':
        result = this.firstOperand - secondOperand;
        break;
      case '*':
        result = this.firstOperand * secondOperand;
        break;
      case '/':
        result = this.firstOperand / secondOperand;
        break;
      default:
        return;
    }

    this.displayValue = String(result);
    this.firstOperand = result;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }

  // Function to delete the last entered number
  deleteLast() {
    this.displayValue = this.displayValue.slice(0, -1) || '0';
  }

  // Function to reset the calculator
  reset() {
    this.displayValue = '';
    this.firstOperand = null;
    this.operator = null;
    this.waitingForSecondOperand = false;
  }
}
