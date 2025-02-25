import { createEditor, Transforms, Editor as SlateEditor, Element as SlateElement, Descendant } from "slate";
import { Editable, RenderElementProps, RenderLeafProps, Slate, withReact } from "slate-react";
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
    const renderLeaf = useCallback((props: RenderLeafProps) => <Leaf {...props} />, [])
      
    return (
        <Slate editor={editor} initialValue={initialValue}>
        <Editable
          renderElement={renderElement}
          renderLeaf={renderLeaf}
          onKeyDown={event => {
            if (!event.ctrlKey) {
              return
            }
  
            switch (event.key) {
              // When "`" is pressed, keep our existing code block logic.
              case '`': {
                event.preventDefault()
                const [match] = SlateEditor.nodes(editor, {
                     match: (n): n is CustomElement => SlateElement.isElement(n) && 'type' in n && n.type === 'code'
                })
                Transforms.setNodes(
                  editor,
                  { type: match ? 'paragraph' : 'code' },
                  { match: n => SlateElement.isElement(n) && SlateEditor.isBlock(editor, n) }
                )
                break
              }
  
              // When "B" is pressed, bold the text in the selection.
              case 'b': {
                event.preventDefault()
                const isCurrentlyBold = SlateEditor.marks(editor)?.bold === true
                if (isCurrentlyBold) {
                  SlateEditor.removeMark(editor, 'bold')
                } else {
                  SlateEditor.addMark(editor, 'bold', true)
                }
                break
              }
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