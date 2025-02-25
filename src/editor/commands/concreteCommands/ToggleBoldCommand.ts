import { Editor } from "slate";
import { Command } from "../Command";

export class ToggleBoldCommand extends Command {
  execute(editor: Editor): void {
    const isCurrentlyBold = Editor.marks(editor)?.bold === true;
    if (isCurrentlyBold) {
      Editor.removeMark(editor, 'bold');
    } else {
      Editor.addMark(editor, 'bold', true);
    }
  }
} 