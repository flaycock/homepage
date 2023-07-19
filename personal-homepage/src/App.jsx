import { useState } from "react";
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
  const [mobile, setMobile] = useState(window.innerWidth <= 650);
  window.addEventListener("resize", () => {
    setMobile(window.innerWidth <= 650);
  });
  return (
    <>
      <Tabs isFitted={mobile} p="10px" align="end" variant="soft-rounded">
        <TabList>
          <Tab
            className="aboutMeTab"
            m="5px"
            fontSize={["20pt", "20pt", "15pt", "12pt"]}
            _hover={{ color: "gray.900", bg: "green.200" }}
            _selected={{ color: "white", bg: "green.400" }}
          >
            About Me
          </Tab>
          <Tab
            className="experienceTab"
            m="5px"
            fontSize={["20pt", "20pt", "15pt", "12pt"]}
            _hover={{ color: "gray.900", bg: "green.200" }}
            _selected={{ color: "white", bg: "green.400" }}
          >
            Experience
          </Tab>
          <Tab
            className="projectsTab"
            m="5px"
            fontSize={["20pt", "20pt", "15pt", "12pt"]}
            _hover={{ color: "gray.900", bg: "green.200" }}
            _selected={{ color: "white", bg: "green.400" }}
          >
            Projects
          </Tab>
          <Tab
            className="contactTab"
            m="5px"
            fontSize={["20pt", "20pt", "15pt", "12pt"]}
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
