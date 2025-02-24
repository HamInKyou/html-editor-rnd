import React from 'react';
import { RenderElementProps } from "slate-react";

export interface RenderStrategy {
  type: string;
  render(props: RenderElementProps): React.ReactElement;
} 