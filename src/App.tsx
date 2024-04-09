import { useState } from 'react'
import './App.css'

function App() {
  const [expression, setExpression] = useState('0');
  const [answer, setAnswer] = useState('');

  const isOperator = (symbol: string) => {
    return ['+', '-', '*', '/'].includes(symbol);
  };
  const isTimesDividePlus = (symbol: string) => {
    return ['*', '/','+'].includes(symbol);
  }

  const buttonClicked=(symbol: string)=>{
    
    if (symbol =="clear"){  //clear 
      setExpression('0');
      setAnswer('');
    }
    else if (isOperator(symbol)){          //check operator
      if(isOperator(expression.charAt(expression.length-1)) && isOperator(expression.charAt(expression.length-2))){  // if two last char is operator, remove them and replace with new operator
        setExpression((expression.slice(0, -2) + symbol));
      }
      else if(isTimesDividePlus(symbol)&& isOperator(expression.charAt(expression.length-1))){  //if last char is operator, replace it with timesdivideplus operator
        setExpression(expression.slice(0,-1)+ symbol);
      }
      else{
        setExpression(expression+symbol);
      }
    }
    else if (isOperator(symbol)){ //check operator
      setExpression(expression+symbol);
    }         
    else if (symbol === '0'){           //check first number if its zero
      if(expression.charAt(0) !== '0'){
        setExpression(expression + symbol);
      }
    }
    else if (symbol === '='){       //calculate
      equalTo();
    }
    else if(symbol === '.'){        //check if last number has decimal (then dont add)
      const lastNum = expression.split(/[-+*/]/g).pop();
      if(lastNum?.includes('.')) return;
      setExpression(expression + symbol);
      
    }
    else{   //add number (check if first number is zero, then remove it and add new number)
      if(expression.charAt(0) === '0'){
        setExpression(expression.slice(1)+symbol);
      }
      else{
        setExpression(expression + symbol);
      }
    }
  };
  const equalTo = () => {
    if(isOperator(expression.charAt(expression.length-1))) return;
    console.log(expression)
   
    if(answer !== ''&&isOperator(expression.charAt(0))){
      //setExpression(answer+expression);
      setAnswer(eval(answer+expression) as string);
    }
    else{
      setAnswer(eval(expression) as string);
      
    }
    setExpression('');
  }
  ;// changed id
  return (
    <>
    <div id="whole-calculator"> 
      <div className="rec">
      <div id="display">
        <div id="expression">{expression}</div>
        <div id="answer">{answer}</div>
      </div>
      
        <div id="btn">
        <button id="zero" onClick={()=>buttonClicked("0")} className='dark-grey'>0</button>
        <button id="one" onClick={()=>buttonClicked("1")} className='dark-grey'>1</button>
        <button id="two" onClick={()=>buttonClicked("2")} className='dark-grey'>2</button>
        <button id="three" onClick={()=>buttonClicked("3")} className='dark-grey'>3</button>
        <button id="four" onClick={()=>buttonClicked("4")} className='dark-grey'>4</button>
        <button id="five" onClick={()=>buttonClicked("5")} className='dark-grey'>5</button>
        <button id="six" onClick={()=>buttonClicked("6")} className='dark-grey'>6</button>
        <button id="seven" onClick={()=>buttonClicked("7")} className='dark-grey'>7</button>
        <button id="eight" onClick={()=>buttonClicked("8")} className='dark-grey'>8</button>
        <button id="nine" onClick={()=>buttonClicked("9")} className='dark-grey'>9</button>
        <button id="add" onClick={()=>buttonClicked("+")} className='light-grey'>+</button>
        <button id="subtract" onClick={()=>buttonClicked("-")} className='light-grey'>-</button>
        <button id="multiply" onClick={()=>buttonClicked("*")} className='light-grey'>x</button>
        <button id="divide" onClick={()=>buttonClicked("/")} className='light-grey'>/</button>
        <button id="decimal" onClick={()=>buttonClicked(".")} className='dark-grey'>.</button>
        <button id="clear" onClick={()=>buttonClicked("clear")} className='red'>AC</button>
        <button id="equals" onClick={()=>buttonClicked("=")} className='blue'>=</button>
      </div>
      </div>
    </div>
    </>
  )
}

export default App
