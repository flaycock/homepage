import { render as rtlRender, screen } from "@testing-library/react";

import { Provider } from "../ui/provider";
import { TestComponent } from "./TestComponent";

const render = (text?: string) => rtlRender(
  <Provider>
    <TestComponent text={text} />
  </Provider>    
);

describe("TestComponent", () => {
  it("renders", () => {
    render("test");

    expect(screen.getByTestId("test-component")).toMatchSnapshot();
  });

  it("does not render a Text component if no text is provided", () => {
    render();

    expect(screen.queryByTestId("test-component-test")).not.toBeInTheDocument();
  });
});
