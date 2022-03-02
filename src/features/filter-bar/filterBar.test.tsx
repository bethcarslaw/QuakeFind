import { render } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Provider } from "react-redux";
import { FilterBar } from ".";
import * as storeHooks from "../../app/hooks";
import { store } from "../../app/store";

describe("<FilterBar />", () => {
  let mockDispatch: any;
  let mockSelector: any;

  beforeEach(() => {
    mockDispatch = jest.spyOn(storeHooks, "useAppDispatch");
    mockSelector = jest
      .spyOn(storeHooks, "useAppSelector")
      .mockImplementation(() => ["abc", "efg"]);
  });

  afterEach(() => {
    mockDispatch.mockClear();
    mockSelector.mockClear();
  });
  test("should show correct magTypes", () => {
    const { getAllByRole } = render(
      <Provider store={store}>
        <FilterBar />
      </Provider>
    );
    const options = getAllByRole("option");
    expect(options.length).toBe(3);

    const expectedOptions = ["", "abc", "efg"];
    options.forEach((option, i) =>
      expect((option as HTMLInputElement).value).toEqual(expectedOptions[i])
    );
  });

  test("should call appDispatch when clicking go", () => {
    const testDispatch = jest.fn();
    mockDispatch.mockReturnValue(testDispatch);
    const { getByTestId } = render(
      <Provider store={store}>
        <FilterBar />
      </Provider>
    );

    userEvent.click(getByTestId("submit-filter"));

    expect(mockDispatch).toHaveBeenCalledWith();
  });
});
