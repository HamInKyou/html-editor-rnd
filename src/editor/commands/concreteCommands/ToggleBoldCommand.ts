import { Editor } from "slate";
import { Command } from "../Command";
import { toggleMark } from "../../Editor.utils";

export class ToggleBoldCommand extends Command {
  execute(editor: Editor): void {
    toggleMark(editor, 'bold');
  }
} 