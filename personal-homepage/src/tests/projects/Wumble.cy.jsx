import Wumble from "../../projects/Wumble/Wumble";

describe("<Wumble />", () => {
  it("renders", () => {
    cy.mount(<Wumble />);
    cy.get("#wumbleGame h2").should("have.text", "Wumble!");
  });
  it("accepts text", () => {
    cy.mount(<Wumble />);
    cy.get("#firstGuess").type("test");
    cy.get("#firstGuess").should("have.value", "TEST");
    cy.get("#firstGuess").type("{backspace}{backspace}{backspace}{backspace}");
    cy.get("#firstGuess").type("£1.:");
    cy.get("#firstGuess").should("have.value", "");
  });
  it("checks input and returns output string", () => {
    cy.mount(<Wumble />);
    cy.get("#firstGuess").type("zzzz");
    cy.get("#inputCheck").click();
    cy.get("#msg").should("have.text", "You matched no letters correctly.");
    cy.get("#attempts").should("have.text", "You have had 1 attempt(s)");
  });
});
