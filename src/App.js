import React, { Component } from "react";
import { numberBtnArray, operatorBtnArray } from "./const";
import Button from "./Button";
import "./css/style.css";

class App extends Component {
  state = {
    valueHistoryOld: "",
    prevValue: "",
    nextValue: "",
    operator: "",
  };

  showResult = (e) => {
    const {
      valueHistoryOld: valueHistory,
      prevValue,
      nextValue,
      operator,
    } = this.state;
    console.log(e.target.innerText);

    /////Jesli wprowadzimy number
    if (e.target.dataset.type === "number") {
      const value = e.target.value;

      /////Jesli wprowadzimy number
      if (!prevValue) {
        this.setState({
          prevValue: value,
          valueHistory: this.state.valueHistoryOld + value,
        });
      } else {
        this.setState({
          nextValue: value,
          valueHistory: this.state.valueHistoryOld + value,
        });
      }
    }

    /////Jesli operator
    if (e.target.dataset.type === "operator") {
      const operator = e.target.value;
      if (!nextValue) {
        this.setState({
          operator,
          valueHistory: this.state.valueHistoryOld + operator,
        });
      } else {
        this.setState({
          prevValue: this.calculate(prevValue, nextValue),
          nextValue: "",
          operator: operator,
          valueHistory: this.state.valueHistoryOld + operator,
        });
      }
    }
  };

  calculate = (a, b) => {
    const operator = this.state.operator;
    if (operator === "+") return this.add(a, b);
    else if (operator === "-") return this.sub(a, b);
    else if (operator === "*") return this.mult(a, b);
    else if (operator === "/") return this.div(a, b);
  };

  add = (a, b) => a * 1 + b * 1;
  sub = (a, b) => a * 1 - b * 1;
  mult = (a, b) => a * b;
  div = (a, b) => a / b;

  ///// Przyciski liczbowe
  buttonsNum = numberBtnArray.map((button) => (
    <Button
      title={button}
      handle={this.showResult}
      type="number"
      key={button}
      class="btn btn-number"
    />
  ));

  ///// Przyciski operatorow podst
  buttonsOp = operatorBtnArray.map((button) => (
    <Button
      title={button}
      handle={this.showResult}
      type="operator"
      key={button}
      class="btn btn-operator"
    />
  ));

  render() {
    return (
      <>
        <div className="value-history">{this.state.valueHistoryOld}</div>
        <div className="value">
          {this.state.nextValue ? this.state.nextValue : this.state.prevValue}
        </div>
        {this.buttonsNum}
        {this.buttonsOp}
      </>
    );
  }
}
export default App;
