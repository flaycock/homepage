import { useState } from "react";
import arrayShuffle from "../../../node_modules/array-shuffle";
import {
  Heading,
  Input,
  Text,
  FormControl,
  Button,
  FormLabel,
} from "../../../node_modules/@chakra-ui/react";
import "./PixelArt.css";

const PixelArt = () => {
  const [pixels, setPixels] = useState(0);
  const [colour, setColour] = useState("0,0,0");
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");
  const [table, setTable] = useState();
  const [pattern, setPattern] = useState("");

  const submitInputs = () => {
    if (
      pixels &&
      pixels !== 0 &&
      colour &&
      colour != "0,0,0" &&
      pattern &&
      ["normal", "random"].includes(pattern)
    ) {
      setSubmitted(true);
      generateTable(pixels, colour);
      setTimeout(() => changeColours(colour, pixels, pattern), 1000);
    } else {
      setError("Please input valid arguments.");
    }
  };

  const convertColour = (colourName) => {
    setError("");
    switch (colourName) {
      case "red":
        setColour("229,62,62");
        break;
      case "blue":
        setColour("66,153,225");
        break;
      case "yellow":
        setColour("236,201,75");
        break;
      case "green":
        setColour("72,187,120");
        break;
      case "orange":
        setColour("237,137,54");
        break;
      case "purple":
        setColour("159,122,234");
        break;
      case "pink":
        setColour("237,100,166");
        break;
      case "grey":
        setColour("160,174,192");
        break;
      default:
        setError("Please input a valid colour");
        break;
    }
  };

  const setNumber = (action, value) => {
    if (typeof value === "number") {
      action(value);
    }
  };

  const generateTable = (pixels, colour) => {
    setError("");
    let baseRows = [];
    let widthHeight = 500 / pixels;
    for (let i = 0; i < pixels; i++) {
      let baseCells = [];
      for (let j = 0; j < pixels; j++) {
        baseCells.push(
          <td
            className="pixelCell"
            id={`cell_${i}${j}`}
            key={`${i}${j}`}
            style={{
              backgroundColor: `rgba(${colour})`,
              width: `${widthHeight}px`,
              height: `${widthHeight}px`,
            }}
          ></td>
        );
      }
      baseRows.push(
        <tr className="pixelRow" id={`row_${i}`} key={i}>
          {baseCells}
        </tr>
      );
    }
    setTable(baseRows);
  };

  const changeColours = (colour, pixels, pattern) => {
    console.log(colour);
    let previousColour = colour.split(",");
    let rows = Array.from(document.querySelectorAll(".pixelRow"));
    if (pattern === "random") {
      rows = arrayShuffle(rows);
    }
    rows.forEach((row) => {
      row.querySelectorAll(".pixelCell").forEach((cell) => {
        let chosenRGB = Math.round(Math.random() * 2);
        let colourDiff = 750 / pixels;
        colourDiff *= Math.random() < 0.5 ? -1 : 1;
        previousColour[chosenRGB] = mod(
          parseInt(previousColour[chosenRGB]) - colourDiff,
          255
        );
        let newColour = previousColour.join(",");
        cell.style.backgroundColor = "rgb(" + newColour + ")";
        previousColour = newColour.split(",");
      });
    });
  };

  const mod = (num, modulo) => {
    return ((num % modulo) + modulo) % modulo;
  };

  return (
    <div id="pixelArt">
      <Heading mt="5px" mb="10px">
        Pixel Art
      </Heading>
      <Text size="lg">
        Input how big you want the canvas to be, a starting colour, and watch as
        a computer-generated piece of art is created!
      </Text>
      <Text id="pixelError" mb="10px" color="red.400">
        {error}
      </Text>
      {!submitted ? (
        <>
          <FormControl>
            <FormLabel textAlign="center">Starting Colour</FormLabel>
            <Input
              id="colour"
              type="text"
              mb="10px"
              isRequired
              width="40%"
              bg="orange.100"
              opacity={0.6}
              size="md"
              placeholder="e.g. Red, Yellow, Blue"
              onChange={(event) =>
                setPixels(
                  convertColour(event.currentTarget.value.toLowerCase())
                )
              }
            />
            <FormLabel textAlign="center">Picture Width</FormLabel>
            <Input
              id="width"
              type="number"
              mb="10px"
              isRequired
              width="40%"
              bg="orange.100"
              opacity={0.6}
              size="md"
              placeholder="e.g. 400 pixel width"
              onChange={(event) =>
                setNumber(setPixels, parseInt(event.currentTarget.value))
              }
            />
            <FormLabel textAlign="center">Processing Pattern</FormLabel>
            <Input
              id="width"
              type="text"
              mb="10px"
              isRequired
              width="40%"
              bg="orange.100"
              opacity={0.6}
              size="md"
              defaultValue="normal"
              placeholder="How pixels are changed, either 'normal' or 'random'"
              onChange={(event) =>
                setPattern(event.currentTarget.value.toLowerCase())
              }
            />
          </FormControl>
          <Button
            id="pixelSubmit"
            type="submit"
            mt="30px"
            bg="green.200"
            color="gray.900"
            _hover={{ color: "white", bg: "green.400" }}
            onClick={() => submitInputs()}
          >
            Submit
          </Button>
        </>
      ) : (
        <table>
          <tbody>{table}</tbody>
        </table>
      )}
    </div>
  );
};

export default PixelArt;
