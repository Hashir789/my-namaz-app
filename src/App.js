import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useEffect, useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from "chart.js";
import { Doughnut } from "react-chartjs-2";
ChartJS.register(ArcElement, Tooltip, Legend);

const App = () => {
  let date = "2023-08-21T05:57:18.609Z";
  const months = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"]
  const suffix = (num) =>{
    if (num === 1 || num === 21 || num === 31) {
      return 'st'
    } else if (num === 2 || num === 22) {
        return 'nd'
    } else if (num === 3 || num === 23) {
        return 'rd'
    } else {
        return 'th'
    }    
  }
  const formatDate = (simpleDate, daysToBeAdded, arg3) => {
      let week = ''
      week = arg3 * 6;
      simpleDate = new Date(simpleDate);
      simpleDate.setDate(simpleDate.getDate() + parseInt(daysToBeAdded + week));
      const year = simpleDate.getFullYear()
      const month = months[simpleDate.getMonth()]
      const date = simpleDate.getDate()
      let dateSuffix = suffix(date)
      let modifiedDate = date + dateSuffix + ' ' + month + ' ' + year;
      return modifiedDate
  }
  const data = 
  [
    [
      [0,2,1,1,2,2,90],
      [1,1,1,1,2,1,80],
      [2,1,1,1,1,5,76],
      [3,1,6,1,1,5,23],
      [4,4,1,3,1,1,56],
      [5,1,1,1,1,7,128],
      [6,1,1,1,1,1,100]
    ],
    [
      [0,1,2,1,2,1,20],
      [1,1,2,1,2,1,30],
      [2,1,2,1,2,1,50],
      [3,1,2,1,2,1,40],
      [4,1,2,1,2,1,90],
      [5,1,2,1,2,1,87],
      [6,1,2,1,2,1,61],
    ],
    [
      [0,1,1,1,1,1,187],
      [1,0,0,0,0,0,-1],
      [2,0,0,0,0,0,-1],
      [3,0,0,0,0,0,-1],
      [4,0,0,0,0,0,-1],
      [5,0,0,0,0,0,-1],
      [6,0,0,0,0,0,-1],
    ]
  ]
  const handleClickLeft = () =>{
    if (marg !== 0) {
      if (margTop !== 0) 
      {
        setMargTop(0)
        setTimeout(()=>{setMarg(marg+100);}, 1000)
      } else {
        setMarg(marg+100);
      }
    }
  }  
  const handleClickRight = () =>{
    if (data.length - 1 !== (-marg/100)) {
      if (margTop !== 0) 
      {
        setMargTop(0)
        setTimeout(()=>{setMarg(marg-100);}, 1000)
      } else {
        setMarg(marg-100);
      }
    }
  }
  function getWeekOfMonth(date) {
    const newDate = new Date(date);
    newDate.setDate(1);
    const firstDayOfWeek = newDate.getDay();
    const dayOfMonth = date.getDate();
    const weekOfMonth = Math.ceil((dayOfMonth + firstDayOfWeek) / 7);
    return weekOfMonth;
  }
  const title = () =>{
    const week = (-marg/100) * 7;
    let newDate = new Date(date)
    newDate.setDate(newDate.getDate() + week)
    let newDate2 = new Date(date)
    let newDate3 = new Date(date)
    newDate2.setDate(newDate2.getDate() + 6 + week)
    newDate3.setDate(newDate3.getDate() + 1 + week)
    newDate3 = getWeekOfMonth(newDate3)
    if (newDate.getMonth() === newDate2.getMonth()){
      return newDate3 + suffix(newDate3) + ' week of ' + months[newDate.getMonth()]
    } else {
      return newDate3 + suffix(newDate3) + ' week of ' + months[newDate.getMonth()] + ' / 1st week of ' + months[newDate.getMonth() + 1]
    }
  }
  const color = ["#ffffff","#ff9800","#e91e63","#f44336","#009688","#0288d1","#616161","#673ab7"]
  let temp = 0;
  const [marg, setMarg] = useState(-(data.length-1)*100)
  const [margTop, setMargTop] = useState(0)
  const [tasbeeh, setTasbeeh] = useState(0)
  const [tasbeehDay, setTasbeehDay] = useState(0)
  const handleClickStats = ()=>{
    tasbeehFunction()
    if (margTop===0)
    {
      setMargTop(500)
    } else if (margTop===500)
    {
      setMargTop(0)
    }
    yValuesFunction();
  }
  function countOccurrences(arr, numberToFind) {
    let count = 0;
  
    for (let i = 0; i < arr.length; i++) {
      for (let j = 1; j < arr[i].length-1; j++) {
        if (arr[i][j] === numberToFind) {
          count++;
        }
      }
    }
    return count;
  }
  const yValuesFunction = () => {
    const temp = -marg/100;
    let returnValues = [];
    for (let numberToFind = 1; numberToFind < 8; numberToFind++){
      const occurrences = countOccurrences(data[temp], numberToFind);
      returnValues.push(occurrences)
    }
    return returnValues
  }
  const xValues = ["Level 1", "Level 2", "Level 3", "Level 4", "Level 5", "Level6", "Level 7"];
  const yValues = yValuesFunction();
  const barColors = [
    '#ff9800',
    '#e91e63',
    '#f44336',
    '#009688',
    '#0288d1',
    '#616161',
    '#673ab7',
  ];
  const dataa = {
    labels: xValues,
    datasets: [
      {
        backgroundColor: barColors,
        data: yValues
      }
    ]
  };
  const options = {
    plugins:{
      legend: {
      display: false
      }
    }
  };
  const tasbeehFunction = () =>{
    let temp = 0
    let temp2 = 0
    for (let i = 0; i < 7; i++) {
      if (data[-marg/100][i][6] !== undefined) {
        temp += data[-marg/100][i][6];
        if (data[-marg/100][i][6] !== -1){
          temp2++;
        }
      }
    }
    setTasbeeh(temp)
    setTasbeehDay(temp2)
  }
  useEffect(() => {
    tasbeehFunction()
    // eslint-disable-next-line
  }, [])
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', bgcolor: '#e6ddda' }}>
      <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden'}}>
      <Box sx={{ display: 'flex', position: 'relative', left: `${marg}vw`, transition: 'all 1s ease' }}>
      {data.map(() =>(<Box key={temp++} sx={{ width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{ width: 500, borderRadius: 5, boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)', overflow: 'hidden', bgcolor: 'white'}}>
              <Box sx={{ transition: 'all 1s ease', height: 465, width: '100%', position: 'relative', overflow: 'hidden'}}>
                <Box sx={{position: 'absolute', top: -margTop, transition: 'all 1s ease', width: '100%'}}>
              <Box pt={2} sx={{width: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#414141'}}>
                <Typography sx={{fontWeight: 'bold', fontSize: 20, fontStyle: 'italic'}}>{title()}</Typography>
              </Box>
              <Box px={2} py={1}>
                {data[-marg/100].map((label) =>(<Box key={temp++} my={2} sx={{ display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'center', color: '#414141' }}>
                  <Typography sx={{ width: '40%', fontSize: 14, fontWeight: 'bold', fontStyle: 'italic' }}>
                    {formatDate(date, ((-marg/100)+label[0]), (-marg/100))}
                  </Typography>
                  <Box sx={{ display: 'flex', flexDirection: 'row', width: '60%', alignItems: 'center', justifyContent: 'space-between' }}>
                    <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[label[1]]}}></Box>
                    <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[label[2]] }}></Box>
                    <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[label[3]]}}></Box>
                    <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[label[4]]}}></Box>
                    <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[label[5]]}}></Box>
                    <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', bgcolor: 'black', borderRadius: 2 }}><Typography sx={{ fontWeight: 'bold' }}>{label[label.length - 1]===-1?'':label[label.length - 1]}</Typography></Box>
                  </Box>
                </Box>
              ))}
              </Box>
              <Box sx={{width: '100%', height: 500, display: 'flex', alignItems: 'center', justifyContent: 'start', flexDirection: 'column'}}>
                <Box sx={{width: '100%'}} mt={6}>
                  <Typography textAlign='center' sx={{fontSize: 20, fontStyle: 'italic', fontWeight:'bold', color: '#414141'}} >Statistical Analysis of the Week</Typography>
                </Box>
                <Box sx={{display: 'flex', flexDirection: 'row'}}>
                <Box sx={{height: 250, width: 375}} m={2} my={4}>
                  <Box sx={{ width: '100%', maxHeight: '250px', maxWidth: '375px', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative'}}>                    
                    <Doughnut data={dataa} options={options} />
                    <Box sx={{display: 'flex', alignItems: 'center', justifyContent: 'center', bgcolor: 'black', width: 100, height: 100, position: 'absolute', borderRadius: 50, color: 'white', fontSize: 20, fontWeight: 'bold'}}>{tasbeeh}</Box>
                  </Box>
                </Box>
                <Box sx={{height: '100%', width: 125, display: 'flex', flexDirection: 'column', justifyContent: 'center'}}>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: '#ff9800', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Level 1</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: '#e91e63', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Level 2</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: '#f44336', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Level 3</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: '#009688', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Level 4</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: '#0288d1', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Level 5</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: '#616161', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Level 6</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: '#673ab7', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Level 7</Typography>
                  </Box>
                  <Box sx={{display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'left'}}>
                    <Box sx={{height: 10, width: 10, bgcolor: 'black', boxShadow: '0px 0px 3px 0px rgba(0,0,0,0.75)'}} mr={2}></Box>
                    <Typography sx={{ color: '#414141', fontSize: 14}}>Zikr</Typography>
                  </Box>
                </Box>
                </Box>
                <Box sx={{width: '100%'}}>
                  <Typography textAlign='center' sx={{fontSize: 20, fontStyle: 'italic', fontWeight:'bold', color: '#414141'}} >Average Result per Day</Typography>
                </Box>
                <Box sx={{width: '80%', display: 'flex', flexDirection: 'row', alignItems: 'center', justifyContent: 'space-between'}} py={2}>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[1], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{((yValues[0]/(yValues.reduce((a, b) => a + b, 0))).toFixed(2))*100}</Typography></Box>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[2], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{((yValues[1]/(yValues.reduce((a, b) => a + b, 0))).toFixed(2))*100}</Typography></Box>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[3], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{((yValues[2]/(yValues.reduce((a, b) => a + b, 0))).toFixed(2))*100}</Typography></Box>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[4], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{((yValues[3]/(yValues.reduce((a, b) => a + b, 0))).toFixed(2))*100}</Typography></Box>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[5], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{((yValues[4]/(yValues.reduce((a, b) => a + b, 0))).toFixed(2))*100}</Typography></Box>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[6], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{((yValues[5]/(yValues.reduce((a, b) => a + b, 0))).toFixed(2))*100}</Typography></Box>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: color[7], display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{((yValues[6]/(yValues.reduce((a, b) => a + b, 0))).toFixed(2))*100}</Typography></Box>
                <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', borderRadius: 2, bgcolor: 'black', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white' }}><Typography sx={{ fontWeight: 'bold' }}>{parseInt(tasbeeh/tasbeehDay)}</Typography></Box>
                </Box>
              </Box>
              </Box>
              </Box>
              <Box pb={2} pr={2} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                <Button variant='contained' style={{backgroundColor: '#414141'}} onClick={handleClickStats}>{margTop===0?'Stats':'Back'}</Button>
              </Box>
            </Box>
          </Box>))}
        </Box>
      </Box>
      <IconButton onClick={handleClickLeft} sx={{ display: marg!==0?'flex':'none', position: 'absolute', left: 0, marginLeft: 1 }}><KeyboardArrowLeftIcon sx={{ fontSize: 50 }}/></IconButton>
      <IconButton onClick={handleClickRight} sx={{ display: data.length-1!==(-marg/100)?'flex':'none', position: 'absolute', right: 0, marginRight: 1 }}><KeyboardArrowRightIcon sx={{ fontSize: 50 }}/></IconButton>
      <Box sx={{position: 'absolute', top: 0, left: 0}} mx={2} my={2}><Typography sx={{fontSize: 20, fontWeight: 'bold', fontStyle: 'italic', color: '#414141'}}>KITAAB</Typography></Box>
    </Box>
  )
}

export default App
