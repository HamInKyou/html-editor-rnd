import React from 'react';
import { RenderElementProps } from "slate-react";

export interface ElementRenderStrategy {
  type: string;
  render(props: RenderElementProps): React.ReactElement;
} 