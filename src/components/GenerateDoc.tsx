"use client";

import "@blocknote/core/fonts/inter.css";
import { BlockNoteView } from "@blocknote/mantine";
import "@blocknote/mantine/style.css";
import { useCreateBlockNote } from "@blocknote/react";

export default function GenerateDoc() {
  // Creates a new editor instance.
  const editor = useCreateBlockNote();

  // 导出 blocknote 结构化数据
  const handleExport = () => {
    if (!editor) return;
    const data = editor.document;
    console.log('BlockNote 数据:', data);
    // 如需下载为文件，可取消注释以下代码：
    // const blob = new Blob([JSON.stringify(data, null, 2)], { type: 'application/json' });
    // const url = URL.createObjectURL(blob);
    // const a = document.createElement('a');
    // a.href = url;
    // a.download = 'blocknote-data.json';
    // a.click();
    // URL.revokeObjectURL(url);
  };

  // 导出 markdown 数据
  const handleExportMarkdown = () => {

    console.log('Markdown 数据:', editor);
  };

  // Renders the editor instance using a React component.
  return (
    <div className="flex flex-col h-full w-full">
      <BlockNoteView className="flex-1 h-full w-full" editor={editor} />
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit self-center absolute bottom-16 right-16"
        onClick={handleExport}
      >
        导出结构化数据
      </button>
      <button
        className="mt-4 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700 w-fit self-center absolute bottom-40 right-16"
        onClick={handleExportMarkdown}
      >
        导出markdown数据
      </button>
    </div>
  );
}
