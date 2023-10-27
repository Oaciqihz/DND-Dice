import { Box, Button, Input, List, Select, Text } from '@chakra-ui/react';
import './App.css';
import "./style/App.scss";
import { useState } from 'react';
import { getRandomInt } from './utils/string/getRandomInt';
import { CusotmIcon } from './components/CutsomIcon';
import { getTimeStamp } from './utils/date';

function App() {

  const diceSideOptions = [
    { label: "d20", value: 20 },
    { label: "d12", value: 12 },
    { label: "d10", value: 10 },
    { label: "d8", value: 8 },
    { label: "d6", value: 6 },
    { label: "d4", value: 4 }
  ]
  
  let [roleAttr, setRoleAttr] = useState([]);
  let [diceObj, setDiceObj] = useState({
    num: 1, side: 6,
  });
  let [rollLog, setRollLog] = useState([]);

  function changeDiceObj(key, value) {
      diceObj[key] = value;
      setDiceObj({...diceObj});
  }

  // 添加角色属性
  function addRoleAttr() {
    roleAttr.push({
      type: "add",
      value: 1
    });
    setRoleAttr([...roleAttr]);
  }

  // 修改角色属性
  function changeRoleAttr(index, key, value) {
    roleAttr[index][key] = value;
    setRoleAttr([...roleAttr]);
  }

  // 移除角色属性
  function delRoleAttr(index) {
    roleAttr.splice(index, 1);
    setRoleAttr([...roleAttr]);
  }

  // 掷骰子
  function rollDice() {
    const { num, side } = diceObj;
    let total = 0;
    let log = "";
    // 获取骰子随机数
    for (let i = 0; i < num; i++) {
      const randomNum = getRandomInt(1, side);
      total += randomNum;
      log = log + randomNum + ","
    }
    // 总和 + 属性
    roleAttr.forEach(attr => {
      if (attr.type === "add") {
        total += attr.value;
        log = log+"+ "+attr.value;
      }else{
        total -= attr.value;
        log = log+"- "+attr.value;
      }
    })
    // 添加到历史记录中
    rollLog.push({
      time: getTimeStamp(),
      rollLine: `${num}d${side}`,
      total: `${log}`,
      totalNum: total
    });
    setRollLog([...rollLog]);
  }

  return (
    <div className="App">

      <Text 
        fontSize={30} 
        fontWeight={600} 
        fontFamily="Times New Roman" 
        textShadow="1px 2px #fff"
      >ROLE ATTRIBUTES</Text>

      {
        roleAttr.map((attr, index) => 
          <div className="role" key={index}>
              <Select height={30} value={attr.type} onChange={(e) => changeRoleAttr(index, "type", e.target.value)}>
                <option value="add">+</option>
                <option value="reduce">-</option>
              </Select>
              <Input height={30} min={1} type="number" value={attr.value} onChange={(e) => changeRoleAttr(index, "value", Number(e.target.value))} />
              <Button className="btn-reduce" onClick={() => delRoleAttr(index)}>
                {CusotmIcon({key: "reduce"})}
              </Button>
          </div>
        )
      }
      <Button mt={5} onClick={addRoleAttr}>ADD ROLE ATTRIBUTES</Button>

      <Text 
        mt="30px"
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
          {
            diceSideOptions.map(e => 
              <option value={e.value} key={e.value}>{e.label}</option>
            )
          }
        </Select>
        <Button onClick={rollDice}>Roll</Button>
      </div>

      <Text 
        mt="30px"
        fontSize={30} 
        fontWeight={600} 
        fontFamily="Times New Roman" 
        textShadow="1px 2px #fff"
      >DICE ROLL LOG</Text>
      <List bg="#fff" border="1px" borderRadius="10px" borderColor="#a52714" w="80%" margin="0 auto" padding="0 10px" >
        {
          rollLog.map((log, index) =>           
            <li key={index} style={{ borderBottom: "1px solid #000" }}>
              <Text fontStyle="italic">{log.time}</Text>
              <Text>Rolling line: <strong>{log.rollLine}</strong></Text>
              <Text>{log.total}</Text>
              <Text>TOTAL: <span style={{color:"#a52714"}}>{log.totalNum}</span></Text>
            </li>
          )
        }
      </List>
    </div>
  );
}

export default App;
