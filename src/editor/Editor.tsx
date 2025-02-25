import { createEditor, Descendant } from "slate";
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
import {  useCallback, useState } from "react";
import { CodeElementRenderStrategy } from "./elementRenderStrategies/concreteStrategies/codeElementRenderStrategy";
import { ParagraphElementRenderStrategy } from "./elementRenderStrategies/concreteStrategies/paragraphElementRenderStrategy";
import { ElementRenderStrategy } from "./elementRenderStrategies/elementRenderStrategy";
import { ToggleBoldCommand } from "./commands/concreteCommands/ToggleBoldCommand";
import { ToggleCodeBlockCommand } from "./commands/concreteCommands/ToggleCodeBlockCommand";
import isHotkey from 'is-hotkey';

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

export function Editor() {
    const [editor] = useState(() => withReact(createEditor()))
    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
    
    const COMMANDS = {
      'toggle-code-block': new ToggleCodeBlockCommand(),
      'toggle-bold': new ToggleBoldCommand()
    }

    const HOTKEYS = {
      'ctrl+`': COMMANDS['toggle-code-block'],
      'ctrl+b': COMMANDS['toggle-bold'],
      'meta+b': COMMANDS['toggle-bold']
    };

    const handleKeyDown = useCallback((event: React.KeyboardEvent<HTMLElement>) => {
        for (const [hotkey, command] of Object.entries(HOTKEYS)) {
          if (isHotkey(hotkey, event)) {
            event.preventDefault();
            command.execute(editor);
            return;
          }
        }
      }, []);
      
    return (
        <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={handleKeyDown}
        />
      </Slate>
    )
} 


function Element(props: RenderElementProps){
  const strategies: ElementRenderStrategy[] = [
    new CodeElementRenderStrategy(),
    new ParagraphElementRenderStrategy()
  ];

  const strategy = strategies.find(s => s.type === props.element.type) 
    ?? new ParagraphElementRenderStrategy();

  return strategy.render(props);
}

function Leaf(props: RenderLeafProps) {
  return (
    <span
      {...props.attributes}
      style={{ fontWeight: props.leaf.bold ? 'bold' : 'normal' }}
    >
      {props.children}
    </span>
  );
}