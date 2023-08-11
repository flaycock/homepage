import {
  Heading,
  Text,
  Accordion,
  Box,
  AccordionItem,
  AccordionButton,
  AccordionPanel,
  AccordionIcon,
} from "../../node_modules/@chakra-ui/react";

const Experience = () => {
  return (
    <>
      <Heading
        className="experienceHeading"
        pb={30}
        size={["4xl", "4xl", "3xl", "2xl"]}
      >
        Experience
      </Heading>
      <Text fontSize={["18pt", "18pt", "15pt", "13pt"]}>
        Below is a small summary of my software developer career, including the
        roles I have taken up and a brief description of what I was doing in
        each:
      </Text>
      <Accordion allowToggle pt={10}>
        <AccordionItem>
          <h2>
            <AccordionButton _hover={{ color: "gray.900", bg: "green.200" }}>
              <Box
                as="span"
                flex="1"
                borderRadius="5px"
                fontSize={["18pt", "18pt", "15pt", "13pt"]}
                textAlign="left"
              >
                2022-Present: Farnell Global
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            p={6}
            textAlign="left"
            fontSize={["18pt", "18pt", "15pt", "13pt"]}
          >
            I currently am a front-end software engineer for Farnell Global,
            maintaining eCommerce and implementing new features. Types of work I
            participate in include:
            <br />
            <br />
            <ul>
              <li>
                Maintaining the existing codebase, integrating new features and
                fixing defects
              </li>
              <li>
                Testing new ideas and potential features using AB tests and
                Adobe Target to measure performance and interactivity
              </li>
              <li>
                Support the creation and set up of the new, headless
                architecture using React and GraphQL
              </li>
              <li>
                Create and expand an in-house bespoke Desk Booking application,
                created entirely by the front-end developers for use in the new
                office utilising React and NodeJs. This is in the process of
                being expanded to other offices around the world
              </li>
            </ul>
            <br />
            Currently my main focus is our new Raspberry Pi storefront page.
            This is a brand new, flagship page for all our Raspberry Pi
            products, and I have been leading this project for the past 6
            months, building it from the ground up in order to improve customer
            engagement and to better showcase our products. This project has
            been using mainly Javascript in combination with API work.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _hover={{ color: "gray.900", bg: "green.200" }}>
              <Box
                as="span"
                flex="1"
                fontSize={["18pt", "18pt", "15pt", "13pt"]}
                textAlign="left"
              >
                2021-2022: Helyx SIS
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            p={6}
            textAlign="left"
            fontSize={["18pt", "18pt", "15pt", "13pt"]}
          >
            I was a software engineer for Helyx SIS, developing secure
            geospatial information systems to clients including governmental as
            well as commercial industries. My work encompassed a wide range of
            areas, including:
            <br />
            <br />
            <ul>
              <li>
                Creating bespoke applications using technologies such as React
                to suit the clients&apos; needs
              </li>
              <li>
                Building geospatial systems from the ground up, processing large
                quantities of data in an easy-to-read format and allowing
                manipulation for business purposes
              </li>
              <li>
                Analysing different methodologies to create the best-suited
                system for the client, including, for example, different data
                transfer protocols, and containerisation/orchestration tooling
              </li>
            </ul>
            <br />
            An example of a project I took charge on was creating a web
            application using React that could be deployed to a closed, isolated
            environment using Docker containers and Ansible tasking. This system
            allowed the user to view what data sources were currently available
            locally and remotely, summaries of these sources, and the ability to
            link up with another application in order to request remote
            resources.
          </AccordionPanel>
        </AccordionItem>
        <AccordionItem>
          <h2>
            <AccordionButton _hover={{ color: "gray.900", bg: "green.200" }}>
              <Box
                as="span"
                flex="1"
                fontSize={["18pt", "18pt", "15pt", "13pt"]}
                textAlign="left"
              >
                2019-2021: SG Digital
              </Box>
              <AccordionIcon />
            </AccordionButton>
          </h2>
          <AccordionPanel
            p={6}
            textAlign="left"
            fontSize={["18pt", "18pt", "15pt", "13pt"]}
          >
            I was a Level 2 Software Engineer, part of the Paddy Power Betfair
            (PPB) customer team, and my role was to function as a full-stack
            developer, completing a large variety of tasks using numerous
            technologies and working to create/improve back-office systems that
            enable PPB to run smoothly and effectively. My core responsibilities
            were:
            <br />
            <br />
            <ul>
              <li>
                Listening to the customer and providing solutions based on
                business requirements
              </li>
              <li>
                Implementing these solutions into the PPB system, ranging from
                database improvements, new backend features and front-end
                streamlining
              </li>
              <li>
                Helping to test and deploy these code changes to PPB systems and
                supporting the client through this whole process
              </li>
            </ul>
            <br />
            An example of a project I spear-headed was creating an automatic
            application details board to display version information, past and
            present, for each application we provide to help both us and our
            clients keep track of what changes have been implemented and when.
            This involved using a Python script to collect the data, and a
            combination of Jenkins tasks and Ansible/Jinja templating to process
            the data and create a webpage displaying it.
          </AccordionPanel>
        </AccordionItem>
      </Accordion>
    </>
  );
};

export default Experience;
