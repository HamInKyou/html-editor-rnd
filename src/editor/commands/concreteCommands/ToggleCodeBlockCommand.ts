import { Editor, Element, Transforms } from "slate";
import { Command } from "../Command";
import { CustomElement } from "../../Editor.types";

export class ToggleCodeBlockCommand extends Command {
  execute(editor: Editor): void {
    const [match] = Editor.nodes(editor, {
      match: (n): n is CustomElement => Element.isElement(n) && 'type' in n && n.type === 'code'
    });

    Transforms.setNodes(
      editor,
      { type: match ? 'paragraph' : 'code' },
      { match: n => Element.isElement(n) && Editor.isBlock(editor, n) }
    );
  }
} 