import React from 'react';
import Box from '@mui/material/Box';

function InfoEntry({keyString, data}) {

  // console.log("key", keyString)

  return <Box className='border-stone-500 border-solid rounded-lg my-2'>{keyString} : {data}</Box>;
}

export default InfoEntry;
