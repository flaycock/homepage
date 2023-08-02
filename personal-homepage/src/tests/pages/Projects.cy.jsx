import Projects from "../components/Projects";

describe("<Projects />", () => {
  it("renders", () => {
    cy.mount(<Projects />);
    cy.get("h2.projectsHeading").should("have.text", "Projects");
    cy.get(".chakra-card").should("have.length", 3);
  });
  it("goes to each game", () => {
    cy.mount(<Projects />);
    cy.get(".chakra-card").each((game, index) => {
      cy.wrap(game).get("button").eq(index).click();
      //When games have been added, check to see that button opens games
    });
  });
});
