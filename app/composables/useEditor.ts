import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import Paragraph from "@tiptap/extension-paragraph";
import Text from "@tiptap/extension-text";
import {
  useEditor as _useEditor,
  type Editor,
  VueNodeViewRenderer,
} from "@tiptap/vue-3";
import { cn } from "clsx-for-tailwind";
import { all, createLowlight } from "lowlight";
import CodeBlock from "~/components/Editor/CodeBlock.vue";

const lowlight = createLowlight(all);

type UseEditorReturn = {
  editor: Ref<Editor | undefined>;
};

export function useEditor(): UseEditorReturn {
  const editor: Ref<Editor | undefined> = _useEditor({
    editorProps: {
      attributes: {
        spellcheck: "false",
        class: cn([
          "flex-1 p-4 rounded-xl rounded-t-none focus:outline-none",
          "border border-neutral-700 focus:border-neutral-500",
          "resize overflow-hidden",
        ]),
      },
    },
    extensions: [
      Bold,
      Document,
      Paragraph,
      Text,
      BulletList,
      ListItem,
      OrderedList,
      CodeBlockLowlight.extend({
        addKeyboardShortcuts() {
          return {
            Tab: () => {
              if (editor.value?.isActive("codeBlock")) {
                return editor.value?.commands.insertContent("\t");
              }
            },
          };
        },
        addNodeView() {
          return VueNodeViewRenderer(CodeBlock);
        },
      }).configure({
        lowlight,
        HTMLAttributes: { class: "hljs" },
        languageClassPrefix: "",
      }),
    ],
  });

  return {
    editor,
  };
}
