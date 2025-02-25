import { Editor } from "slate";

export abstract class Command {
  abstract execute(editor: Editor): void;
} 