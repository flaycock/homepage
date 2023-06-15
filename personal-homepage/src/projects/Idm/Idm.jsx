import { useState, useEffect, useRef } from "react";
import {
  Heading,
  Input,
  Text,
  FormControl,
  Button,
  FormLabel,
} from "../../../node_modules/@chakra-ui/react";
import {
  Chart as ChartJS,
  LinearScale,
  PointElement,
  LineElement,
  Tooltip,
  Legend,
} from "chart.js";
import { Scatter } from "react-chartjs-2";
import "./Idm.css";

ChartJS.register(LinearScale, PointElement, LineElement, Tooltip, Legend);

const Idm = () => {
  const [load, setLoad] = useState(false);
  const [finished, setFinished] = useState(false);
  const [time, setTime] = useState(0);
  const [pop, setPop] = useState(0);
  const [grid, setGrid] = useState(0);
  const [step, setStep] = useState(0);
  const [infProb, setInfProb] = useState(0);
  const [infDist, setInfDist] = useState(0);
  const [timeInterval, setTimeInterval] = useState(0);
  const [pplPos, setPplPos] = useState([]);
  const [infPos, setInfPos] = useState([]);

  function useInterval(callback, delay) {
    const savedCallback = useRef();
    useEffect(() => {
      savedCallback.current = callback;
    }, [callback]);
    useEffect(() => {
      function tick() {
        savedCallback.current();
      }
      if (delay !== null) {
        let id = setInterval(tick, delay);
        return () => clearInterval(id);
      }
    }, [delay]);
  }

  const runModel = () => {
    setLoad(true);
    if (!pplPos.length && infPos.length) {
      setFinished(true);
    } else if (time == 0 && !pplPos.length && !infPos.length) {
      for (let i = 0; i < pop; i++) {
        let randX = Math.random() * grid;
        let randY = Math.random() * grid;
        pplPos.push({ x: randX, y: randY });
      }
      let firstInfIndex = Math.floor(Math.random() * pop);
      infPos.push(pplPos[firstInfIndex]);
      pplPos.splice(firstInfIndex, 1);
    } else {
      let newPplPos = [];
      let newInfPos = [];
      for (let i = 0; i < pplPos.length; i++) {
        newPplPos.push(calcStep(pplPos[i], step, grid));
      }
      for (let j = 0; j < infPos.length; j++) {
        newInfPos.push(calcStep(infPos[j], step, grid));
      }
      let justInfPos = newInfPos;
      for (let j = 0; j < newInfPos.length; j++) {
        for (let i = 0; i < newPplPos.length; i++) {
          let dist =
            ((newInfPos[j].x - newPplPos[i].x) ** 2 +
              (newInfPos[j].y - newPplPos[i].y) ** 2) **
            0.5;
          if (dist <= infDist && Math.random() <= infProb) {
            justInfPos.push(newPplPos.splice(i, 1)[0]);
          }
        }
      }
      setPplPos(newPplPos);
      setInfPos(justInfPos);
    }
    setTime((time) => time + 1);
  };

  const calcStep = (person, stepSize, gridLim) => {
    let stepX = Math.random() * stepSize;
    stepX = Math.round(Math.random()) ? stepX : -1 * stepX;
    let newX = person.x + stepX;
    let stepY = Math.random() * stepSize;
    stepY = Math.round(Math.random()) ? stepY : -1 * stepY;
    let newY = person.y + stepY;
    if (newX > gridLim) {
      newX = 2 * gridLim - newX;
    } else if (newX < 0) {
      newX = -1 * newX;
    }
    if (newY > gridLim) {
      newY = 2 * gridLim - newY;
    } else if (newY < 0) {
      newY = -1 * newY;
    }
    return { x: newX, y: newY };
  };

  const reset = () => {
    setFinished(false);
    setLoad(false);
    setTime(0);
    setPop(0);
    setGrid(0);
    setStep(0);
    setInfProb(0);
    setInfDist(0);
    setTimeInterval(0);
    setPplPos([]);
    setInfPos([]);
  };

  useInterval(() => runModel(), load && !finished ? timeInterval * 1000 : null);

  return (
    <div id="IDM">
      <Heading mt="40px" mb="30px">
        Infectious Disease Model
      </Heading>
      {!load ? (
        <>
          <FormControl id="IDM_input">
            <FormLabel textAlign="center">Size of Population</FormLabel>
            <Input
              type="number"
              mb="10px"
              isRequired
              width="40%"
              size="md"
              placeholder="Number of people"
              onChange={(event) => setPop(parseInt(event.currentTarget.value))}
            />
            <FormLabel textAlign="center">Length of Grid</FormLabel>
            <Input
              type="number"
              mb="10px"
              isRequired
              width="40%"
              size="md"
              placeholder="Grid will be AxA in size"
              onChange={(event) =>
                setGrid(parseFloat(event.currentTarget.value))
              }
            />
            <FormLabel textAlign="center">Step Size</FormLabel>
            <Input
              type="number"
              mb="10px"
              isRequired
              width="40%"
              size="md"
              placeholder="The size of each person's step"
              onChange={(event) =>
                setStep(parseFloat(event.currentTarget.value))
              }
            />
            <FormLabel textAlign="center">Infection Probability</FormLabel>
            <Input
              type="number"
              mb="10px"
              isRequired
              width="40%"
              size="md"
              placeholder="Chance of an infected infecting someone else"
              onChange={(event) =>
                setInfProb(parseFloat(event.currentTarget.value))
              }
            />
            <FormLabel textAlign="center">Infection Proximity</FormLabel>
            <Input
              type="number"
              mb="10px"
              isRequired
              width="40%"
              size="md"
              placeholder="Minimum distance required for infection"
              onChange={(event) =>
                setInfDist(parseFloat(event.currentTarget.value))
              }
            />
            <FormLabel textAlign="center">Time Interval</FormLabel>
            <Input
              type="number"
              mb="10px"
              isRequired
              width="40%"
              size="md"
              placeholder="Time (s) between each step of the model"
              onChange={(event) =>
                setTimeInterval(parseFloat(event.currentTarget.value))
              }
            />
          </FormControl>
          <Button
            type="submit"
            mt="30px"
            bg="green.200"
            color="gray.900"
            _hover={{ color: "white", bg: "green.400" }}
            onClick={() => runModel()}
          >
            Submit
          </Button>
        </>
      ) : (
        <>
          <Scatter
            options={{
              plugins: {
                legend: {
                  display: false,
                },
                tooltip: {
                  enabled: false,
                },
              },
              animation: {
                duration: 0,
              },
              hover: { mode: null },
            }}
            data={{
              datasets: [
                {
                  pointRadius: 4,
                  pointBackgroundColor: "black",
                  data: pplPos,
                },
                {
                  pointRadius: 4,
                  pointBackgroundColor: "red",
                  data: infPos,
                },
              ],
            }}
          />
          {finished && (
            <>
              <Text>The model completed in {time} steps</Text>
              <Button mt="30px" onClick={() => reset()}>
                Run Another Model
              </Button>
            </>
          )}
        </>
      )}
    </div>
  );
};

export default Idm;
