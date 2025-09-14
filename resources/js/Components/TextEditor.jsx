import React, { useEffect, useRef } from 'react';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';

const TextEditor = ({ value, onChange, placeholder = "Tulis konten di sini...", className = "" }) => {
    const quillRef = useRef(null);

    // Konfigurasi toolbar dengan tools yang dibutuhkan untuk CMS
    const modules = {
        toolbar: [
            [{ 'header': [1, 2, 3, 4, 5, 6, false] }],
            [{ 'font': [] }],
            [{ 'size': ['small', false, 'large', 'huge'] }],
            ['bold', 'italic', 'underline', 'strike'],
            [{ 'color': [] }, { 'background': [] }],
            [{ 'script': 'sub'}, { 'script': 'super' }],
            [{ 'list': 'ordered'}, { 'list': 'bullet' }, { 'indent': '-1'}, { 'indent': '+1' }],
            [{ 'direction': 'rtl' }],
            [{ 'align': [] }],
            ['link', 'image', 'video'],
            ['blockquote', 'code-block'],
            ['clean']
        ],
        clipboard: {
            matchVisual: false,
        }
    };

    const formats = [
        'header', 'font', 'size',
        'bold', 'italic', 'underline', 'strike',
        'color', 'background',
        'script',
        'list', 'bullet', 'indent',
        'direction', 'align',
        'link', 'image', 'video',
        'blockquote', 'code-block'
    ];

    // Custom handler untuk image upload (bisa dikembangkan lebih lanjut)
    const imageHandler = () => {
        const input = document.createElement('input');
        input.setAttribute('type', 'file');
        input.setAttribute('accept', 'image/*');
        input.click();

        input.onchange = () => {
            const file = input.files[0];
            if (file) {
                // Untuk sementara, kita convert ke base64
                const reader = new FileReader();
                reader.onload = () => {
                    const quill = quillRef.current.getEditor();
                    const range = quill.getSelection();
                    quill.insertEmbed(range.index, 'image', reader.result);
                };
                reader.readAsDataURL(file);
            }
        };
    };

    useEffect(() => {
        if (quillRef.current) {
            const quill = quillRef.current.getEditor();
            quill.getModule('toolbar').addHandler('image', imageHandler);
        }
    }, []);

    return (
        <div className={`bg-white dark:bg-form-input rounded border border-stroke dark:border-form-strokedark ${className}`}>
            <ReactQuill
                ref={quillRef}
                theme="snow"
                value={value}
                onChange={onChange}
                modules={modules}
                formats={formats}
                placeholder={placeholder}
                style={{
                    height: '300px',
                    marginBottom: '42px'
                }}
                className="dark:text-white"
            />
            <style jsx global>{`
                .ql-toolbar {
                    border-top: 1px solid #e2e8f0;
                    border-left: 1px solid #e2e8f0;
                    border-right: 1px solid #e2e8f0;
                    border-bottom: none;
                    border-radius: 6px 6px 0 0;
                }
                .ql-container {
                    border-bottom: 1px solid #e2e8f0;
                    border-left: 1px solid #e2e8f0;
                    border-right: 1px solid #e2e8f0;
                    border-top: none;
                    border-radius: 0 0 6px 6px;
                    font-family: inherit;
                }
                .ql-editor {
                    min-height: 300px;
                    font-size: 16px;
                    line-height: 1.6;
                }
                .ql-editor.ql-blank::before {
                    font-style: normal;
                    color: #9ca3af;
                }
                /* Dark mode styles */
                .dark .ql-toolbar {
                    border-color: #374151;
                    background-color: #1f2937;
                }
                .dark .ql-container {
                    border-color: #374151;
                    background-color: #1f2937;
                }
                .dark .ql-editor {
                    color: #f9fafb;
                }
                .dark .ql-toolbar .ql-stroke {
                    stroke: #f9fafb;
                }
                .dark .ql-toolbar .ql-fill {
                    fill: #f9fafb;
                }
                .dark .ql-toolbar button:hover .ql-stroke {
                    stroke: #3b82f6;
                }
                .dark .ql-toolbar button:hover .ql-fill {
                    fill: #3b82f6;
                }
                .dark .ql-toolbar button.ql-active .ql-stroke {
                    stroke: #3b82f6;
                }
                .dark .ql-toolbar button.ql-active .ql-fill {
                    fill: #3b82f6;
                }
            `}</style>
        </div>
    );
};

export default TextEditor;