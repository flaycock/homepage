import { Heading, Text, Link } from "../node_modules/@chakra-ui/react";

const Contact = () => {
  return (
    <>
      <Heading pb={30} size="2xl">
        Contact
      </Heading>
      <Text>
        For any professional enquiries, please contact me on:
        <br />
        <br />
        Email:&nbsp;
        <Link
          _hover={{
            color: "gray.900",
            bg: "green.200",
            borderRadius: "5px",
            p: "3px",
          }}
          target="_blank"
          href="mailto:freddielaycock97@gmail.com"
        >
          freddielaycock97@gmail.com
        </Link>
        <br />
        <br /> Alternatively, check out my&nbsp;
        <Link
          _hover={{
            color: "gray.900",
            bg: "green.200",
            borderRadius: "5px",
            p: "3px",
          }}
          target="_blank"
          href="https://www.linkedin.com/in/freddie-laycock-a23974171/"
        >
          LinkedIn
        </Link>
        &nbsp;or my&nbsp;
        <Link
          _hover={{
            color: "gray.900",
            bg: "green.200",
            borderRadius: "5px",
            p: "3px",
          }}
          target="_blank"
          href="https://github.com/flaycock"
        >
          GitHub profile
        </Link>
      </Text>
    </>
  );
};

export default Contact;
