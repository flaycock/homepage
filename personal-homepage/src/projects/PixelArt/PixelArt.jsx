import { useState } from "react";
import arrayShuffle from "../../../node_modules/array-shuffle";
import {
  Heading,
  Input,
  Text,
  FormControl,
  Button,
  FormLabel,
  Radio,
  RadioGroup,
  HStack,
} from "../../../node_modules/@chakra-ui/react";
import "./PixelArt.css";

const PixelArt = () => {
  const [pixels, setPixels] = useState(0);
  const [colour, setColour] = useState("229,62,62");
  const [submitted, setSubmitted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [msg, setMsg] = useState("");
  const [table, setTable] = useState();
  const [pattern, setPattern] = useState("normal");

  const submitInputs = () => {
    if (
      pixels &&
      pixels !== 0 &&
      pixels <= 100 &&
      colour &&
      colour != "0,0,0" &&
      pattern &&
      ["normal", "random", "diagonal", "spiral"].includes(pattern)
    ) {
      setSubmitted(true);
      generateTable(pixels, colour);
      setMsg("Loading...");
      setTimeout(() => changeColours(colour, pixels, pattern), 1000);
    } else {
      setMsg("Please input valid arguments.");
    }
  };

  const setNumber = (action, value) => {
    if (typeof value === "number") {
      action(value);
    }
  };

  const generateTable = (pixels, colour) => {
    setMsg("Loading");
    let baseRows = [];
    let widthHeight = 500 / pixels;
    for (let i = 0; i < pixels; i++) {
      let baseCells = [];
      for (let j = 0; j < pixels; j++) {
        baseCells.push(
          <td
            className="pixelCell"
            id={`${i},${j}`}
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
        <tr className="pixelRow" id={`${i}`} key={i}>
          {baseCells}
        </tr>
      );
    }
    setTable(baseRows);
  };

  const changeColours = (colour, pixels, pattern) => {
    let previousColour = colour.split(",");
    if (pattern === "random") {
      let allCells = Array.from(document.querySelectorAll(".pixelCell"));
      allCells = arrayShuffle(allCells);
      previousColour = colourProcess(previousColour, pixels, allCells);
    } else if (pattern === "diagonal") {
      let allCells = Array.from(document.querySelectorAll(".pixelCell"));
      for (let i = 1; i < allCells.length; i++) {
        let prevCellCoords = allCells[i - 1].id.split(",");
        let prevPrevCellCoords;
        let newCoords;
        if (i < 2) {
          newCoords = "0,1";
        } else {
          prevPrevCellCoords = allCells[i - 2].id.split(",");
          if (prevCellCoords[0] == "0" && prevCellCoords[1] != "0") {
            newCoords =
              prevPrevCellCoords[0] == "0"
                ? "1," + (parseInt(prevCellCoords[1]) - 1)
                : "0," + (parseInt(prevCellCoords[1]) + 1);
          } else if (prevCellCoords[1] == "0" && prevCellCoords[0] != "0") {
            newCoords =
              prevPrevCellCoords[1] == "0"
                ? parseInt(prevCellCoords[0]) - 1 + ",1"
                : parseInt(prevCellCoords[0]) + 1 + ",0";
          } else {
            newCoords =
              parseInt(prevPrevCellCoords[0]) < parseInt(prevCellCoords[0])
                ? parseInt(prevCellCoords[0]) +
                  1 +
                  "," +
                  (parseInt(prevCellCoords[1]) - 1)
                : parseInt(prevCellCoords[0]) -
                  1 +
                  "," +
                  (parseInt(prevCellCoords[1]) + 1);
          }
        }
        let movingEl = allCells.filter((cell) => cell.id === newCoords)[0];
        allCells = moveEl(allCells, allCells.indexOf(movingEl), i);
      }
      previousColour = colourProcess(previousColour, pixels, allCells);
    } else if (pattern == "spiral") {
      let allCells = Array.from(document.querySelectorAll(".pixelCell"));
      let direction = "right";
      let minPos = 0;
      for (let i = 1; i < allCells.length; i++) {
        let prevCellCoords = allCells[i - 1].id.split(",");
        let newCoords;
        if (direction == "right") {
          if (prevCellCoords[1] == (pixels - minPos - 1).toString()) {
            direction = "down";
          } else {
            newCoords =
              prevCellCoords[0] + "," + (parseInt(prevCellCoords[1]) + 1);
          }
        }
        if (direction == "down") {
          if (prevCellCoords[0] == (pixels - minPos - 1).toString()) {
            direction = "left";
          } else {
            newCoords =
              parseInt(prevCellCoords[0]) + 1 + "," + prevCellCoords[1];
          }
        }
        if (direction == "left") {
          if (prevCellCoords[1] == minPos.toString()) {
            direction = "up";
          } else {
            newCoords =
              prevCellCoords[0] + "," + (parseInt(prevCellCoords[1]) - 1);
          }
        }
        if (direction == "up") {
          if (prevCellCoords[0] == (minPos + 1).toString()) {
            direction = "right";
            minPos += 1;
            newCoords =
              prevCellCoords[0] + "," + (parseInt(prevCellCoords[1]) + 1);
          } else {
            newCoords =
              parseInt(prevCellCoords[0]) - 1 + "," + prevCellCoords[1];
          }
        }
        let movingEl = allCells.filter((cell) => cell.id === newCoords)[0];
        allCells = moveEl(allCells, allCells.indexOf(movingEl), i);
      }
      previousColour = colourProcess(previousColour, pixels, allCells);
    } else {
      let rows = Array.from(document.querySelectorAll(".pixelRow"));
      rows.forEach((row) => {
        let cells = Array.from(row.querySelectorAll(".pixelCell"));
        previousColour = colourProcess(previousColour, pixels, cells);
      });
    }
    setFinished(true);
    setMsg("");
  };

  const moveEl = (array, from, to) => {
    const el = array.splice(from, 1)[0];
    array.splice(to, 0, el);
    return array;
  };

  const colourProcess = (previousColour, pixels, cells) => {
    let finishingColour = previousColour;
    cells.forEach((cell) => {
      let chosenRGB = Math.round(Math.random() * 2.3);
      let colourDiff = Math.max(500 / pixels, 5);
      colourDiff *= Math.random() < 0.5 ? -1 : 1;
      finishingColour[chosenRGB] =
        parseInt(finishingColour[chosenRGB]) - colourDiff;
      if (finishingColour[chosenRGB] < 0) {
        finishingColour[chosenRGB] * -1;
      } else if (finishingColour[chosenRGB] > 255) {
        finishingColour[chosenRGB] = 255 - (finishingColour[chosenRGB] - 255);
      }
      let newColour = finishingColour.join(",");
      cell.style.backgroundColor = "rgb(" + newColour + ")";
      finishingColour = newColour.split(",");
    });
    return finishingColour;
  };

  const reset = () => {
    setFinished(false);
    setSubmitted(false);
  };

  return (
    <div id="pixelArt">
      <Heading mt="5px" mb="10px">
        Pixel Art
      </Heading>
      {!table && (
        <>
          <Text size="xl">
            Input how big you want the canvas to be, a starting colour, and
            watch as a computer-generated piece of art is created!
          </Text>
          <Text
            id="pixelError"
            m="10px"
            size="xl"
            fontSize="16pt"
            color="red.400"
          >
            {msg}
          </Text>
        </>
      )}
      {!submitted ? (
        <>
          <FormControl>
            <FormLabel textAlign="center">Starting Colour</FormLabel>
            <RadioGroup
              id="colour"
              type="text"
              m="auto"
              width="40%"
              value={colour}
              opacity={0.6}
              size="md"
              pb="10px"
              onChange={setColour}
            >
              <HStack spacing="24px" justify="center">
                <Radio colorScheme="red" value="229,62,62">
                  Red
                </Radio>
                <Radio colorScheme="blue" value="66,153,225">
                  Blue
                </Radio>
                <Radio colorScheme="yellow" value="236,201,75">
                  Yellow
                </Radio>
                <Radio colorScheme="green" value="72,187,120">
                  Green
                </Radio>
                <Radio colorScheme="orange" value="237,137,54">
                  Orange
                </Radio>
                <Radio colorScheme="purple" value="159,122,234">
                  Purple
                </Radio>
                <Radio colorScheme="pink" value="237,100,166">
                  Pink
                </Radio>
                <Radio colorScheme="black" value="160,174,192">
                  Grey
                </Radio>
              </HStack>
            </RadioGroup>
            <FormLabel textAlign="center">
              Picture Width (capped at 100)
            </FormLabel>
            <Input
              id="pixelWidth"
              type="number"
              mb="10px"
              isRequired
              width="40%"
              bg="orange.100"
              opacity={0.6}
              size="md"
              placeholder="The picture will be AxA pixels"
              onChange={(event) =>
                setNumber(setPixels, parseInt(event.currentTarget.value))
              }
            />
            <FormLabel textAlign="center">Processing Pattern</FormLabel>
            <RadioGroup
              id="pattern"
              type="text"
              m="auto"
              width="40%"
              value={pattern}
              opacity={0.6}
              size="md"
              pb="10px"
              onChange={setPattern}
            >
              <HStack spacing="24px" justify="center">
                <Radio colorScheme="red" value="normal">
                  Normal
                </Radio>
                <Radio colorScheme="blue" value="random">
                  Random
                </Radio>
                <Radio colorScheme="yellow" value="diagonal">
                  Diagonal
                </Radio>
                <Radio colorScheme="green" value="spiral">
                  Spiral
                </Radio>
              </HStack>
            </RadioGroup>
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
        <table id="pixelTable">
          <tbody>{table}</tbody>
        </table>
      )}
      {finished && (
        <Button
          color="gray.900"
          bg="green.200"
          _hover={{ color: "white", bg: "green.400" }}
          mb="-10px"
          mt="10px"
          onClick={() => reset()}
        >
          Generate Another
        </Button>
      )}
    </div>
  );
};

export default PixelArt;
