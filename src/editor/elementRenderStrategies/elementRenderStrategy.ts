import React from 'react';
import { RenderElementProps } from "slate-react";
import { type EditorElementType } from "../Editor.types";

export abstract class ElementRenderStrategy {
  abstract type: EditorElementType;
  abstract render(props: RenderElementProps): React.ReactElement;
} 