import Bold from "@tiptap/extension-bold";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import Document from "@tiptap/extension-document";
import Heading from "@tiptap/extension-heading";
import Italic from "@tiptap/extension-italic";
import { BulletList, ListItem, OrderedList } from "@tiptap/extension-list";
import Paragraph from "@tiptap/extension-paragraph";
import Strike from "@tiptap/extension-strike";
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
          "max-w-full",
          "flex-1 p-4 rounded-xl rounded-t-none focus:outline-none",
          "border border-black-600 focus:border-black-400",
          "resize overflow-auto",
        ]),
      },
    },
    extensions: [
      Bold,
      Italic,
      Strike,
      Heading.extend({
        renderHTML: ({ node, HTMLAttributes }) => {
          const level = node.attrs.level;
          const classes: Record<number, string> = {
            1: "text-3xl font-bold",
            2: "text-2xl font-semibold",
            3: "text-xl font-medium",
          };

          return [
            `h${level}`,
            {
              ...HTMLAttributes,
              class: classes[level],
            },
            0,
          ];
        },
      }),
      Document,
      Paragraph,
      Text,
      ListItem,
      BulletList.configure({
        HTMLAttributes: {
          class: "list-disc text-base ml-4",
        },
      }),
      OrderedList.configure({
        HTMLAttributes: {
          class: "list-decimal text-base ml-4",
        },
      }),
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
