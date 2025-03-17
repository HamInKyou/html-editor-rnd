import React from 'react';
import { RenderElementProps } from 'slate-react';
import { CSSProperties } from 'react';
import { ElementRenderStrategy } from '../elementRenderStrategy';
import { EDITOR_ELEMENT_TYPE, type EditorElementType } from '../../Editor.types';

export class ParagraphElementRenderStrategy extends ElementRenderStrategy {
  type: EditorElementType = EDITOR_ELEMENT_TYPE.PARAGRAPH;

  render(props: RenderElementProps): React.ReactElement {
    const style = {
      margin: 0,
    } as CSSProperties;

    return (
      <p {...props.attributes} style={style}>
        {props.children}
      </p>
    );
  }
}
