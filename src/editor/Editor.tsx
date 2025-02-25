import { createEditor, Transforms, Editor as SlateEditor, Element as SlateElement, Descendant } from "slate";
import { Editable, RenderElementProps, Slate, withReact } from "slate-react";
import {  useCallback, useState } from "react";
import { type CustomElement } from "./Editor.types"
import { CodeElementRenderStrategy } from "./elementRenderStrategies/concreteStrategies/codeElementRenderStrategy";
import { ParagraphElementRenderStrategy } from "./elementRenderStrategies/concreteStrategies/paragraphElementRenderStrategy";
import { ElementRenderStrategy } from "./elementRenderStrategies/elementRenderStrategy";

const initialValue: Descendant[] = [
    {
        type: 'paragraph',
        children: [{ text: 'A line of text in a paragraph.' }],
    },
]

export function Editor() {
    const [editor] = useState(() => withReact(createEditor()))
    const renderElement = useCallback((props: RenderElementProps) => <Element {...props} />, [])
      
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


function Element(props: RenderElementProps){
  const strategies: ElementRenderStrategy[] = [
    new CodeElementRenderStrategy(),
    new ParagraphElementRenderStrategy()
  ];

  const strategy = strategies.find(s => s.type === props.element.type) 
    ?? new ParagraphElementRenderStrategy();
    
  return strategy.render(props);
}