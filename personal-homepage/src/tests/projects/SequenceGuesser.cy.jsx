import SequenceGuesser from "../../projects/SequenceGuesser/SequenceGuesser";

describe("<SequenceGuesser />", () => {
  it("renders", () => {
    cy.mount(<SequenceGuesser />);
    cy.get("#sequenceGuesser .projectsHeading").should(
      "have.text",
      "Sequence Guesser"
    );
  });
});
