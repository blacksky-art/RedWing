import { render, screen, fireEvent } from "@testing-library/react";
import ChecklistItem from "../CheckListItem";
import API from "../../api";

jest.mock("../../api");

global.alert = jest.fn();

describe("ChecklistItem Component", () => {
  const item = {
    _id: "123",
    checkName: "Engine Check",
    status: "pending",
    comments: ""
  };

  test("updates checklist status", async () => {
    API.patch.mockResolvedValue({});

    render(<ChecklistItem item={item} flightId="F1" />);

    fireEvent.change(screen.getByDisplayValue("pending"), {
      target: { value: "completed" }
    });

    fireEvent.click(screen.getByText("Update"));

    expect(API.patch).toHaveBeenCalledWith(
      "/F1/checklist/123",
      expect.objectContaining({ status: "completed" })
    );
  });
});
