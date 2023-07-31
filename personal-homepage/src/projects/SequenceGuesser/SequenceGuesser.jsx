import { useState } from "react";
import {
  Heading,
  Text,
  NumberInput,
  NumberInputField,
  Button,
} from "../../../node_modules/@chakra-ui/react";
import brain from "brain.js";
import "./SequenceGuesser.css";

const SequenceGuesser = () => {
  const [submitted, setSubmitted] = useState(false);
  const [inputs, setInputs] = useState([0, 0, 0, 0, 0]);
  const [msg, setMsg] = useState("");
  const [output, setOutput] = useState(0);
  const [loading, setLoading] = useState(false);
  const [model, setModel] = useState("");
  const [trained, setTrained] = useState(false);
  const [correct, setCorrect] = useState(true);
  const [alert, setAlert] = useState(
    "WARNING: This program takes a long time to run at first, be patient!"
  );

  const validateInput = () => {
    setLoading(true);
    setTrained(false);
    let newInputs = inputs;
    let valid = true;
    document
      .querySelectorAll('#sequenceInputs [id *="sequence_"]')
      .forEach((input) => {
        let value = parseInt(input.value);
        if (0 <= input <= 99) {
          let position = parseInt(input.id.split("_")[1]) - 1;
          newInputs[position] = value;
        } else {
          valid = false;
        }
      });
    if (valid) {
      setMsg("");
      setInputs(newInputs);
      setSubmitted(true);
      setAlert("");
      setTimeout(() => predictSequence(), 1000);
    } else {
      setMsg(
        "Error submitting sequence. Please check your inputs and try again."
      );
    }
  };

  const reset = () => {
    setMsg("");
    setInputs([0, 0, 0, 0, 0]);
    setOutput(0);
    setTrained(true);
    setCorrect(true);
    setSubmitted(false);
  };

  const predictSequence = () => {
    let seqNet = new brain.recurrent.LSTMTimeStep();
    if (model) {
      let jsonModel = JSON.parse(model);
      seqNet.fromJSON(jsonModel);
    } else {
      seqNet.train([
        [1, 2, 3, 4, 5, 6, 7, 8],
        [2, 4, 6, 8, 10, 12, 14, 16],
        [1, 3, 5, 7, 9, 11, 13],
        [1, 4, 9, 16, 25, 36, 49, 64],
        [1, 1, 2, 3, 5, 8, 13, 21, 34, 55],
      ]);
    }
    setOutput(Math.round(seqNet.run(inputs)));
    setMsg("");
    setLoading(false);
    let jsonModel = seqNet.toJSON();
    setModel(JSON.stringify(jsonModel));
  };

  const reTrainModel = () => {
    console.log("Retraining model");
    let correction = 0;
    let correctSequence = inputs;
    if (correct) {
      correction = output;
    } else {
      correction = parseInt(document.querySelector("#seqCorrection").value);
    }
    correctSequence.push(correction);
    let seqNet = new brain.recurrent.LSTMTimeStep();
    let jsonModel = JSON.parse(model);
    seqNet.fromJSON(jsonModel);
    seqNet.train([correctSequence]);
    jsonModel = seqNet.toJSON();
    setModel(JSON.stringify(jsonModel));
    setAlert("The model has been trained using your inputs.");
    reset();
  };

  return (
    <div id="sequenceGuesser">
      <Heading className="projectsHeading" pb={10}>
        Sequence Guesser
      </Heading>
      <Text size="xl">
        This program uses Machine Learning to predict what the next number is in
        any 5-number sequence you provide. It has a pre-trained model, but also
        learns from sequences you input in yourself.
      </Text>
      <Text color="orange.500" size="xl">
        {alert}
      </Text>
      <Text
        id="sequenceError"
        m="10px"
        size="xl"
        fontSize="16pt"
        color="red.400"
      >
        {msg}
      </Text>
      {!submitted ? (
        <>
          <Heading p={10} size="md">
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
      ) : loading ? (
        <Text size="2xl" fontSize="40pt" mt="30px !important" color="red.500">
          Loading...
        </Text>
      ) : submitted && !trained && correct ? (
        <>
          <Heading p={10} size="md">
            We predict the next number in the sequence {inputs.join(", ")} is:
          </Heading>
          <Text
            size="4xl"
            width="8vw"
            fontSize="30pt"
            mb="10px !important"
            border="3px solid purple"
            borderRadius="50px"
          >
            {output}
          </Text>
          <Text fontSize="20pt">Was this correct?</Text>
          <div id="seqOutcome">
            <Button
              color="gray.900"
              bg="green.200"
              _hover={{ color: "white", bg: "green.400" }}
              mb="-10px"
              mt="20px !important"
              onClick={() => reTrainModel()}
            >
              Yeah!
            </Button>
            <Button
              color="gray.900"
              bg="red.100"
              _hover={{ color: "white", bg: "green.500" }}
              mb="-10px"
              mt="20px !important"
              onClick={() => setCorrect(false)}
            >
              No
            </Button>
          </div>
        </>
      ) : submitted && !trained && !correct ? (
        <>
          <Heading p={10} size="md">
            Please input the correct new number in your sequence
          </Heading>
          <NumberInput
            id="seqCorrection"
            fontSize={40}
            size="xl"
            type="number"
            mb="60px !important"
            min={0}
            max={99}
            width={16}
            height={10}
            textAlign="center"
          >
            <NumberInputField />
          </NumberInput>
          <Button
            id="correctionSubmit"
            type="submit"
            bg="green.200"
            color="gray.900"
            _hover={{ color: "white", bg: "green.400" }}
            onClick={() => reTrainModel()}
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <Button
            color="gray.900"
            bg="green.200"
            _hover={{ color: "white", bg: "green.400" }}
            mb="-10px"
            mt="20px !important"
            onClick={() => reset()}
          >
            Have Another Go
          </Button>
        </>
      )}
    </div>
  );
};

export default SequenceGuesser;
