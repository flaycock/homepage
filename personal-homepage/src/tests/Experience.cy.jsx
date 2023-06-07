import Experience from "../components/Experience";

describe("<Experience />", () => {
  it("renders", () => {
    cy.mount(<Experience />);
    cy.get("h2.experienceHeading").should("have.text", "Experience");
    cy.get(".chakra-accordion").children().should("have.length", 3);
  });
  it("opens and closes accordians", () => {
    cy.mount(<Experience />);
    cy.get(".chakra-accordion")
      .children()
      .each((accordian, index) => {
        cy.wrap(accordian).get("button").eq(index).click();
        cy.wrap(accordian)
          .get("button")
          .eq(index)
          .should("have.attr", "aria-expanded", "true");
        cy.wrap(accordian).get("button").eq(index).click();
        cy.wrap(accordian)
          .get("button")
          .eq(index)
          .should("have.attr", "aria-expanded", "false");
      });
  });
});
