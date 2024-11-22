<script setup>

const { $api } = useNuxtApp();
const { setToast } = useToasts()
const repo = repository($api)
const emits = defineEmits(['update:modelValue'])
const uploadImage = async (file) => {
    const formData = new FormData();
    formData.append('file', file);
    try {
        const { url } = await repo.uploadImage(formData);
        return url;
    } catch (err) {
        setToast('error', 'Something went wrong upload failed')
    }

};

const addImage = () => {
    const fileInput = document.createElement('input');
    fileInput.type = 'file';
    fileInput.accept = 'image/*';

    fileInput.onchange = async (event) => {
        const file = event.target.files?.[0];

        if (file) {
            await uploadImage(file);
            const reader = new FileReader();
            reader.onload = (e) => {
                const url = e.target.result;
                editor.value.chain().focus().setImage({ src: url }).run();
            }

            reader.readAsDataURL(file);
        }
    };

    fileInput.click();
}

const lowlight = createLowlight(allLanguages);
const editor = useEditor({
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
        ImageResize
    ],
    onUpdate: ({ editor }) => {
        let content = editor.getHTML()
        emits('update:modelValue', content)
    },
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

            uploadImage(file).then((url) => {
                const { schema } = view.state;
                const node = schema.nodes.image.create({ src: url });
                const transaction = view.state.tr.replaceSelectionWith(node);
                view.dispatch(transaction);
            });

            return true;
        },
    },
});


onBeforeUnmount(() => {
    unref(editor).destroy();
});
</script>

<template>
    <div class="container mx-auto max-w-4xl my-2">
        <div v-if="editor"
            class="flex items-center flex-wrap gap-2 border overflow-hidden font-thin bg-gray-100  text-gray-600 p-3 text-md dark:bg-gray-900 dark:text-white dark:border dark:border-gray-400  rounded-t-md">
            <button @click="editor.chain().focus().toggleBold().run()"
                :disabled="!editor.can().chain().focus().toggleBold().run()"
                :class="{ 'text-primary': editor.isActive('bold') }" class="">
                <i-tabler-bold />
            </button>
            <button @click="editor.chain().focus().toggleItalic().run()"
                :disabled="!editor.can().chain().focus().toggleItalic().run()"
                :class="{ 'text-primary': editor.isActive('italic') }" class="">
                <i-tabler-italic />
            </button>
            <button @click="editor.chain().focus().toggleStrike().run()"
                :disabled="!editor.can().chain().focus().toggleStrike().run()"
                :class="{ 'text-primary': editor.isActive('strike') }">
                <i-tabler-strikethrough />
            </button>
            <button @click="editor.chain().focus().toggleCode().run()"
                :disabled="!editor.can().chain().focus().toggleCode().run()"
                :class="{ 'text-primary': editor.isActive('code') }">

                <i-tabler-code />
            </button>
            <button @click="editor.chain().focus().unsetAllMarks().run()">
                <i-tabler-clear-formatting />
            </button>
            <button @click="editor.chain().focus().setParagraph().run()"
                :class="{ 'text-primary': editor.isActive('paragraph') }">
                <i-bx-paragraph />
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 1 }).run()"
                :class="{ 'text-primary': editor.isActive('heading', { level: 1 }) }">
                <i-ci-heading-h1 />
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 2 }).run()"
                :class="{ 'text-primary': editor.isActive('heading', { level: 2 }) }">
                <i-ci-heading-h2 />
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 3 }).run()"
                :class="{ 'text-primary': editor.isActive('heading', { level: 3 }) }">
                <i-ci-heading-h3 />
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 4 }).run()"
                :class="{ 'text-primary': editor.isActive('heading', { level: 4 }) }">
                <i-ci-heading-h4 />
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 5 }).run()"
                :class="{ 'text-primary': editor.isActive('heading', { level: 5 }) }">
                <i-ci-heading-h5 />
            </button>
            <button @click="editor.chain().focus().toggleHeading({ level: 6 }).run()"
                :class="{ 'text-primary': editor.isActive('heading', { level: 6 }) }">
                <i-ci-heading-h6 />
            </button>

            <button @click="editor.chain().focus().toggleBulletList().run()"
                :class="{ 'text-primary': editor.isActive('bulletList') }">
                <i-fluent-mdl2-radio-bullet />
            </button>
            <button @click="editor.chain().focus().toggleOrderedList().run()"
                :class="{ 'text-primary': editor.isActive('orderedList') }">
                <i-fe-list-bullet />
            </button>
            <button @click="editor.chain().focus().toggleCodeBlock().run()"
                :class="{ 'text-primary': editor.isActive('codeBlock') }">
                <i-fluent-code-block-48-regular />
            </button>
            <button @click="editor.chain().focus().toggleBlockquote().run()"
                :class="{ 'text-primary': editor.isActive('blockquote') }">
                <i-tabler-blockquote />
            </button>
            <button @click="editor.chain().focus().setHorizontalRule().run()">
                <i-codicon-horizontal-rule />
            </button>
            <button @click="editor.chain().focus().setHardBreak().run()">
                <i-tabler-page-break />
            </button>

            <button @click="editor.chain().focus().insertTable({ rows: 3, cols: 3, withHeaderRow: true }).run()">
                <i-tabler-table-plus />
            </button>
            <button @click="editor.chain().focus().addColumnBefore().run()">
                <i-tabler-column-insert-left />
            </button>
            <button @click="editor.chain().focus().addColumnAfter().run()">
                <i-tabler-column-insert-right />
            </button>
            <button @click="editor.chain().focus().deleteColumn().run()">
                <i-tabler-column-remove />
            </button>
            <button @click="editor.chain().focus().addRowBefore().run()">
                <i-tabler-row-insert-top />
            </button>
            <button @click="editor.chain().focus().addRowAfter().run()">
                <i-tabler-row-insert-bottom />
            </button>
            <button @click="editor.chain().focus().deleteRow().run()">
                <i-tabler-row-remove />
            </button>
            <button @click="editor.chain().focus().deleteTable().run()">
                <i-tabler-table-down />
            </button>
            <button @click="addImage">
                <i-mdi-light-image />
            </button>
            <button @click="editor.chain().focus().mergeCells().run()">
                <i-material-symbols-cell-merge-rounded />
            </button>
            <button @click="editor.chain().focus().undo().run()" :disabled="!editor.can().chain().focus().undo().run()">
                <i-fad-undo />
            </button>
            <button @click="editor.chain().focus().redo().run()" :disabled="!editor.can().chain().focus().redo().run()">
                <i-fad-redo />
            </button>
        </div>
        <TiptapEditorContent class="w-full border px-2" :editor="editor" />
    </div>
</template>
