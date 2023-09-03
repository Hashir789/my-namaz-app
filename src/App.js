import { Box, Button, IconButton, Typography } from '@mui/material'
import React, { useState } from 'react'
import KeyboardArrowRightIcon from '@mui/icons-material/KeyboardArrowRight';
import KeyboardArrowLeftIcon from '@mui/icons-material/KeyboardArrowLeft';

const App = () => {
  let date = "2023-08-28T05:57:18.609Z";
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
      [0,2,1,1,2,2,75],
      [1,1,1,1,2,1,147],
      [2,1,1,1,1,5,87],
      [3,1,1,1,1,5,107],
      [4,1,1,1,1,1,124],
      [5,1,1,1,1,1,166],
      [6,0,0,0,0,0,0]
    ],
    [
      [0,0,0,0,0,0,0],
      [1,0,0,0,0,0,0],
      [2,0,0,0,0,0,0],
      [3,0,0,0,0,0,0],
      [4,0,0,0,0,0,0],
      [5,0,0,0,0,0,0],
      [6,0,0,0,0,0,0],
    ]
  ]
  const handleClickLeft = () =>{
    if (marg !== 0) {
      setMarg(marg+100);
    }
  }  
  const handleClickRight = () =>{
    if (data.length - 1 !== (-marg/100)) {
      setMarg(marg-100);
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
  const [marg, setMarg] = useState(0)
  return (
    <Box sx={{ width: '100vw', height: '100vh', display: 'flex', alignItems: 'center', justifyContent: 'center', position: 'relative', bgcolor: '#e6ddda' }}>
      <Box sx={{ width: '100vw', height: '100vh', overflow: 'hidden' }}>
      <Box sx={{ display: 'flex', position: 'relative', left: `${marg}vw`, transition: 'all 1s ease' }}>
      {data.map(() =>(<Box key={temp++} sx={{ width: '100vw', height: '100vh', flexShrink: 0, display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <Box sx={{width: 500, bgcolor: 'white', borderRadius: 5, boxShadow: '0px 0px 10px 0px rgba(0,0,0,0.75)'}}>
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
                    <Box sx={{height: 40, width: 40, boxShadow: '0px 0px 5px 0px rgba(0,0,0,0.75)', display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', bgcolor: 'black', borderRadius: 2 }}><Typography sx={{ fontWeight: 'bold' }}>{label[label.length - 1]===0?'':label[label.length - 1]}</Typography></Box>
                  </Box>
                </Box>))}
              <Box my={1} sx={{display: 'flex', alignItems: 'center', justifyContent: 'end'}}>
                <Button variant='contained' style={{backgroundColor: '#414141'}}>Stats</Button>
              </Box>
              </Box>
            </Box>
          </Box>))}
        </Box>
      </Box>
      <IconButton onClick={handleClickLeft} sx={{ display: marg!==0?'flex':'none', position: 'absolute', left: 0, marginLeft: 1 }}><KeyboardArrowLeftIcon sx={{ fontSize: 50 }}/></IconButton>
      <IconButton onClick={handleClickRight} sx={{ display: data.length-1!==(-marg/100)?'flex':'none', position: 'absolute', right: 0, marginRight: 1 }}><KeyboardArrowRightIcon sx={{ fontSize: 50 }}/></IconButton>
    </Box>
  )
}

export default App
