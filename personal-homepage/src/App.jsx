import { Heading, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '@chakra-ui/react';
import Home from './Home';
import CV from './CV';
import Projects from './Projects';
import './App.css';

const App = () => {
  return (
    <>
      <Tabs p='10px' align='end' variant='soft-rounded'>
        <TabList>
          <Tab
            m='5px'
            _hover={{ color: 'gray.900', bg: 'green.200' }}
            _selected={{ color: 'white', bg: 'green.400' }}  
          >
            Home
          </Tab>
          <Tab
            m='5px'
            _hover={{ color: 'gray.900', bg: 'green.200' }}
            _selected={{ color: 'white', bg: 'green.400' }}
          >
            CV
          </Tab>
          <Tab
            m='5px'
            _hover={{ color: 'gray.900', bg: 'green.200' }}
            _selected={{ color: 'white', bg: 'green.400' }}
          >
            Projects
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>      
            <Home />
          </TabPanel>
          <TabPanel>
            <CV />
          </TabPanel>
          <TabPanel>
            <Projects />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default App
