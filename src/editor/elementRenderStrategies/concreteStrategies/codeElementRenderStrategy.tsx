import { RenderElementProps } from "slate-react";
import React, { CSSProperties,  } from "react";
import { ElementRenderStrategy } from "../elementRenderStrategy";
import { EDITOR_ELEMENT_TYPE, type EditorElementType } from "../../Editor.types";

export class CodeElementRenderStrategy extends ElementRenderStrategy {
  type: EditorElementType = EDITOR_ELEMENT_TYPE.CODE;
  
  render(props: RenderElementProps): React.ReactElement {
    const style = {
      margin: 0
    } as CSSProperties;

    return (
      <pre {...props.attributes} style={style}>
        <code>{props.children}</code>
      </pre>
    );
  }
} 