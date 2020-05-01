import React, { Component } from "react";
import {
  numberBtnArray,
  operatorBtnArray,
  mathBtnArray,
  clearBtnArray,
} from "./const";
import Button from "./Button";
import "./css/style.css";

class App extends Component {
  state = {
    prevValue: 0,
    nextValue: 0,
    operator: "",
    result: "",
    useEqual: false,
    block: false,
  };

  handleNumberBtn = (e) => {
    const { prevValue, nextValue, operator, result } = this.state;
    const value = e.target.value;

    this.setState({
      nextValue: nextValue === 0 ? value : nextValue + value,
      result: nextValue === 0 ? value : nextValue + value,
      block: false,
    });
  };

  handleOperatorBtn = (e) => {
    const { prevValue, nextValue, operator, useEqual, block } = this.state;
    const newOperator = e.target.value;
    if (block) return;
    //// sprawdzenie czy uzyty =, aby operator btn nie dodal od razu liczby po kliknieciu ----- flaga useEqual
    if (useEqual) {
      this.setState({
        nextValue: "",
        useEqual: false,
      });
    } else if (!operator) {
      this.setState({
        operator: newOperator,
        prevValue: nextValue,
        nextValue: "",
      });
    } else {
      this.setState({
        operator: newOperator,
        result: this.calculate(prevValue, nextValue),
        prevValue: this.calculate(prevValue, nextValue),
        nextValue: "",
      });
    }
  };
  handleEqualBtn = (e) => {
    const { prevValue, nextValue, operator, block } = this.state;
    if (block) return;
    this.setState({
      result: this.calculate(prevValue, nextValue),
      prevValue: this.calculate(prevValue, nextValue),
      useEqual: true,
    });
  };
  handleMathBtn = (e) => {
    const { prevValue, nextValue, result } = this.state;
    const newOperator = e.target.value;

    this.setState({
      operator: newOperator,
      result: this.calculateMath(result, newOperator),
      prevValue: this.calculateMath(result, newOperator),
      nextValue: "",
    });
  };
  handleClearBtn = (e) => {
    const whichClear = e.target.value;
    console.log(whichClear);
    if (whichClear === "CE") {
      this.clearOne();
    } else if (whichClear === "C") {
      this.clearAll();
    } else if (whichClear === "Back") {
      this.clearAll();
    }
  };

  calculate = (a = 0, b = 0) => {
    const operator = this.state.operator;
    if (operator === "+") return this.add(a, b);
    else if (operator === "-") return this.sub(a, b);
    else if (operator === "*") return this.mult(a, b);
    else if (operator === "/") return this.div(a, b);
  };

  calculateMath = (a, operator) => {
    if (operator === "^2") {
      return this.potega(a);
    } else if (operator === "sqrt") {
      return this.sqrt(a);
    } else if (operator === "1/x") {
      if (a == 0) {
        this.setState({
          block: true,
        });
        return "Nie dziel przez zero";
      } else return this.ulamek(a);
    }
  };

  clearOne = () => {
    this.setState({
      nextValue: 0,
      result: 0,
    });
  };
  clearAll = () => {
    this.setState({
      prevValue: 0,
      nextValue: 0,
      operator: "",
      result: "",
      useEqual: false,
    });
  };
  BackOne = () => {};

  add = (a, b) => a * 1 + b * 1;
  sub = (a, b) => a * 1 - b * 1;
  mult = (a, b) => a * b;
  div = (a, b) => a / b;
  potega = (a) => a * a;
  sqrt = (a) => Math.sqrt(a);
  ulamek = (a) => 1 / a;

  ///// Przyciski liczbowe
  buttonsNum = numberBtnArray.map((button) => (
    <Button
      title={button}
      handle={this.handleNumberBtn}
      type="number"
      key={button}
      class="btn btn-number"
    />
  ));

  ///// Przyciski operatorow podst
  buttonsOp = operatorBtnArray.map((button) => (
    <Button
      title={button}
      handle={this.handleOperatorBtn}
      type="operator"
      key={button}
      class="btn btn-operator"
    />
  ));
  buttonsMath = mathBtnArray.map((button) => (
    <Button
      title={button}
      handle={this.handleMathBtn}
      type="math"
      key={button}
      class="btn btn-math"
    />
  ));
  buttonsClear = clearBtnArray.map((button) => (
    <Button
      title={button}
      handle={this.handleClearBtn}
      type="clear"
      key={button}
      class="btn btn-clear"
    />
  ));

  buttonEq = (
    <Button
      title={"="}
      handle={this.handleEqualBtn}
      type="equal"
      key={"="}
      class="btn btn-equal"
    />
  );

  render() {
    return (
      <>
        <div className="value-history"></div>
        <div className="value">{this.state.value}</div>
        <div className="value-history">{this.state.valueHistoryOld}</div>
        <div className="value">
          {this.state.result ? this.state.result : this.state.nextValue}
        </div>
        {this.buttonsNum}
        {this.buttonsOp}
        {this.buttonEq}
        {this.buttonsMath}
        {this.buttonsClear}
      </>
    );
  }
}

export default App;
