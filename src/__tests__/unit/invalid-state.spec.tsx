import InvalidState from "@/components/invalid-state";

import { render, screen } from "@testing-library/react";

describe("InvalidState", () => {
  it("renders with initial state", () => {
    render(<InvalidState />);
    expect(screen.queryByTestId("invalid-state")).toBeInTheDocument();
    expect(screen.queryByText("Copy")).toBeInTheDocument();
    expect(screen.queryByText("Invalid json schema")).toBeInTheDocument();
    expect(
      screen.queryByText(
        "Try to upload another json, similar to the structure below 👇",
      ),
    ).toBeInTheDocument();
  });
});
