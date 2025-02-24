import { RenderElementProps } from "slate-react";
import React, { CSSProperties } from "react";
import { RenderStrategy } from "./RenderStrategy";

export class CodeElementStrategy implements RenderStrategy {
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