import App from "../App";

describe("<App />", () => {
  it("renders", () => {
    cy.mount(<App />);
    cy.get("div.chakra-tabs__tablist").children().should("have.length", 4);
  });
  it("goes to each page correctly", () => {
    cy.mount(<App />);
    cy.get(".aboutMeTab").click();
    cy.get("h2.aboutMeHeading").should("have.text", "About Me");
    cy.get(".experienceTab").click();
    cy.get("h2.experienceHeading").should("have.text", "Experience");
    cy.get(".projectsTab").click();
    cy.get("h2.projectsHeading").should("have.text", "Projects");
    cy.get(".contactTab").click();
    cy.get("h2.contactHeading").should("have.text", "Contact");
  });
});
