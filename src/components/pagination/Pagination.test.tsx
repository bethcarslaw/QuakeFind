import { render, waitFor } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { Pagination, PaginationProps } from ".";

const handlePrev = jest.fn();
const handleNext = jest.fn();
const handleInput = jest.fn();

const dummyProps: PaginationProps = {
  currentPage: "1",
  totalPages: "5",
  handlePrevClick: handlePrev,
  handleNextClick: handleNext,
  handlePageInputChange: handleInput,
  isDisabled: false,
};

describe("<Pagination />", () => {
  test("should display the correct text information", () => {
    const { getByTestId } = render(<Pagination {...dummyProps} />);

    expect(getByTestId("pagination-text")).toHaveTextContent("Page of 5");
    expect(getByTestId("pagination-input")).toHaveValue(1);
  });

  test("should call the correct previous function", () => {
    const { getByTestId } = render(<Pagination {...dummyProps} />);

    userEvent.click(getByTestId("pagination-prev-button"));

    waitFor(() => expect(handlePrev).toHaveBeenCalled());
  });

  test("should call the correct next function", () => {
    const { getByTestId } = render(<Pagination {...dummyProps} />);

    userEvent.click(getByTestId("pagination-next-button"));

    waitFor(() => expect(handleNext).toHaveBeenCalled());
  });

  test("should call the correct input function", () => {
    const { getByTestId } = render(<Pagination {...dummyProps} />);

    userEvent.type(getByTestId("pagination-input"), "5");

    waitFor(() => expect(handleInput).toHaveBeenCalledWith("5"));
  });

  test("should disable prev button if page is first page", () => {
    const { getByTestId } = render(<Pagination {...dummyProps} />);

    userEvent.click(getByTestId("pagination-prev-button"));

    expect(getByTestId("pagination-prev-button")).toHaveProperty(
      "disabled",
      true
    );
    expect(handlePrev).not.toHaveBeenCalled();
  });

  test("should disable prev button if page is last page", () => {
    const props = { ...dummyProps, currentPage: "5" };
    const { getByTestId } = render(<Pagination {...props} />);

    userEvent.click(getByTestId("pagination-next-button"));

    expect(getByTestId("pagination-next-button")).toHaveProperty(
      "disabled",
      true
    );
    expect(handleNext).not.toHaveBeenCalled();
  });

  test("should disable all inputs if isDisabled is true", () => {
    const props = { ...dummyProps, isDisabled: true };
    const { getByTestId } = render(<Pagination {...props} />);

    expect(getByTestId("pagination-prev-button")).toHaveProperty(
      "disabled",
      true
    );
    expect(getByTestId("pagination-next-button")).toHaveProperty(
      "disabled",
      true
    );

    expect(getByTestId("pagination-input")).toHaveProperty("disabled", true);
  });

  test("should disable all inputs if total pages is 0", () => {
    const props = { ...dummyProps, totalPages: "0" };
    const { getByTestId } = render(<Pagination {...props} />);

    expect(getByTestId("pagination-prev-button")).toHaveProperty(
      "disabled",
      true
    );
    expect(getByTestId("pagination-next-button")).toHaveProperty(
      "disabled",
      true
    );

    expect(getByTestId("pagination-input")).toHaveProperty("disabled", true);
  });
});
