import { Separator } from "./separator";

export default {
  title: "Components/Separator",
  component: Separator,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
};

export const Default = () => (
  <div style={{ width: 200 }}>
    <div>Above</div>
    <Separator />
    <div>Below</div>
  </div>
);
