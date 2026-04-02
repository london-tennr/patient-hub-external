import { Button } from "../button/button";
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "./sheet";

const BasicSheetStory = () => (
  <Sheet>
    <SheetTrigger asChild>
      <Button>Open Sheet</Button>
    </SheetTrigger>
    <SheetContent side="right">
      <SheetHeader>
        <SheetTitle>Sheet Title</SheetTitle>
        <SheetDescription>This is a basic sheet example.</SheetDescription>
      </SheetHeader>
      <p>Sheet content goes here.</p>
    </SheetContent>
  </Sheet>
);

export default {
  title: "Components/Sheet",
  component: Sheet,
  tags: ["autodocs"],
};

export const Basic = BasicSheetStory;
