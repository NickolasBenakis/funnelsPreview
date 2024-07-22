import { renderHook } from "@testing-library/react";
import React from "react";
import useFile from "../../hooks/use-file";

describe("useFile", () => {
  it("should return a function", () => {
    expect(useFile).toBeInstanceOf(Function);
  });

  it("should render as hook", () => {
    const { result } = renderHook(() => useFile());

    const signature: ReturnType<typeof useFile> = {
      funnelJson: undefined,
      isLoading: false,
      error: undefined,
      currentFunnelPage: 1,
      onFunnelPageChange: expect.any(Function),
      onFileChange: expect.any(Function),
      onFileReset: expect.any(Function),
      onFileDrop: expect.any(Function),
      onFileDragOver: expect.any(Function),
      onClearState: expect.any(Function),
    };
    expect(result.current).toEqual(signature);
  });
});
