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
import Idm from "../projects/Idm/Idm";
import CatPetter from "../projects/CatPetter/CatPetter";
import PixelArt from "../projects/PixelArt/PixelArt";
import SequenceGuesser from "../projects/SequenceGuesser/SequenceGuesser";

const Projects = () => {
  const [project, setProject] = useState("");

  const loadProject = (project) => {
    return (
      <>
        {
          {
            Wumble: <Wumble />,
            Idm: <Idm />,
            CatPetter: <CatPetter />,
            PixelArt: <PixelArt />,
            SequenceGuesser: <SequenceGuesser />,
          }[project]
        }
        <Button
          className="projectsReturn"
          mt={10}
          onClick={() => setProject("")}
        >
          Back to Projects
        </Button>
      </>
    );
  };

  return (
    <>
      {project != "" ? (
        loadProject(project)
      ) : (
        <>
          <Heading
            className="projectsHeading"
            pb={10}
            size={["4xl", "4xl", "3xl", "2xl"]}
          >
            Projects
          </Heading>
          <Text fontSize={["18pt", "18pt", "15pt", "13pt"]}>
            This section contains a few of my personal projects that I would
            like to share, along with the GitHub links to the source code.
          </Text>
          <SimpleGrid pt={10} columns={[1, 1, 2, 3]} spacing={5}>
            <Card
              textAlign="center"
              alignItems="center"
              bg="orange.200"
              opacity={0.8}
              boxShadow="lg"
            >
              <CardHeader>
                <Heading size={["2xl", "2xl", "lg", "md"]}>Cat Petter</Heading>
              </CardHeader>
              <CardBody>
                <Text
                  textAlign="left"
                  fontSize={["18pt", "18pt", "15pt", "13pt"]}
                >
                  A simple mouse-clicking game inspired by the popuplar Cookie
                  Clicker. Pet the cat by clicking on it to gain pets, then
                  spend those points on power-ups to gain more pets!
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("CatPetter")}>
                  Pet Some Cats
                </Button>
              </CardFooter>
            </Card>
            <Card
              textAlign="center"
              alignItems="center"
              bg="orange.200"
              opacity={0.8}
              boxShadow="lg"
            >
              <CardHeader>
                <Heading size={["2xl", "2xl", "lg", "md"]}>Wumble</Heading>
              </CardHeader>
              <CardBody>
                <Text
                  textAlign="left"
                  fontSize={["18pt", "18pt", "15pt", "13pt"]}
                >
                  A simple word-guessing game inspired by the popular Wordle.
                  Guess the 4-letter word using clues about correct letters and
                  positions to test your literary skill!
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("Wumble")}>
                  Guess Some Words
                </Button>
              </CardFooter>
            </Card>
            <Card
              textAlign="center"
              alignItems="center"
              bg="orange.200"
              opacity={0.8}
              boxShadow="lg"
            >
              <CardHeader>
                <Heading size={["2xl", "2xl", "lg", "md"]}>
                  Infectious Disease Model
                </Heading>
              </CardHeader>
              <CardBody>
                <Text
                  textAlign="left"
                  fontSize={["18pt", "18pt", "15pt", "13pt"]}
                >
                  A simple, spatial, visial model of an infectious disease and
                  how it can spread through a population over time. Change
                  parameters such as infection rate, population and step-time.
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("Idm")}>
                  Infect Some People
                </Button>
              </CardFooter>
            </Card>
            <Card
              textAlign="center"
              alignItems="center"
              bg="orange.200"
              opacity={0.8}
              boxShadow="lg"
            >
              <CardHeader>
                <Heading size={["2xl", "2xl", "lg", "md"]}>Pixel Art</Heading>
              </CardHeader>
              <CardBody>
                <Text
                  textAlign="left"
                  fontSize={["18pt", "18pt", "15pt", "13pt"]}
                >
                  Select colour and pattern preferences, and watch as
                  randomly-generated pieces of art are created!
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("PixelArt")}>
                  Generate Some Art
                </Button>
              </CardFooter>
            </Card>
            <Card
              textAlign="center"
              alignItems="center"
              bg="orange.200"
              opacity={0.8}
              boxShadow="lg"
            >
              <CardHeader>
                <Heading size={["2xl", "2xl", "lg", "md"]}>
                  Sequence Guesser
                </Heading>
              </CardHeader>
              <CardBody>
                <Text
                  textAlign="left"
                  fontSize={["18pt", "18pt", "15pt", "13pt"]}
                >
                  Input a number sequence and watch the code use machine
                  learning to predict what numbers come next!
                </Text>
              </CardBody>
              <CardFooter>
                <Button onClick={() => setProject("SequenceGuesser")}>
                  Guess Some Sequences
                </Button>
              </CardFooter>
            </Card>
            <Card
              textAlign="center"
              alignItems="center"
              bg="orange.200"
              opacity={0.8}
              boxShadow="lg"
            >
              <CardHeader>
                <Heading size={["2xl", "2xl", "lg", "md"]}>
                  Light Explorer
                </Heading>
              </CardHeader>
              <CardBody>
                <Text
                  textAlign="left"
                  fontSize={["18pt", "18pt", "15pt", "13pt"]}
                >
                  Completely fill in the grid with your light ray to win! Use
                  arrow keys to direction your light, and cover every square
                  without hitting into yourself!
                </Text>
              </CardBody>
              <CardFooter>
                <Button>Coming Soon!</Button>
              </CardFooter>
            </Card>
          </SimpleGrid>
        </>
      )}
    </>
  );
};

export default Projects;
