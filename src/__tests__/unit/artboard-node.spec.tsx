import ArtboardNode from "@/components/artboard-node";
import type { Block } from "@/types/types";
import { render, screen } from "@testing-library/react";

describe("ArtboardNode", () => {
  it("renders text", () => {
    const block: Block = {
      type: "text",
      align: "center",
      id: "1",
      text: "Hello World",
    };
    render(<ArtboardNode block={block} />);
    expect(screen.queryByText("Hello World")).toBeInTheDocument();
    expect(screen.queryByText("Hello World")).toBeInstanceOf(
      HTMLParagraphElement,
    );
  });

  it("renders image", () => {
    const block: Block = {
      type: "image",
      id: "test-image",
      src: "https://via.placeholder.com/150",
      alt: "placeholder",
    };
    render(<ArtboardNode block={block} />);
    expect(screen.queryByAltText("placeholder")).toBeInTheDocument();
    const node = screen.queryByAltText("placeholder");
    expect(node).toBeInstanceOf(HTMLImageElement);
  });

  it("renders list of elements", () => {
    const block: Block = {
      type: "list",
      id: "test-image",
      items: [
        {
          id: "1",
          title: "test-list",
          description: "Description-1",
          src: "https://via.placeholder.com/150",
        },
        {
          id: "2",
          title: "test-list",
          description: "Description-2",
          src: "https://via.placeholder.com/150",
        },
      ],
    };
    render(<ArtboardNode block={block} />);
    expect(screen.queryAllByText("test-list").length).toEqual(2);
    const list = screen.queryByTestId("test-image");
    expect(list).toBeInstanceOf(HTMLUListElement);
    expect(list?.childElementCount).toEqual(2);
  });

  it("renders button", () => {
    const block: Block = {
      type: "button",
      id: "test-button",
      text: "Click me",
      bgColor: "red",
      color: "white",
    };
    render(<ArtboardNode block={block} />);
    expect(screen.queryByText("Click me")).toBeInTheDocument();
    const button = screen.queryByText("Click me");
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveStyle({ backgroundColor: "red", color: "white" });
  });

  it("renders button with invalid color", () => {
    const block: Block = {
      type: "button",
      id: "test-button",
      text: "Click me",
      bgColor: "",
      color: "",
    };
    render(
      <div style={{ backgroundColor: "red", color: "white" }}>
        <ArtboardNode block={block} />
      </div>,
    );
    expect(screen.queryByText("Click me")).toBeInTheDocument();
    const button = screen.queryByText("Click me");
    expect(button).toBeInstanceOf(HTMLButtonElement);
    expect(button).toHaveStyle({
      backgroundColor: "inherit",
      color: "ButtonText",
    });
  });

  it("renders default", () => {
    const block = { id: "default" };
    render(<ArtboardNode block={block as Block} />);
    expect(screen.queryByTestId("default")).toBeNull();
  });
});
