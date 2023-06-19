import CatPetter from "../../projects/CatPetter/CatPetter";

describe("<CatPetter />", () => {
  it("renders", () => {
    cy.mount(<CatPetter />);
    cy.get("#catPetterHeader").should("have.text", "Cat Petter");
  });
});
