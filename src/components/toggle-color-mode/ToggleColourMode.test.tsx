import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { ToggleColorMode } from ".";
import { ThemeWrapper } from "../../utils/testUtils";

const mockedToggleColorMode = jest.fn();
let mockedColorMode = "light";

jest.mock("@chakra-ui/react", () => ({
  ...jest.requireActual("@chakra-ui/react"),
  useColorMode: () => ({
    colorMode: mockedColorMode,
    toggleColorMode: mockedToggleColorMode,
  }),
}));

describe("<ToggleColorMode />", () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });
  test("Should call toggleColorMode onClick", () => {
    const { getByTestId } = render(<ToggleColorMode />, {
      wrapper: ThemeWrapper,
    });

    userEvent.click(getByTestId("toggle-color-mode-switch"));

    expect(mockedToggleColorMode).toHaveBeenCalled();
  });

  test("switch should be off when in light mode", () => {
    const { getByTestId } = render(<ToggleColorMode />, {
      wrapper: ThemeWrapper,
    });

    expect(
      getByTestId("toggle-color-mode-switch").querySelector(
        'input[type="checkbox"]'
      )
    ).toHaveProperty("checked", false);
  });

  test("switch should be on when in dark mode", () => {
    mockedColorMode = "dark";

    const { getByTestId } = render(<ToggleColorMode />, {
      wrapper: ThemeWrapper,
    });

    expect(
      getByTestId("toggle-color-mode-switch").querySelector(
        'input[type="checkbox"]'
      )
    ).toHaveProperty("checked", true);
  });

  test("switch should display correct text", () => {
    const { getByText } = render(<ToggleColorMode />, {
      wrapper: ThemeWrapper,
    });

    expect(getByText("Dark Mode")).toBeInTheDocument();
  });
});
