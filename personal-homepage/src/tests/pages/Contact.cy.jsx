import Contact from "../components/Contact";

describe("<Contact />", () => {
  it("renders", () => {
    cy.mount(<Contact />);
    cy.get("h2.contactHeading").should("have.text", "Contact");
  });
  it("has correct links", () => {
    cy.mount(<Contact />);
    cy.get("a.linkedIn")
      .should(
        "have.attr",
        "href",
        "https://www.linkedin.com/in/freddie-laycock-a23974171/"
      )
      .should("have.attr", "target", "_blank");
    cy.get("a.github")
      .should("have.attr", "href", "https://github.com/flaycock")
      .should("have.attr", "target", "_blank");
    cy.get("a.email")
      .should("have.attr", "href", "mailto:freddielaycock97@gmail.com")
      .should("have.attr", "target", "_blank");
  });
});
