import PixelArt from "../../projects/PixelArt/PixelArt";

describe("<PixelArt />", () => {
  it("renders", () => {
    cy.mount(<PixelArt />);
    cy.get("#pixelArt h2").should("have.text", "Pixel Art");
  });
  it("loads art", () => {
    cy.mount(<PixelArt />);
    cy.get("#pixelArt #pixelWidth").type("10");
    cy.get("#pixelArt #pixelSubmit").click();
    cy.get("#pixelArt #pixelTable").should("exist");
  });
});
