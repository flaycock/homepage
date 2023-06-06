import { Heading, Text, Tabs, TabList, TabPanels, Tab, TabPanel } from '../node_modules/@chakra-ui/react';
import AboutMe from './AboutMe';
import Experience from './Experience';
import Projects from './Projects';
import Contact from './Contact';
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
            About Me
          </Tab>
          <Tab
            m='5px'
            _hover={{ color: 'gray.900', bg: 'green.200' }}
            _selected={{ color: 'white', bg: 'green.400' }}
          >
            Experience
          </Tab>
          <Tab
            m='5px'
            _hover={{ color: 'gray.900', bg: 'green.200' }}
            _selected={{ color: 'white', bg: 'green.400' }}
          >
            Projects
          </Tab>
          <Tab
            m='5px'
            _hover={{ color: 'gray.900', bg: 'green.200' }}
            _selected={{ color: 'white', bg: 'green.400' }}
          >
            Contact
          </Tab>
        </TabList>
        <TabPanels>
          <TabPanel>      
            <AboutMe />
          </TabPanel>
          <TabPanel>
            <Experience />
          </TabPanel>
          <TabPanel>
            <Projects />
          </TabPanel>
          <TabPanel>
            <Contact />
          </TabPanel>
        </TabPanels>
      </Tabs>
    </>
  )
}

export default App
