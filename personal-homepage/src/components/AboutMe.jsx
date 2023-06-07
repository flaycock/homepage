import { Heading, Text } from "../../node_modules/@chakra-ui/react";

const AboutMe = () => {
  return (
    <>
      <Heading className="aboutMeHeading" pb={30} size="2xl">
        About Me
      </Heading>
      <Text textAlign="left">
        Hello! This is a basic website I, Freddie Laycock, have created in order
        to both coalate my personal projects into as single hosted space, as
        well as showcase my skills/information to any interested parties in a
        slightly more interesting way than a PDF.
        <br />
        <br />
        A bit about me proffesionally, I am a front-end software engineer at
        Farnell Global with a first class degree in Maths from the University of
        Sheffield. I have experience in a variety of different coding languages,
        including front-end (Javascript, React, HTML, CSS) programming, back-end
        (Node, TCL, Python), database (Informix, SQL), as well as deployment
        frameworks (Ansible and Jenkins), version control (Git) and Agile
        methodologies (Scrum). I am ambitious and hardworking, and effective at
        building strong, efficient working relationships.
        <br />
        <br />
        Other than that, I have been a keen badminton player for the past seven
        years, during which time I have represented my borough in the London
        Youth Games twice, and in general am a fan and quite profficient at most
        racquet sports, including tennis, table tennis, hockey and golf. My
        other interests include film, cooking, gaming and travelling. A
        summation of Victoria Sponge, Dark Souls, Christopher Nolan and FlixBus
        pretty much cover my most common interactions with the world.
      </Text>
    </>
  );
};

export default AboutMe;
