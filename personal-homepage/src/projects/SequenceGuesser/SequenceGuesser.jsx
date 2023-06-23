import { useState } from "react";
import {
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  Button,
} from "../../../node_modules/@chakra-ui/react";
import "./SequenceGuesser.css";

const SequenceGuesser = () => {
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState([0, 0, 0, 0, 0]);
  const [msg, setMsg] = useState('');
  const [output, setOutput] = useState([0,0]);

  const validateInput = () => {
      let newInputs = inputs;
      let valid = true;
      document.querySelectorAll('#sequenceInputs [id *="sequence_"]').forEach(input => {
          let value = parseInt(input.value);
          if (0 <= input <= 99) {
              let position = parseInt(input.id.split('_')[1])-1;
              newInputs[position] = value;
          } else {
              valid = false;
          }
      });
      if (valid) {
          setInputs(newInputs);
          setSubmitted(true);
          setMsg('');
          predictSequence();
      } else {
        setMsg('Error submitting sequence. Please check your inputs and try again');
      }
  };

  const predictSequence = () => {
      setOutput([1,2]);
  }

  return (
    <div id="sequenceGuesser">
      <Heading className="projectsHeading" pb={10} size="2xl">
        Sequence Guesser
      </Heading>
      <Text size="xl">
        This program uses Machine Learning to predict what the 2 numbers are in
        any 5-number sequence you provide. It has a pre-trained model, but also
        learns from sequences you input in yourself.
      </Text>
      <Text id="sequenceError" m="10px" size="xl" fontSize="16pt" color="red.400">
        {msg}
      </Text>
      {!submitted ? (
        <>
          <Heading p={10} size="lg">
            Input your 5-number sequence below!
          </Heading>
          <div id="sequenceInputs">
            <NumberInput
              id="sequence_1"
              fontSize={60}
              size="xl"
              type="number"
              min={0}
              max={99}
              width={44}
              height={16}
              textAlign="center"
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              id="sequence_2"
              fontSize={60}
              size="xl"
              type="number"
              min={0}
              max={99}
              width={44}
              height={16}
              textAlign="center"
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              id="sequence_3"
              fontSize={60}
              size="xl"
              type="number"
              min={0}
              max={99}
              width={44}
              height={16}
              textAlign="center"
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              id="sequence_4"
              fontSize={60}
              size="xl"
              type="number"
              min={0}
              max={99}
              width={44}
              height={16}
              textAlign="center"
            >
              <NumberInputField />
            </NumberInput>
            <NumberInput
              id="sequence_5"
              fontSize={60}
              size="xl"
              type="number"
              min={0}
              max={99}
              width={44}
              height={16}
              textAlign="center"
            >
              <NumberInputField />
            </NumberInput>
          </div>
          <Button
            id="sequenceSubmit"
            type="submit"
            bg="green.200"
            color="gray.900"
            _hover={{ color: "white", bg: "green.400" }}
            onClick={() => validateInput()}
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <Heading p={10} size="lg">
            We predict the following 2 numbers to come next in your sequence
          </Heading>
          <Text size="4xl" fontSize="30pt">
              {output.join(', ')}
          </Text>
        </>
      )}
    </div>
  );
};

export default SequenceGuesser;
