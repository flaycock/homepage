const factory_upgrades = {
  deforestation: {
    owned: false,
    visible: false,
    threshhold: 20,
    item: "factory",
    cost: 433333,
    multiplier: 2,
    desc: "Screw it, lob the trees into the furnaces as well. It's not as if they're doing anything.",
  },
  nuclear_reactor: {
    owned: false,
    visible: false,
    threshhold: 45,
    item: "factory",
    cost: 1000000,
    multiplier: 3,
    desc: "Now we're cooking with gas! Well, green, radioactive gas at any rate.",
  },
  robot_workers: {
    owned: false,
    visible: false,
    threshhold: 80,
    item: "factory",
    cost: 11335577,
    multiplier: 2,
    desc: "Robots have taken over, with minimal feline and maximum human casualties.",
  },
};

export default factory_upgrades;
