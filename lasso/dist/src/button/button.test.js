import { jsx as _jsx } from "react/jsx-runtime";
import { render, screen } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Button } from "./button";
describe("Button", () => {
    it("renders the provided children", () => {
        render(_jsx(Button, { children: "Click me" }));
        expect(screen.getByRole("button", { name: "Click me" })).toBeInTheDocument();
    });
});
