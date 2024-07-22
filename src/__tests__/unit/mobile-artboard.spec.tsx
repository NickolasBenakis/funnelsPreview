import MobileArtboard from "@/components/mobile-artboard";

import { render, screen } from "@testing-library/react";

describe("MobileArtboard", () => {
  it("does not render mobile artboard", () => {
    render(
      <MobileArtboard isVisible={false} bgColor="" id="1">
        <p>Test</p>
      </MobileArtboard>,
    );
    expect(screen.queryByTestId("artboard-1")).not.toBeInTheDocument();
  });

  it("does render mobile artboard", () => {
    render(
      <MobileArtboard isVisible={true} bgColor="" id="1">
        <p>Test</p>
      </MobileArtboard>,
    );
    expect(screen.queryByTestId("artboard-1")).toBeInTheDocument();
  });

  it("does render mobile artboard with bgcolor blue", () => {
    render(
      <MobileArtboard isVisible={true} bgColor="blue" id="1">
        <p>Test</p>
      </MobileArtboard>,
    );
    expect(screen.queryByTestId("artboard-1")).toBeInTheDocument();
    expect(screen.queryByTestId("artboard-1")).toHaveStyle({
      backgroundColor: "blue",
    });
  });

  it("does render mobile artboard with children", () => {
    render(
      <MobileArtboard isVisible={true} bgColor="blue" id="1">
        <p>Test</p>
      </MobileArtboard>,
    );
    expect(screen.queryByText("Test")).toBeInTheDocument();
  });
});
