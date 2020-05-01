import React, { Component } from "react";
import { numberBtnArray, operatorBtnArray } from "./const";
import Button from "./Button";
import "./css/style.css";

class App extends Component {
  state = {
    valueHistory: [],
    firstValue: "",
    secondValue: "",
    operator: "",
  };

  showResult = () => {};
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
        <div className="value-history"></div>
        <div className="value">{this.state.value}</div>
        {this.buttonsNum}
        {this.buttonsOp}
      </>
    );
  }
}

export default App;
