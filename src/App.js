import { Button, Input, Select, Text } from '@chakra-ui/react';
import './App.css';
import "./style/App.scss";
import { useState } from 'react';
import { getRandomInt } from './utils/string/getRandomInt';

function App() {

  let [diceObj, setDiceObj] = useState({
    num: 1,
    side: 6,
  })

  function changeDiceObj(key, value) {
      diceObj[key] = value;
      setDiceObj({...diceObj});
  }

  // 掷骰子
  function rollDice() {
    const { num, side } = diceObj;
    let total = 0;
    for (let i = 0; i < num; i++) {
      // 获取随机数
      total += getRandomInt(1, side);
    }
    console.log(total);
  }

  return (
    <div className="App">
      <Text 
        fontSize={30} 
        fontWeight={600} 
        fontFamily="Times New Roman" 
        textShadow="1px 2px #fff"
      >CHOOSE YOUR DICE</Text>
      <div className="choose-dice">
        {/* 骰子个数 */}
        <Input 
          min={1}
          type="number" 
          value={diceObj.num} 
          onChange={(e) => changeDiceObj("num", Number(e.target.value))} 
        />
        {/* 骰子面数 */}
        <Select 
          value={diceObj.side} 
          onChange={(e) => changeDiceObj("side", e.target.value)}
        >
          <option value={20}>20</option>
          <option value={12}>12</option>
          <option value={10}>10</option>
          <option value={8}>8</option>
          <option value={6}>6</option>
          <option value={4}>4</option>
        </Select>
        <Button onClick={rollDice}>Roll</Button>
      </div>
    </div>
  );
}

export default App;
