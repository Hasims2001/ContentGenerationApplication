import { Box, Text } from '@chakra-ui/react'
import React, { memo } from 'react'

function HistoryBox({history, current}){
  return (
    <Box px={8} bg={'gray.100'} borderRadius={"0 .5rem .5rem 0"}>
      {history.map((item, ind)=>
       {
        if(item.type === current){
          return  (
            <Box key={ind} py={4}>
            <Text px={6} py={1}>User: {item.query}</Text>
            <Text px={6} py={1}>System: {item.content}</Text>
            </Box>
          )
        }
       }
      )}
    </Box>
  )
}

export default memo(HistoryBox);
