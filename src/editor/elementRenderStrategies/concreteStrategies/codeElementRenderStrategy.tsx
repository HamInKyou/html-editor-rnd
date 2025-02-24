import { RenderElementProps } from "slate-react";
import React, { CSSProperties } from "react";
import { ElementRenderStrategy } from "../elementRenderStrategy";

export class CodeElementRenderStrategy implements ElementRenderStrategy {
  type = "code";
  
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