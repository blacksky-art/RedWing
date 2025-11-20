import { render, screen, waitFor } from "@testing-library/react";
import FlightList from "../FlightList";
import API from "../../api";

jest.mock("../../api");

describe("FlightList Component", () => {
  test("renders All Flights heading", async () => {
    API.get.mockResolvedValue({ data: [] });

    render(<FlightList />);

    await waitFor(() => {
      expect(screen.getByText("All Flights")).toBeInTheDocument();
    });
  });
});
