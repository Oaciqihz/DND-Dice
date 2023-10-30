import { useEffect, useState } from 'react';
import { Box, Button, Input, List, Select, Text } from '@chakra-ui/react';
import { CusotmIcon } from '../components/CutsomIcon';
import { getRandomInt } from '../utils/string/getRandomInt';
import { getTimeStamp } from '../utils/date';

const diceSideOptions = [
    { label: "d20", value: 20 },
    { label: "d12", value: 12 },
    { label: "d10", value: 10 },
    { label: "d8", value: 8 },
    { label: "d6", value: 6 },
    { label: "d4", value: 4 }
]

export default function IndexMobile(params) {

    let [roleAttr, setRoleAttr] = useState([]);
    let [diceObj, setDiceObj] = useState([{
        num: 1, side: 6,
    }]);
    let [rollLog, setRollLog] = useState([]);

    // 设置骰子属性
    function changeDiceObj(key, value, index) {
        diceObj[index][key] = value;
        setDiceObj([...diceObj]);
    }

    // 添加骰子
    function addDice() {
        diceObj.push({
        num: 1, side: 6
        })
        setDiceObj([...diceObj]);
    }

    // 移除骰子
    function delDice(index) {
        diceObj.splice(index, 1);
        setDiceObj([...diceObj]);
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
        let total = 0;
        let log = "";
        let rollLine = "";
        diceObj.forEach(dice => {
        const { num, side } = dice;
        rollLine = rollLine + `${num}d${side}, `
        // 获取骰子随机数
        for (let i = 0; i < num; i++) {
            const randomNum = getRandomInt(1, side);
            total += randomNum;
            log = log + randomNum + ", "
        }
        })
        // 总和 + 属性
        roleAttr.forEach(attr => {
        if (attr.type === "add") {
            total += attr.value;
            log = log+"+"+attr.value;
        }else{
            total -= attr.value;
            log = log+"-"+attr.value;
        }
        })
        // 添加到历史记录中
        rollLog.push({
        time: getTimeStamp(),
        rollLine: rollLine,
        total: `${log}`,
        totalNum: total
        });
        setRollLog([...rollLog]);
    }

    // 下拉Log栏
    function scrollLog() {
        const dom = document.querySelector(".List");
        dom.scrollTop = dom.scrollHeight;
    }

    // 监听rollLog更新下拉Log栏
    useEffect(() => {
        rollLog && rollLog.length !== 0 && scrollLog();
    },[rollLog])
    
    return (
        <div>
            {/* 角色设置 */}
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
                    <Input 
                        height={30} 
                        min={1} 
                        type="number" 
                        value={attr.value} 
                        onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = inputValue !== "" ? Number(inputValue) : "";
                        changeRoleAttr(index, "value", newValue)
                        }}
                    />
                    <Button className="btn-reduce" onClick={() => delRoleAttr(index)}>
                        {CusotmIcon({key: "reduce"})}
                    </Button>
                </div>
                )
            }
            <Button mt={5} onClick={addRoleAttr}>ADD ROLE ATTRIBUTES</Button>


            {/* 骰子设置 */}
            <Text 
                mt="30px"
                fontSize={30} 
                fontWeight={600} 
                fontFamily="Times New Roman" 
                textShadow="1px 2px #fff"
            >CHOOSE YOUR DICE</Text>
            {
                diceObj.map((dice, index) => 
                <div className="choose-dice" key={index}>
                    {/* 骰子个数 */}
                    <Input 
                    height={30}
                    min={1}
                    type="number" 
                    value={dice.num} 
                    onChange={(e) => {
                        const inputValue = e.target.value;
                        const newValue = inputValue !== "" ? Number(inputValue) : "";
                        changeDiceObj("num", newValue, index);
                    }} 
                    />
                    {/* 骰子面数 */}
                    <Select 
                    height={30}
                    value={dice.side} 
                    onChange={(e) => changeDiceObj("side", Number(e.target.value), index)}
                    >
                    {
                        diceSideOptions.map(e => 
                        <option value={e.value} key={e.value}>{e.label}</option>
                        )
                    }
                    </Select>
                    {/* 移除骰子 */}
                    {
                    diceObj.length !== 1 &&
                    <Button className="btn-reduce" onClick={() => delDice(index)}>
                        {CusotmIcon({key: "reduce"})}
                    </Button>
                    }
                </div>
                )
            }
            <Box display="flex" flexDirection="column" alignItems="center" mt="20px">
                {/* 添加骰子 */}
                <Button 
                minW="30px" 
                onClick={addDice}
                >ADD DICE</Button>
                {/* 当前骰子点数 */}
                {
                rollLog.length !== 0 &&
                <Text 
                    color="#a52714"
                    fontSize={25} 
                    fontWeight={600}
                    fontFamily="Times New Roman" 
                    textShadow="1px 1px #fff"
                >
                    {rollLog[rollLog.length - 1].totalNum}
                </Text>
                }
                {/* 掷骰子 */}
                <Button 
                className="btn-roll"
                w="200px"
                h="40px"
                padding="0 20px"
                margin="10px auto 0"
                bg="#a52714" 
                border="1px solid #000" 
                borderRadius="40px"
                boxShadow="1px 1px 5px #000c"
                fontSize="23px"
                fontWeight="800"
                color="#fff" 
                fontFamily="Times New Roman" 
                textShadow="1px 1px #000" 
                onClick={rollDice}
                >Roll</Button>
            </Box>

            {/* 骰子日志打印 */}
            {
                rollLog.length !== 0 &&
                <>
                <Text 
                    mt="30px"
                    fontSize={30} 
                    fontWeight={600} 
                    fontFamily="Times New Roman" 
                    textShadow="1px 2px #fff"
                >DICE ROLL LOG</Text>
                <List className="List" maxH="230px" overflow="hidden" overflowY="auto" bg="#fff" border="1px" borderRadius="10px" borderColor="#a52714" w="80%" margin="0 auto" padding="10px" >
                    {
                        rollLog.map((log, index) =>           
                        <li key={index} style={{ borderBottom: "1px solid #000" }}>
                            <Text fontStyle="italic">{log.time}</Text>
                            <Text>Rolling line: <strong>{log.rollLine}</strong></Text>
                            <Text>{log.total}</Text>
                            <Text>TOTAL: <span style={{color:"#a52714", fontSize: "20px", lineHeight: "20px", fontWeight: "800"}}>{log.totalNum}</span></Text>
                        </li>
                        )
                    }
                </List>
                </>
            }
        </div>
    )
}