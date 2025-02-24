import React from 'react';
import { RenderElementProps } from "slate-react";
import { CSSProperties } from "react";
import { RenderStrategy } from "./RenderStrategy";

export class ParagraphElementStrategy implements RenderStrategy {
  type = "paragraph";
  
  render(props: RenderElementProps): React.ReactElement {
    const style = {
      margin: 0
    } as CSSProperties;

    return <p {...props.attributes} style={style}>{props.children}</p>;
  }
} 