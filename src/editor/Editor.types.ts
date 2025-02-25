import { BaseEditor } from 'slate'
import { ReactEditor } from 'slate-react'

export const EDITOR_ELEMENT_TYPE = {
  PARAGRAPH: 'paragraph',
  CODE: 'code'
} as const;

export type EditorElementType = typeof EDITOR_ELEMENT_TYPE[keyof typeof EDITOR_ELEMENT_TYPE];

export type CustomElement = { 
  type: EditorElementType;
  children: CustomText[] 
}

export type CustomText = { text: string, bold?: boolean }

declare module 'slate' {
  interface CustomTypes {
    Editor: BaseEditor & ReactEditor
    Element: CustomElement
    Text: CustomText
  }
}