import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import Input from './Input';

/*
Making this component such that it can be used to edit an existing note and
also to create a new one
*/

const AddNote = ({ initialValue = '', title = '', onSave, mode = 'create' }) => {
    const [content, setContent] = useState(initialValue);

    useEffect(() => {
        setContent(initialValue);
    }, [initialValue]);

    const handleSave = () => {
        if (onSave) {
            onSave(content);
        }
    };

    return (
        <div className="p-10 flex flex-col">
            <div className='w-full p-5'>
                <button className='float-end bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600' onClick={handleSave}>
                    {mode === 'edit' ? 'Update Note' : 'Save Note'}
                </button>
            </div>
            <div className='flex flex-col gap-3'>
                <Input
                    placeholder={'Title...'}
                    value={title}
                />
                <Editor
                    apiKey='ok3femhgsts0hm5y14ohjxs1ye1thr1wzqwc1v08ewt3y7d7'
                    value={content}
                    init={{
                        height: 400,
                        menubar: false,
                        plugins: [
                            'advlist autolink lists link image charmap preview anchor',
                            'searchreplace visualblocks code fullscreen',
                            'insertdatetime media table paste code help wordcount'
                        ],
                        toolbar:
                            'undo redo | formatselect | bold italic backcolor | \
            alignleft aligncenter alignright alignjustify | \
            bullist numlist outdent indent | removeformat | help'
                    }}
                    onEditorChange={(newValue) => setContent(newValue)}
                />
            </div>
        </div>
    );
};

export default AddNote;
