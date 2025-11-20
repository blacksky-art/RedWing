import { render, screen, fireEvent, waitFor } from "@testing-library/react";
import FlightForm from "../FlightForm";
import API from "../../api";

jest.mock("../../api");

describe("FlightForm Component", () => {

  test("validates empty fields", async () => {
    render(<FlightForm />);

    fireEvent.click(screen.getByRole("button", { name: /create flight/i }));

    // findBy already waits (no waitFor needed)
    expect(await screen.findByText("Please fill in all fields.")).toBeInTheDocument();
  });

  test("submits form successfully", async () => {
    API.post.mockResolvedValue({ data: { success: true } });

    const onCreated = jest.fn();
    render(<FlightForm onCreated={onCreated} />);

    // Fill form
    fireEvent.change(screen.getByPlaceholderText("e.g., F102"), {
      target: { value: "F101" },
    });

    fireEvent.change(screen.getByPlaceholderText("Officer name"), {
      target: { value: "Allen" },
    });

    fireEvent.change(screen.getByLabelText("Filing Time:"), {
      target: { value: "2025-11-19T10:00" },
    });

    fireEvent.change(screen.getByLabelText("Departure Location:"), {
      target: { value: "Delhi" },
    });

    fireEvent.change(screen.getByLabelText("Departure Time:"), {
      target: { value: "2025-11-19T12:00" },
    });

    fireEvent.change(screen.getByLabelText("Arrival Location:"), {
      target: { value: "Mumbai" },
    });

    fireEvent.change(screen.getByLabelText("Estimated Arrival Time:"), {
      target: { value: "2025-11-19T14:00" },
    });

    fireEvent.click(screen.getByRole("button", { name: /create flight/i }));

    // ❗ One assertion per waitFor
    await waitFor(() => expect(API.post).toHaveBeenCalled());

    await waitFor(() => expect(onCreated).toHaveBeenCalled());
  });
});
