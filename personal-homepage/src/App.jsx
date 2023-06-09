import {
  Tabs,
  TabList,
  TabPanels,
  Tab,
  TabPanel,
} from "../node_modules/@chakra-ui/react";
import AboutMe from "./components/AboutMe";
import Experience from "./components/Experience";
import Projects from "./components/Projects";
import Contact from "./components/Contact";
import "./App.css";

const App = () => {
  // Something to investigate; set default tab to open at certain index
  // so when returning from a Project I am returned to Projects tab instead
  // of the About Me tab
  return (
    <>
      <Tabs p="10px" align="end" variant="soft-rounded">
        <TabList>
          <Tab
            className="aboutMeTab"
            m="5px"
            _hover={{ color: "gray.900", bg: "green.200" }}
            _selected={{ color: "white", bg: "green.400" }}
          >
            About Me
          </Tab>
          <Tab
            className="experienceTab"
            m="5px"
            _hover={{ color: "gray.900", bg: "green.200" }}
            _selected={{ color: "white", bg: "green.400" }}
          >
            Experience
          </Tab>
          <Tab
            className="projectsTab"
            m="5px"
            _hover={{ color: "gray.900", bg: "green.200" }}
            _selected={{ color: "white", bg: "green.400" }}
          >
            Projects
          </Tab>
          <Tab
            className="contactTab"
            m="5px"
            _hover={{ color: "gray.900", bg: "green.200" }}
            _selected={{ color: "white", bg: "green.400" }}
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
  );
};

export default App;
