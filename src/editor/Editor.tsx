import { createEditor, Transforms, Editor as SlateEditor, Element as SlateElement, Descendant } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import {  useCallback, useState } from "react";
import { type CustomElement } from "./Editor.types"
import { CodeElementStrategy } from "./strategies/CodeElementStrategy";
import { ParagraphElementStrategy } from "./strategies/ParagraphElementStrategy";
import { RenderStrategy } from "./strategies/RenderStrategy";

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

export function Editor() {
    const [editor] = useState(() => withReact(createEditor()))
      
    const strategies: RenderStrategy[] = [
      new CodeElementStrategy(),
      new ParagraphElementStrategy()
    ];
      
    const renderElement = useCallback((props: RenderElementProps) => {
        const strategy = strategies.find(s => s.type === props.element.type) 
          ?? new ParagraphElementStrategy();
        return strategy.render(props);
    }, []);
      
    return (
        <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderElement={renderElement}
          onKeyDown={event => {
            if (event.key === '`' && event.ctrlKey) {
              event.preventDefault()
              // Determine whether any of the currently selected blocks are code blocks.
              const [match] = SlateEditor.nodes(editor, {
                match: (n): n is CustomElement => SlateElement.isElement(n) && 'type' in n && n.type === 'code'
              })
              // Toggle the block type depending on whether there's already a match.
              Transforms.setNodes(
                editor,
                { type: match ? 'paragraph' : 'code' },
                { match: n => SlateElement.isElement(n) && SlateEditor.isBlock(editor, n) }
              )
            }
          }}
        />
      </Slate>
    )
} 