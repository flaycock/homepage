import { Heading } from "../../../node_modules/@chakra-ui/react";
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
  const [priceIncr] = useState(1.2);
  const [items] = useState(ITEMS);
  const [upgrades] = useState(UPGRADES);
  const [upgradeForce, setUpgradeForce] = useState(0);

  useEffect(() => {
    let clockInterval = setInterval(() => {
      let itemKeys = Object.keys(items);
      itemKeys.forEach((itemKey) =>
        setPetCount(
          (petCount) => petCount + itemKey.owned * itemKey.petPerSec * itemKey.level
        )
      );
      setTime(time+1);
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
      if (upgradeKey.item === "cursor" && petsClicked >= upgradeKey.threshhold) {
        upgradeKey.visible = true;
      }
    });
    setPetCount(newPetCount);
  };

  const formatName = (name) => {
    let splitName = name.split("_");
    splitName.map((split) => {
      return split[0].toUpperCase() + split.substr(1);
    });
    return splitName.join(" ");
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
    let item = items[itemName];
    let cost = Math.round(item.cost * Math.pow(priceIncr, item.owned));
    if (cost <= petCount) {
      item.owned += 1;
      items[itemName] = item;
      let newPetCount = petCount - cost;
      setPetPerSec(petPerSec + item.petPerSec * item.level);
      setPetCount(newPetCount);
    }
  };

  const buyUpgrade = (upgradeName) => {
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
    }
  };

  const checkUpgrade = (itemName) => {
    let item = items[itemName];
    let upgrades = Object.keys(upgrades);
    upgrades.forEach((upgrade) => {
      if (
        upgrade.item === itemName &&
        !upgrade.visible &&
        item.owned >= upgrade.threshhold
      ) {
        upgrade.visible = true;
      }
    });
    setUpgradeForce(upgradeForce + 1);
  };

  const itemKeys = Object.keys(items);
  const upgradeKeys = Object.keys(upgrades);
  itemKeys.forEach((itemKey) => {
    if (
      itemKeys != "cursor" &&
      !itemKey.visible &&
      petCount * 3 >= itemKey.cost
    ) {
      items[itemKey].visible = true;
    }
  });

  return (
    <>
      <Heading mt="5px" mb="10px">
        Cat Petter
      </Heading>
      <div id="game">
        <div id="column">
          <div>
            <h3>
              Number of pets: {formatPets(petCount)}
            </h3>
            <h4>
              Pets per second: {formatPets(petPerSec)}
            </h4>
            <img
              src={cat}
              id="pixelCat"
              onClick={() => manCatPet()}
            />
          </div>
        </div>
        <div id="column">
          <h3>
            Buy Items Below!
          </h3>
          <div id="item-wrapper">
            <table>
              <tbody>
                {itemKeys.map(
                  (item) =>
                    items[item].visible && (
                      <tr
                        key={item}
                        onClick={() => {
                          buyItem(item);
                          checkUpgrade(item);
                        }}
                      >
                        <td>
                          {formatName(item)}
                          {items[item].level > 1
                            ? " x" + items[item].level
                            : ""}
                        </td>
                        <td>{formatPets(itemCost(items[item]))} pets</td>
                        <td>Owned: {items[item].owned}</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
          <br />
          <h3>
            Buy Upgrades Below!
          </h3>
          <div id="upgrade-wrapper">
            <table>
              <tbody>
                {upgradeKeys.map(
                  (upgrade) =>
                    !upgrades[upgrade].owned &&
                    upgrades[upgrade].visible && (
                      <tr
                        key={upgrade}
                        onClick={() => buyUpgrade(upgrade)}
                      >
                        <td>{formatName(upgrade)}</td>
                        <td>{formatPets(upgrades[upgrade].cost)} pets</td>
                      </tr>
                    )
                )}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
};

export default CatPetter;
