import './dnd.css';
import 'tippy.js/dist/tippy.css';
import React, { useMemo } from 'react';
import { DndProvider } from 'react-dnd';
import { HTML5Backend } from 'react-dnd-html5-backend';
import { Meta } from '@storybook/react/types-6-0';
import { Image } from '@styled-icons/material/Image';
import { Link } from '@styled-icons/material/Link';
import { Search } from '@styled-icons/material/Search';
import { createBlockquotePlugin } from '@udecode/plate-block-quote';
import { createCodeBlockPlugin } from '@udecode/plate-code-block';
import { withProps } from '@udecode/plate-common';
import { createHistoryPlugin, createReactPlugin, PlatePlugin } from '@udecode/plate-core';
import { createHeadingPlugin, ELEMENT_H1 } from '@udecode/plate-heading';
import { createImagePlugin, ELEMENT_IMAGE } from '@udecode/plate-image';
import { createLinkPlugin } from '@udecode/plate-link';
import { ELEMENT_MENTION } from '@udecode/plate-mention';
import { MentionElement } from '@udecode/plate-mention-ui';
import {
  createParagraphPlugin,
  ELEMENT_PARAGRAPH,
} from '@udecode/plate-paragraph';
import { HeadingToolbar } from '@udecode/plate-toolbar';
import { initialValuePlayground } from '../docs/src/live/config/initialValues';
import {
  editableProps,
  optionsAutoformat,
  optionsExitBreakPlugin,
  optionsMentionPlugin,
  optionsResetBlockTypePlugin,
  optionsSoftBreakPlugin,
} from '../docs/src/live/config/pluginOptions';
import { renderMentionLabel } from '../docs/src/live/config/renderMentionLabel';
import {
  BallonToolbarMarks,
  ToolbarButtonsAlign,
  ToolbarButtonsBasicElements,
  ToolbarButtonsBasicMarks,
  ToolbarButtonsList,
  ToolbarButtonsTable,
} from '../docs/src/live/config/Toolbars';
import { withStyledDraggables } from '../docs/src/live/config/withStyledDraggables';
import { withStyledPlaceHolders } from '../docs/src/live/config/withStyledPlaceHolders';
import { createAutoformatPlugin } from '../packages/autoformat/src/createAutoformatPlugin';
import { createExitBreakPlugin } from '../packages/break/src/exit-break/createExitBreakPlugin';
import { createSoftBreakPlugin } from '../packages/break/src/soft-break/createSoftBreakPlugin';
import { Plate } from '../packages/core/src/components/Plate';
import { createDndPlugin } from '../packages/dnd/src/createDndPlugin';
import { createAlignPlugin } from '../packages/elements/alignment/src/createAlignPlugin';
import { ToolbarImage } from '../packages/elements/image-ui/src/ToolbarImage/ToolbarImage';
import { ToolbarLink } from '../packages/elements/link-ui/src/ToolbarLink/ToolbarLink';
import { createListPlugin } from '../packages/elements/list/src/createListPlugin';
import { createTodoListPlugin } from '../packages/elements/list/src/todo-list/createTodoListPlugin';
import { createMediaEmbedPlugin } from '../packages/elements/media-embed/src/createMediaEmbedPlugin';
import { useMentionPlugin } from '../packages/elements/mention/src/useMentionPlugin';
import { MentionSelect } from '../packages/elements/mention-ui/src/MentionSelect/MentionSelect';
import { createTablePlugin } from '../packages/elements/table/src/createTablePlugin';
import { useFindReplacePlugin } from '../packages/find-replace/src/useFindReplacePlugin';
import { ToolbarSearchHighlight } from '../packages/find-replace-ui/src/ToolbarSearchHighlight/ToolbarSearchHighlight';
import { createBoldPlugin } from '../packages/marks/basic-marks/src/bold/createBoldPlugin';
import { createCodePlugin } from '../packages/marks/basic-marks/src/code/createCodePlugin';
import { createItalicPlugin } from '../packages/marks/basic-marks/src/italic/createItalicPlugin';
import { createStrikethroughPlugin } from '../packages/marks/basic-marks/src/strikethrough/createStrikethroughPlugin';
import { createSubscriptPlugin } from '../packages/marks/basic-marks/src/subscript/createSubscriptPlugin';
import { createSuperscriptPlugin } from '../packages/marks/basic-marks/src/superscript/createSuperscriptPlugin';
import { createUnderlinePlugin } from '../packages/marks/basic-marks/src/underline/createUnderlinePlugin';
import { createHighlightPlugin } from '../packages/marks/highlight/src/createHighlightPlugin';
import { createKbdPlugin } from '../packages/marks/kbd/src/createKbdPlugin';
import { createNodeIdPlugin } from '../packages/node-id/src/createNodeIdPlugin';
import { createPlateComponents } from '../packages/plate/src/utils/createPlateComponents';
import { createPlateOptions } from '../packages/plate/src/utils/createPlateOptions';
import { createResetNodePlugin } from '../packages/reset-node/src/createResetNodePlugin';
import { createSelectOnBackspacePlugin } from '../packages/select/src/createSelectOnBackspacePlugin';
import { createDeserializeHTMLPlugin } from '../packages/serializers/html-serializer/src/deserializer/createDeserializeHTMLPlugin';
import { createTrailingBlockPlugin } from '../packages/trailing-block/src/createTrailingBlockPlugin';
import { SPEditor } from '@udecode/plate-core/src/types';
import { createDeserializeAstPlugin, createDeserializeCSVPlugin, createDeserializeMDPlugin, createFontBackgroundColorPlugin, createFontColorPlugin, MARK_BG_COLOR, MARK_COLOR, StyledLeaf, withStyledProps } from '@udecode/plate';
import { createExcalidrawPlugin, ELEMENT_EXCALIDRAW } from '@udecode/plate-excalidraw';
import { HistoryEditor } from 'slate-history';
import { ReactEditor } from 'slate-react';

export default {
  title: 'Tmp',
} as Meta;

type TEditor = SPEditor & ReactEditor & HistoryEditor

const id = 'Examples/Tmp';

let components = createPlateComponents({
  [ELEMENT_MENTION]: withProps(MentionElement, {
    renderLabel: renderMentionLabel,
  }),
//  [ELEMENT_EXCALIDRAW]: ExcalidrawElement,
  [MARK_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_COLOR]: ['color'],
    },
  }),
  [MARK_BG_COLOR]: withStyledProps(StyledLeaf, {
    leafProps: {
      [MARK_BG_COLOR]: ['backgroundColor'],
    },
  }),
  // customize your components by plugin key
})
components = withStyledPlaceHolders(components)
components = withStyledDraggables(components)

const options = createPlateOptions({
  // customize your options by plugin key
})

export const Plugins = () => {
  const { setSearch, plugin: searchHighlightPlugin } = useFindReplacePlugin()
  const { getMentionSelectProps, plugin: mentionPlugin } = useMentionPlugin(
    optionsMentionPlugin
  )

  const pluginsMemo: PlatePlugin<TEditor>[] = useMemo(() => {
    const plugins = [
      createReactPlugin(),
      createHistoryPlugin(),
      createParagraphPlugin(),
      createBlockquotePlugin(),
      createTodoListPlugin(),
      createHeadingPlugin(),
      createImagePlugin(),
      createLinkPlugin(),
      createListPlugin(),
      createTablePlugin(),
      createMediaEmbedPlugin(),
      createCodeBlockPlugin(),
      createExcalidrawPlugin(),
      createAlignPlugin(),
      createBoldPlugin(),
      createCodePlugin(),
      createItalicPlugin(),
      createHighlightPlugin(),
      createUnderlinePlugin(),
      createStrikethroughPlugin(),
      createSubscriptPlugin(),
      createSuperscriptPlugin(),
      createFontColorPlugin(),
      createFontBackgroundColorPlugin(),
      createKbdPlugin(),
      createNodeIdPlugin(),
      createDndPlugin(),
      createAutoformatPlugin(optionsAutoformat),
      createResetNodePlugin(optionsResetBlockTypePlugin),
      createSoftBreakPlugin(optionsSoftBreakPlugin),
      createExitBreakPlugin(optionsExitBreakPlugin),
      createTrailingBlockPlugin({
        type: ELEMENT_PARAGRAPH,
      }),
      createSelectOnBackspacePlugin({
        allow: [ELEMENT_IMAGE, ELEMENT_EXCALIDRAW],
      }),
      mentionPlugin,
      searchHighlightPlugin,
    ]

    plugins.push(
      ...[
        createDeserializeMDPlugin({ plugins }),
        createDeserializeCSVPlugin({ plugins }),
        createDeserializeHTMLPlugin({ plugins }),
        createDeserializeAstPlugin({ plugins }),
      ]
    )

    return plugins
  }, [mentionPlugin, searchHighlightPlugin])

  return (
    <DndProvider backend={HTML5Backend}>
      <Plate
        id={id}
        plugins={pluginsMemo}
        components={components}
        options={options}
        editableProps={editableProps}
        initialValue={initialValuePlayground}
      >
        <ToolbarSearchHighlight icon={Search} setSearch={setSearch} />
        <HeadingToolbar>
          <ToolbarButtonsBasicElements />
          <ToolbarButtonsList />
          <ToolbarButtonsBasicMarks />
          <ToolbarButtonsAlign />
          <ToolbarLink icon={<Link />} />
          <ToolbarImage icon={<Image />} />
          <ToolbarButtonsTable />
        </HeadingToolbar>

        <BallonToolbarMarks />

        <MentionSelect
          {...getMentionSelectProps()}
          renderLabel={renderMentionLabel}
        />
      </Plate>
    </DndProvider>
  );
};
