import React from "react";

import {
  render,
  waitFor,
  getByRole as globalGetByRole,
  getByText as globalGetByText,
  fireEvent,
} from "@testing-library/react";
import "@testing-library/jest-dom";
import userEvent from "@testing-library/user-event";

import ComboBox from "./ComboBox";
const isPostCodeValid = jest.fn();
const getOptions = jest.fn();
const options = [
  { postcode: "SW13 0AA" },
  { postcode: "SW13 0AB" },
  { postcode: "SW13 0AD" },
  { postcode: "SW13 0AE" },
  { postcode: "SW13 0AG" },
  { postcode: "SW13 0AH" },
  { postcode: "SW13 0AJ" },
  { postcode: "SW13 0AL" },
  { postcode: "SW13 0AN" },
  { postcode: "SW13 0AP" },
];
describe("<ComboBox />", () => {
  it("should render ComboBox", async () => {
    const { getByTestId, getByRole, queryByRole } = render(
      <ComboBox
        options={options}
        isPostCodeValid={isPostCodeValid}
        getOptions={getOptions}
      />,
      {}
    );
    expect(getByTestId("comboBoxTestId")).toBeInTheDocument();
    expect(getByTestId("postcode")).toBeInTheDocument();
    expect(getByTestId("postcodeLabel")).toBeInTheDocument();
    expect(getByTestId("postcodeSubmitButton")).toBeInTheDocument();
    await waitFor(() => userEvent.click(getByTestId("postcodeSubmitButton")));
    expect(isPostCodeValid).toBeCalledTimes(1);
    expect(getOptions).toBeCalledTimes(0);
    const AutoComplete = getByTestId("postcode");
    const Input = globalGetByRole(AutoComplete, "textbox");

    expect(queryByRole("listbox")).toBeNull();
    await waitFor(() => fireEvent.mouseDown(Input));
    const ListBox = getByRole("listbox");
    expect(ListBox).toBeDefined();
    const menuItem1 = globalGetByText(ListBox, options[0].postcode);
    await waitFor(() => fireEvent.click(menuItem1));
    expect(queryByRole("listbox")).toBeNull();
  });
});
