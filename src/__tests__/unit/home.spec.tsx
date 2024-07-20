import Home from "@/app/page";
import { act, render, screen, waitFor } from "@testing-library/react";
import user from "@testing-library/user-event";

describe("Homepage", () => {
  it("renders with initial state", () => {
    render(<Home />);

    const canvas = screen.queryByTestId("canvas");
    expect(canvas).toBeInTheDocument();
    expect(canvas?.children.length).toBe(0);

    const dropzoneContainer = screen.getByTestId("dropzone-container");
    expect(dropzoneContainer).toBeInTheDocument();
    expect(dropzoneContainer.children.length).toBe(1);
    expect(dropzoneContainer.children[0]).toHaveTextContent(
      "Upload a funnel json",
    );
  });

  it("renders with user uploading state", async () => {
    user.setup();
    render(<Home />);
    const dropzoneFileInput = screen.getByTestId(
      "dropzone-file",
    ) as HTMLInputElement;

    const file = new File(["foo"], "foo.json", {
      type: "application/json",
    });

    await act(async () => {
      await waitFor(async () => {
        await user.upload(dropzoneFileInput, file);
      });
    });
    expect(screen.queryByText("Upload a funnel json")).not.toBeInTheDocument();
    expect(screen.getByText("Uploading file...")).toBeInTheDocument();
    expect(screen.getByTestId("sidebar-skeleton")).toBeInTheDocument();
    expect(screen.getByTestId("artboard-skeleton")).toBeInTheDocument();
  });
});
