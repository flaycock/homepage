import {
  Heading,
  Text,
  Image,
  Table,
  Thead,
  Tbody,
  Tr,
  Th,
  Td,
  TableCaption,
  TableContainer,
} from "../../../node_modules/@chakra-ui/react";
import { useState, useEffect } from "react";
import ITEMS from "./data/Items";
import UPGRADES from "./data/Upgrades";
import cat from "./icons/catIcon.png";
import "./CatPetter.css";

const CatPetter = () => {
  const [time, setTime] = useState(0);
  const [petCount, setPetCount] = useState(0);
  const [petPerSec, setPetPerSec] = useState(0);
  const [petsClicked, setPetsClicked] = useState(0);
  const [priceIncr] = useState(1.1);
  const [items] = useState(ITEMS);
  const [upgrades] = useState(UPGRADES);
  const [upgradeForce, setUpgradeForce] = useState(0);
  const [buyItemText, setBuyItemText] = useState(
    "Buy items to automatically generate pets!"
  );
  const [buyUpgradeText, setBuyUpgradeText] = useState(
    "Buy more items to unlock and buy their upgrades!"
  );

  useEffect(() => {
    let clockInterval = setInterval(() => {
      let itemKeys = Object.keys(items);
      itemKeys.forEach((itemKey) =>
        setPetCount(
          (petCount) =>
            petCount +
            items[itemKey].owned *
              items[itemKey].petPerSec *
              items[itemKey].level
        )
      );
      setTime(time + 1);
    }, 1000);
    return function () {
      clearInterval(clockInterval);
    };
  }, [items, time]);

  const manCatPet = () => {
    let newPetCount = petCount + items.cursor.level;
    setPetsClicked(petsClicked + items.cursor.level);
    let upgradeKeys = Object.keys(upgrades);
    upgradeKeys.forEach((upgradeKey) => {
      if (
        upgrades[upgradeKey].item === "cursor" &&
        petsClicked >= upgrades[upgradeKey].threshhold
      ) {
        upgrades[upgradeKey].visible = true;
      }
    });
    setPetCount(newPetCount);
  };

  const formatName = (name) => {
    console.log("formt name");
    let splitName = name.split("_");
    let formattedNames = splitName.map((word) => {
      return word[0].toUpperCase() + word.substr(1);
    });
    return formattedNames.join(" ");
  };

  const formatPets = (count) => {
    let countStr = count.toString();
    let formattedCount = "";
    let digits = countStr.length;
    if (digits > 6) {
      let millScale = digits - 7;
      for (let i = 0; i <= millScale; i++) {
        formattedCount += countStr[i];
      }
      formattedCount +=
        "." + countStr.slice(millScale + 1, millScale + 3) + " million";
    } else if (digits > 3) {
      let thousScale = digits - 4;
      for (let i = 0; i <= thousScale; i++) {
        formattedCount += countStr[i];
      }
      formattedCount += "," + countStr.slice(-3);
    } else {
      formattedCount = countStr;
    }
    return formattedCount;
  };

  const itemCost = (item) => {
    let nextCost = Math.round(item.cost * Math.pow(priceIncr, item.owned));
    return nextCost;
  };

  const buyItem = (itemName) => {
    setBuyItemText("Buy items to automatically generate pets!");
    let item = items[itemName];
    let cost = Math.round(item.cost * Math.pow(priceIncr, item.owned));
    if (cost <= petCount) {
      item.owned += 1;
      items[itemName] = item;
      let newPetCount = petCount - cost;
      setPetPerSec(petPerSec + item.petPerSec * item.level);
      setPetCount(newPetCount);
    } else {
      setBuyItemText("Not enough pets!");
    }
  };

  const buyUpgrade = (upgradeName) => {
    setBuyUpgradeText("Buy more items to unlock and buy their upgrades!");
    let upgrade = upgrades[upgradeName];
    let item = items[upgrade.item];
    if (upgrade.cost <= petCount) {
      let currentItemContrib = item.owned * item.petPerSec * item.level;
      upgrade.owned = true;
      let newPetCount = petCount - upgrade.cost;
      item.level *= upgrade.multiplier;
      items[upgrade.item] = item;
      upgrades[upgradeName] = upgrade;
      setPetPerSec(
        petPerSec +
          item.owned * item.petPerSec * item.level -
          currentItemContrib
      );
      setPetCount(newPetCount);
    } else {
      setBuyUpgradeText("Not enough pets!");
    }
  };

  const checkUpgrade = (itemName) => {
    let item = items[itemName];
    let upgradeKeys = Object.keys(upgrades);
    upgradeKeys.forEach((upgradeKey) => {
      let noOwned = itemName === "cursor" ? petCount : item.owned;
      if (
        upgrades[upgradeKey].item === itemName &&
        !upgrades[upgradeKey].visible &&
        noOwned >= upgrades[upgradeKey].threshhold
      ) {
        upgrades[upgradeKey].visible = true;
      }
    });
    setUpgradeForce(upgradeForce + 1);
  };

  const itemKeys = Object.keys(items);
  const upgradeKeys = Object.keys(upgrades);
  itemKeys.forEach((itemKey) => {
    if (
      items[itemKeys] != "cursor" &&
      !items[itemKey].visible &&
      petCount * 3 >= items[itemKey].cost
    ) {
      items[itemKey].visible = true;
    }
  });

  return (
    <>
      <Heading mt="5px" mb="10px">
        Cat Petter
      </Heading>
      <div id="catPetter">
        <div className="column">
          <div>
            <Heading p="5px" size="md">
              Number of pets:&nbsp;
              <Text display="inline">{formatPets(petCount)}</Text>
            </Heading>
            <Heading p="5px" size="md">
              Pets per second:&nbsp;
              <Text display="inline">{formatPets(petPerSec)}</Text>
            </Heading>
            <Image
              src={cat}
              cursor="pointer"
              id="pixelCat"
              alt="A Cute Kitty Needing Pets"
              onClick={() => manCatPet()}
            />
          </div>
        </div>
        <div className="column">
          <Heading pt="5px" size="md">
            Buy Items
          </Heading>
          <div id="item-wrapper">
            <TableContainer>
              <Table variant="simple">
                <TableCaption
                  color={buyItemText.includes("Buy") ? "gray.600" : "red.400"}
                  placement="top"
                >
                  {buyItemText}
                </TableCaption>
                <Thead>
                  <Tr>
                    <Th>Item</Th>
                    <Th>Pets per sec</Th>
                    <Th>Cost</Th>
                    <Th>Number Owned</Th>
                  </Tr>
                </Thead>
                <Tbody>
                  {itemKeys.map(
                    (item) =>
                      item != "cursor" &&
                      items[item].visible && (
                        <Tr
                          key={item}
                          cursor="pointer"
                          onClick={() => {
                            buyItem(item);
                            checkUpgrade(item);
                          }}
                          _hover={
                            items[item].cost <= petCount
                              ? { bg: "orange.100", opacity: "0.6" }
                              : {
                                  color: "white",
                                  bg: "red.400",
                                  opacity: "0.8",
                                }
                          }
                        >
                          <Td>
                            {formatName(item)}
                            {items[item].level > 1
                              ? " Mark " + items[item].level
                              : ""}
                          </Td>
                          <Td>{items[item].petPerSec * items[item].level}</Td>
                          <Td>{formatPets(itemCost(items[item]))} pets</Td>
                          <Td>Owned: {items[item].owned}</Td>
                        </Tr>
                      )
                  )}
                </Tbody>
              </Table>
            </TableContainer>
          </div>
          <br />
          <Heading pt="5px" size="md">
            Buy Upgrades Below!
          </Heading>
          <div id="upgrade-wrapper">
            <Table>
              <TableCaption
                color={buyUpgradeText.includes("Buy") ? "gray.600" : "red.400"}
                placement="top"
              >
                {buyUpgradeText}
              </TableCaption>
              <Thead>
                <Tr>
                  <Th>Upgrade</Th>
                  <Th>Cost</Th>
                </Tr>
              </Thead>
              <Tbody>
                {upgradeKeys.map(
                  (upgrade) =>
                    !upgrades[upgrade].owned &&
                    upgrades[upgrade].visible && (
                      <Tr
                        key={upgrade}
                        cursor="pointer"
                        onClick={() => buyUpgrade(upgrade)}
                      >
                        <Td>{formatName(upgrade)}</Td>
                        <Td>{formatPets(upgrades[upgrade].cost)} pets</Td>
                      </Tr>
                    )
                )}
              </Tbody>
            </Table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatPetter;
