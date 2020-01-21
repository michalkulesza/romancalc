import React, { useState } from "react";
import Input from "./Input";
import LargeButton from "./LargeButton";
import Button from "./Button";
import "./Calculator.css";

const Calculator = () => {
  const [inputDisplay, setInputDisplay] = useState("");
  const roman = ["M", "CM", "D", "CD", "C", "XC", "L", "XL", "X", "IX", "V", "IV", "I"];
  const romanValue = [1000, 900, 500, 400, 100, 90, 50, 40, 10, 9, 5, 4, 1];

  const evaluate = (inputDisplay, convertToRoman, convertFromRoman, setInputDisplay) => {
    if (inputDisplay.indexOf("+") !== -1 && inputDisplay[inputDisplay.length - 1] !== "+") {
      let inputArr = inputDisplay.split("+");
      setInputDisplay(
        convertToRoman(add(convertFromRoman(inputArr[0]), convertFromRoman(inputArr[1])))
      );
    } else if (inputDisplay.indexOf("-") !== -1 && inputDisplay[inputDisplay.length - 1] !== "-") {
      let inputArr = inputDisplay.split("-");
      setInputDisplay(
        convertToRoman(substract(convertFromRoman(inputArr[0]), convertFromRoman(inputArr[1])))
      );
    } else if (inputDisplay.indexOf("*") !== -1 && inputDisplay[inputDisplay.length - 1] !== "*") {
      let inputArr = inputDisplay.split("*");
      setInputDisplay(
        convertToRoman(multiply(convertFromRoman(inputArr[0]), convertFromRoman(inputArr[1])))
      );
    } else {
      return null;
    }
  };

  const add = (a, b) => a + b;
  const substract = (a, b) => a - b;
  const multiply = (a, b) => a * b;

  const convertFromRoman = value => {
    if (value === null) {
      return null;
    }

    let firstNum = romanValue[roman.indexOf(value[0])],
      prev,
      curr;

    for (let i = 1; i < value.length; i++) {
      curr = romanValue[roman.indexOf(value[i])];
      prev = romanValue[roman.indexOf(value[i - 1])];

      if (curr <= prev) {
        firstNum += curr;
      } else {
        firstNum = firstNum - prev * 2 + curr;
      }
    }
    return firstNum;
  };

  const convertToRoman = value => {
    if (value === 0 || value < 0) {
      return "";
    }
    for (let i = 0; i < romanValue.length; i++) {
      if (value >= romanValue[i]) {
        return roman[i] + convertToRoman(value - romanValue[i]);
      }
    }
  };

  const handleButton = e => {
    switch (e.target.innerHTML) {
      case "D":
      case "C":
      case "M":
      case "V":
      case "X":
      case "L":
      case "I":
        setInputDisplay(inputDisplay + e.target.innerHTML);
        return;
      case "+":
      case "-":
      case "*":
        if (
          inputDisplay.indexOf("+") === -1 &&
          inputDisplay.indexOf("-") === -1 &&
          inputDisplay.indexOf("*") === -1 &&
          inputDisplay.length !== 0
        ) {
          setInputDisplay(inputDisplay + e.target.innerHTML);
        }
        return;
      case "=":
        evaluate(inputDisplay, convertToRoman, convertFromRoman, setInputDisplay);
        return;
      case "Delete":
        setInputDisplay("");
        return;
      case "Backspace":
        if (inputDisplay.length > 0) {
          setInputDisplay(inputDisplay.slice(0, inputDisplay.length - 1));
        }
        return;
      default:
        return;
    }
  };

  return (
    <div className="calc-container">
      <Input inputDisplay={inputDisplay} />
      <div className="row">
        <LargeButton handleButton={handleButton}>Delete</LargeButton>
        <LargeButton handleButton={handleButton}>Backspace</LargeButton>
      </div>
      <div className="row">
        <Button handleButton={handleButton}>D</Button>
        <Button handleButton={handleButton}>C</Button>
        <Button handleButton={handleButton}>M</Button>
        <Button handleButton={handleButton}>+</Button>
      </div>
      <div className="row">
        <Button handleButton={handleButton}>V</Button>
        <Button handleButton={handleButton}>X</Button>
        <Button handleButton={handleButton}>L</Button>
        <Button handleButton={handleButton}>-</Button>
      </div>
      <div className="row">
        <Button handleButton={handleButton}>I</Button>
        <LargeButton handleButton={handleButton}>=</LargeButton>
        <Button handleButton={handleButton}>*</Button>
      </div>
    </div>
  );
};

export default Calculator;
