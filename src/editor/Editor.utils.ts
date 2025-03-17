import { Transforms } from 'slate';
import { Editor, Element } from 'slate';
import { CustomElement, EditorElementType, EditorMarkType } from './Editor.types';

/**
 * 블록 타입이 활성화되어 있는지 확인하는 유틸리티 함수
 */
export const isBlockActive = (editor: Editor, type: EditorElementType) => {
  const [match] = Editor.nodes(editor, {
    match: (n): n is CustomElement => Element.isElement(n) && 'type' in n && n.type === type,
  });
  return !!match;
};

/**
 * 블록 타입을 토글하는 유틸리티 함수
 */
export const toggleBlock = (editor: Editor, type: EditorElementType) => {
  const isActive = isBlockActive(editor, type);

  Transforms.setNodes(
    editor,
    { type: isActive ? 'paragraph' : type },
    { match: (n) => Element.isElement(n) && Editor.isBlock(editor, n) },
  );
};

/**
 * 마크가 활성화되어 있는지 확인하는 유틸리티 함수
 */
export const isMarkActive = (editor: Editor, markType: EditorMarkType) => {
  const isActive = Editor.marks(editor)?.[markType] === true;
  return isActive;
};

/**
 * 마크를 토글하는 유틸리티 함수
 */
export const toggleMark = (editor: Editor, markType: EditorMarkType) => {
  const isActive = isMarkActive(editor, markType);
  if (isActive) {
    Editor.removeMark(editor, markType);
  } else {
    Editor.addMark(editor, markType, true);
  }
};
