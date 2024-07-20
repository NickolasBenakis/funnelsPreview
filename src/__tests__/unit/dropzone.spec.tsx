import Dropzone from "@/components/dropzone";
import { ErrorType } from "@/hooks/use-file";
import { render, screen } from "@testing-library/react";

describe("Dropzone", () => {
  it("renders with initial state", () => {
    render(
      <Dropzone
        error={undefined}
        onFileChange={() => {}}
        onFileDragOver={() => {}}
        onFileDrop={() => {}}
        onFileReset={() => {}}
        isLoading={false}
      />,
    );

    expect(screen.queryByText("Upload a funnel json")).toBeInTheDocument();
  });

  [
    ErrorType.NoFileDetected,
    ErrorType.InvalidJsonSchema,
    ErrorType.InvalidFileType,
  ].forEach((error) => {
    it(`renders with error ${error} state`, () => {
      render(
        <Dropzone
          error={error}
          onFileChange={() => {}}
          onFileDragOver={() => {}}
          onFileDrop={() => {}}
          onFileReset={() => {}}
          isLoading={false}
        />,
      );

      expect(
        screen.queryByText("Upload a funnel json"),
      ).not.toBeInTheDocument();
      expect(screen.queryByText("Try again")).toBeInTheDocument();
    });
  });

  it("renders with loading state", () => {
    render(
      <Dropzone
        error={undefined}
        onFileChange={() => {}}
        onFileDragOver={() => {}}
        onFileDrop={() => {}}
        onFileReset={() => {}}
        isLoading={true}
      />,
    );

    expect(screen.queryByText("Uploading file...")).toBeInTheDocument();
  });
});
