import {
  getNode,
  getNodeEntries,
  getNodeString,
  getPoint,
  getPointBefore,
  isCollapsed,
  PlateEditor,
  queryNode,
  removeNodes,
  select,
  Value,
  WithPlatePlugin,
} from '@udecode/plate-common';
import Slate from 'slate';

import { SelectOnBackspacePlugin } from './createSelectOnBackspacePlugin';

/**
 * Set a list of element types to select on backspace
 */
export const withSelectOnBackspace = <
  V extends Value = Value,
  E extends PlateEditor<V> = PlateEditor<V>,
>(
  editor: E,
  { options: { query } }: WithPlatePlugin<SelectOnBackspacePlugin, V, E>
) => {
  const { deleteBackward } = editor;

  editor.deleteBackward = (unit: 'character' | 'word' | 'line' | 'block') => {
    const { selection } = editor;

    if (unit === 'character' && isCollapsed(selection)) {
      const pointBefore = getPointBefore(editor, selection as Slate.Location, {
        unit,
      });

      if (pointBefore) {
        const [prevCell] = getNodeEntries(editor, {
          match: (node) => queryNode([node, pointBefore.path], query),
          at: pointBefore,
        });

        if (!!prevCell && pointBefore) {
          const point = getPoint(editor, selection as Slate.Location);
          const selectedNode = getNode(editor, point.path);
          if (selectedNode && !getNodeString(selectedNode as any)) {
            // remove node if empty
            removeNodes(editor);
          }

          // don't delete image, set selection there
          select(editor, pointBefore);
        } else {
          deleteBackward(unit);
        }
      } else {
        deleteBackward(unit);
      }
    } else {
      deleteBackward(unit);
    }
  };

  return editor;
};
