import React from "react";

import { render, waitFor } from "@testing-library/react";
import "@testing-library/jest-dom";
import CardForPostcodeDetails from "./CardForPostcodeDetails";
import userEvent from "@testing-library/user-event";

const handleClick = jest.fn();
const postcodeDetails = {
  postcode: "SW13 0AA",
  region: "London",
  country: "England",
  latitude: 51.471836,
  longitude: -0.248994,
};
describe("<CardForPostcodeDetails />", () => {
  it("should render CardForPostcodeDetails", async () => {
    const { getByTestId } = render(
      <CardForPostcodeDetails
        onClick={handleClick}
        postcodeDetails={postcodeDetails}
      />,
      {}
    );

    expect(getByTestId("cardWrapper")).toBeInTheDocument();
    expect(getByTestId("cardHeader")).toBeInTheDocument();
    expect(getByTestId("region")).toBeInTheDocument();
    expect(getByTestId("mapContainer")).toBeInTheDocument();
    expect(getByTestId("country")).toBeInTheDocument();
    userEvent.click(getByTestId("cardWrapper"));
    expect(handleClick).toBeCalledTimes(1);
    expect(getByTestId("region").textContent).toBe("Region: London");
    expect(getByTestId("country").textContent).toBe("Country: England");
  });

  it("should not render MapContainer in CardForPostcodeDetails", async () => {
    const { getByTestId } = render(
      <CardForPostcodeDetails
        onClick={handleClick}
        postcodeDetails={postcodeDetails}
        noMap
      />,
      {}
    );
    expect(getByTestId("mapContainer").children.length).toBe(0);
  });
});
