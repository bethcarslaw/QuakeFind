import { render } from "@testing-library/react";
import { TitleBadge, TitleBadgeProps } from ".";

const dummyProps: TitleBadgeProps = {
  title: "Test Title",
};
describe("<TitleBadge />", () => {
  test("Should display correct text", () => {
    render(<TitleBadge {...dummyProps} />);
  });
});
