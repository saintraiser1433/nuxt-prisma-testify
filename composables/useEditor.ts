import TableCell from '@tiptap/extension-table-cell';
import TableHeader from '@tiptap/extension-table-header';
import Image from '@tiptap/extension-image';
import { useEditor } from '@tiptap/vue-3';
import { Placeholder as TiptapPlaceholder } from '@tiptap/extension-placeholder';
import { Table } from '@tiptap/extension-table'
import { TableRow } from '@tiptap/extension-table-row'
export const CustomTableCell = TableCell.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            borderStyle: {
                default: '2px solid #ced4da',
                parseHTML: (element) => element.style.borderStyle || '2px solid #ced4da',
                renderHTML: (attributes) => ({
                    style: `border: ${attributes.borderStyle}`,
                }),
            },
            backgroundColor: {
                default: null,
                parseHTML: (element) => element.getAttribute('data-background-color'),
                renderHTML: (attributes) => ({
                    'data-background-color': attributes.backgroundColor,
                    style: `background-color: bg-gray-900`,
                }),
            },
            style: {
                default: 'height: 28px; padding: 3px 5px',
            },
        };
    },
});

export const CustomTableHeader = TableHeader.extend({
    addAttributes() {
        return {
            ...this.parent?.(),
            borderStyle: {
                default: '2px solid #ced4da',
                parseHTML: (element) => element.style.borderStyle || '2px solid #ced4da',
                renderHTML: (attributes) => ({
                    style: `border: ${attributes.borderStyle}`,
                }),
            },
            style: {
                default: 'height: 28px; padding: 3px 5px; background-color: gray; color: white',
            },
        };
    },
});

export const useEditorSetup = (uploadImage: any) => {
    const lowlight = createLowlight(allLanguages);
    return useEditor({
        extensions: [
            TiptapStarterKit.configure({
                codeBlock: false,
            }),
            CustomTableCell,
            CustomTableHeader,
            Table.configure({
                resizable: true,

            }),
            TableRow,
            TiptapCodeBlockLowlight.configure({ lowlight }),
            TiptapPlaceholder.configure({
                emptyEditorClass: 'is-editor-empty',
                placeholder: 'Write your post content here',
            }),
            Image.configure({
                inline: true, // Makes the image block-level by default
            }),
        ],
        editorProps: {
            attributes: {
                class: 'prose prose-sm focus:outline-none py-5 ',
            },
            transformPastedText(text) {
                return text.toUpperCase()
            },
            handleDrop: (view, event) => {
                const files = event.dataTransfer?.files;
                if (!files || !files.length) return false;

                const file = files[0];
                if (!file.type.startsWith('image/')) return false;

                uploadImage(file).then((url: any) => {
                    const { schema } = view.state;
                    const node = schema.nodes.image.create({ src: url });
                    const transaction = view.state.tr.replaceSelectionWith(node);
                    view.dispatch(transaction);
                });

                return true;
            },
        },
    });
};
