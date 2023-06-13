import { useState, useRef } from "react";
import { Heading, Text } from "@chakra-ui/layout";
import { Button } from "@chakra-ui/button";
import "./Wumble.css";
import words from "./data/Words.js";

const Wumble = () => {
  const [input, setInput] = useState("");
  const [msg, setMsg] = useState("");
  const [attempts, setAttempts] = useState(0);
  const [success, setSuccess] = useState(false);
  const [failure, setFailure] = useState(false);
  const [wordAns, setWordAns] = useState("");
  const [inputDisabled, setInputDisabled] = useState("");
  const ref = useRef(null);
  if (wordAns === "") {
    setWordAns(words[Math.floor(Math.random() * words.length)]);
  }

  const handleInput = (userInput) => {
    if (/^[a-zA-Z]+$/.test(userInput) || userInput === "") {
      if (userInput.length <= 4 || userInput === "") {
        setInput(userInput.toUpperCase());
        setMsg("");
      }
    } else {
      setMsg("We only accept letters here");
    }
  };

  const checkInput = (word) => {
    if (word.match(/^[A-Za-z]+$/)) {
      if (word.toUpperCase() === wordAns) {
        setAttempts(attempts + 1);
        setSuccess(true);
        setMsg("Congrats! You guessed correctly");
        setInputDisabled("disabled");
      } else if (word.length === 4) {
        setAttempts(attempts + 1);
        setMsg(letterChecker(word));
      }
    } else {
      setMsg(word + " is not a word");
    }
    if (attempts > 4 && !success) {
      setFailure(true);
      setMsg("Oh no, you have failed! The word was " + wordAns);
      setInputDisabled("disabled");
    } else {
      ref.current.focus();
    }
  };

  const letterChecker = (word) => {
    let matchedLetters = [];
    let matchedPositions = [];
    let correctWord = wordAns;
    let inputWord = word;
    for (let i = 0; i < inputWord.length; i++) {
      for (let j = 0; j < correctWord.length; j++) {
        if (
          inputWord[i] === correctWord[j] &&
          inputWord.split("").filter((letter) => letter === inputWord[i])
            .length >
            matchedLetters.filter((letter) => letter === inputWord[i]).length
        ) {
          if (i === j) {
            matchedPositions.push(inputWord[i]);
          }
          matchedLetters.push(inputWord[i]);
          break;
        }
      }
    }
    let checkedString =
      matchedLetters.length > 0
        ? "You got " + matchedLetters.join(", ") + " correct."
        : "You matched no letters correctly.";
    checkedString +=
      matchedPositions.length > 0
        ? "You got " +
          matchedPositions.join(", ") +
          " in the right position(s)."
        : "";
    return checkedString;
  };

  return (
    <div id="wumbleGame">
      <Heading>Wumble!</Heading>
      <input
        autoFocus
        disabled={inputDisabled}
        ref={ref}
        id="firstGuess"
        className="guess"
        type="text"
        onChange={(e) => handleInput(e.target.value)}
        value={input}
      />
      <Text id="msg">{msg}</Text>
      {!success && !failure && (
        <Button
          bg="green.200"
          color="gray.900"
          _hover={{ color: "white", bg: "green.400" }}
          id="inputCheck"
          onClick={() => checkInput(input)}
        >
          Check Answer
        </Button>
      )}
      {attempts > 0 && !failure && success ? (
        <Text id="attempts">
          You took {attempts} attempt(s) to guess the word
        </Text>
      ) : (
        <Text id="attempts">You have had {attempts} attempt(s)</Text>
      )}
    </div>
  );
};

export default Wumble;
