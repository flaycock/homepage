import {
  Heading,
  Text,
  SimpleGrid,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "../../node_modules/@chakra-ui/react";
import { useState } from "react";
import Wumble from "../projects/Wumble/Wumble";

const Projects = () => {
  const [project, setProject] = useState("");
  return (
    <>
      {project === "Wumble" ? (
        <Wumble />
      ) : (
        <>
          <Heading className="projectsHeading" pb={30} size="2xl">
            Projects
          </Heading>
          <Text>
            This section contains a few of my personal projects that I would
            like to share, along with the GitHub links to the source code.
          </Text>
          <SimpleGrid pt={30} columns={3} spacing={10}>
            <Card textAlign="center" alignItems="center" bg="orange.200">
              <CardHeader>
                <Heading size="md">Cat Petter</Heading>
              </CardHeader>
              <CardBody>
                <Text textAlign="left">
                  A simple mouse-clicking game inspired by the popuplar Cookie
                  Clicker. Pet the cat by clicking on it to gain pets, then
                  spend those points on power-ups to gain more pets!
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("CatPetter")}>Click here to Play!</Button>
              </CardFooter>
            </Card>
            <Card textAlign="center" alignItems="center" bg="orange.200">
              <CardHeader>
                <Heading size="md">Wumble</Heading>
              </CardHeader>
              <CardBody>
                <Text textAlign="left">
                  A simple word-guessing game inspired by the popular Wordle.
                  Guess the 4-letter word using clues about correct letters and
                  positions to test your literary skill!
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("Wumble")}>
                  Click here to Play!
                </Button>
              </CardFooter>
            </Card>
            <Card textAlign="center" alignItems="center" bg="orange.200">
              <CardHeader>
                <Heading size="md">Infectious Disease Model</Heading>
              </CardHeader>
              <CardBody>
                <Text textAlign="left">
                  A simple, spatial, visial model of an infectious disease and
                  how it can spread through a population over time. Change the
                  parameters of the model, such as infection rate, population
                  and step-time, and watch as the disease spreads throughout
                  until all are infected.
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("InfectiousDiseaseModel")}>Click here to Play!</Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Projects;
