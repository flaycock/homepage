import Idm from "../../projects/IDM/IDM";

describe("<Idm />", () => {
  it("renders", () => {
    cy.mount(<Idm />);
    cy.get("#IDM h2").should("have.text", "Infectious Disease Model");
  });
  it("only runs when inputs are valid", () => {
    cy.mount(<Idm />);
    cy.get("input#pop").type("hello");
    cy.get("#idmSubmit").click();
    cy.get("#idmError").should(
      "have.text",
      "Please make sure to input valid numbers in all fields."
    );
  });
  it("runs when inputs are valid", () => {
    cy.mount(<Idm />);
    cy.get("input#pop").type(1000);
    cy.get("input#grid").type(50);
    cy.get("input#step").type(1);
    cy.get("input#infProb").type(0.75);
    cy.get("input#infDist").type(1.5);
    cy.get("input#timeInterval").type(0.1);
    cy.get("#idmSubmit").click();
    cy.get("#idmError").should("have.text", "");
    cy.get("#idmPlot").should("exist");
  });
});
