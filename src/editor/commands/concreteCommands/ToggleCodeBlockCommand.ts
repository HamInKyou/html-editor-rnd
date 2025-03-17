import { Editor } from 'slate';
import { Command } from '../Command';
import { toggleBlock } from '../../Editor.utils';

export class ToggleCodeBlockCommand extends Command {
  execute(editor: Editor): void {
    toggleBlock(editor, 'code');
  }
}
