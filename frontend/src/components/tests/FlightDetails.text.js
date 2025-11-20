import { render, screen, fireEvent } from "@testing-library/react";
import FlightDetails from "../FlightDetails";
import API from "../../api";

jest.mock("../../api");

describe("FlightDetails Component", () => {
  const mockFlight = {
    _id: "1",
    flightNumber: "F101",
    date: new Date().toISOString(),
    filedBy: "Allen",
    checklist: [],
  };

  test("delete calls API and closes detail window", async () => {
    API.delete.mockResolvedValue({});
    window.confirm = jest.fn(() => true);

    const onClose = jest.fn();
    const onDeleted = jest.fn();

    render(
      <FlightDetails
        flight={mockFlight}
        onClose={onClose}
        onDeleted={onDeleted}
      />
    );

    fireEvent.click(screen.getByText("Delete Flight"));

    expect(API.delete).toHaveBeenCalledWith("/1");
    expect(onDeleted).toHaveBeenCalled();
    expect(onClose).toHaveBeenCalled();
  });
});
