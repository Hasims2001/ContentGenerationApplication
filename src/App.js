import { Stack } from '@chakra-ui/react';
import { ContentBox,  } from './Components/ContentBox';
import { Navbar,  } from './Components/Navbar';

function App() {
  return (
    <div className="App">
    <Stack gap={12} mb={12} px={10}>
    <Navbar />
     <ContentBox />
    </Stack>
    </div>
  );
}

export default App;
