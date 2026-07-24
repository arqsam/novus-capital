import { render } from "@testing-library/react";
import App from "../App";

describe("smoke test", () => {
  it("renders the app without crashing", () => {
    render(<App />);
    expect(document.body).toBeInTheDocument();
  });
});
