import AboutMe from "../components/AboutMe";

describe("<AboutMe />", () => {
  it("renders", () => {
    cy.mount(<AboutMe />);
    cy.get("h2.aboutMeHeading").should("have.text", "About Me");
  });
});
