import { render } from "@testing-library/react";
import { AppBar } from ".";

describe("<AppBar />", () => {
  test("Should render correct component slots", () => {
    const { getByText } = render(
      <AppBar leftSide={"left slot"} rightSide={"right slot"} />
    );

    expect(getByText("left slot")).toBeInTheDocument();
    expect(getByText("right slot")).toBeInTheDocument();
  });
});
