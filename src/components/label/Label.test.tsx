import { render } from "@testing-library/react";
import { Label } from ".";

describe("<Label />", () => {
  test("Should display correct text", () => {
    const { getByText } = render(<Label>Test Text</Label>);

    expect(getByText("Test Text")).toBeInTheDocument();
  });
});
