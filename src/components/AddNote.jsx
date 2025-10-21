import React, { useState, useEffect } from 'react';
import { Editor } from '@tinymce/tinymce-react';
import { useForm } from 'react-hook-form';

/*
Making this component such that it can be used to edit an existing note and
also to create a new one
*/

const AddNote = ({
    initialValue = '',
    noteTitle = '',
    onSave,
    mode = 'create',
    readOnly = false,
    id = ''
}) => {

    const [content, setContent] = useState(initialValue);
    const [title, setTitle] = useState(noteTitle)

    useEffect(() => {
        setContent(initialValue);
    }, [initialValue]);

    useEffect(() => {
        setTitle(noteTitle)
    }, [noteTitle])

    const handleSubmit = () => {
        
        // const updateNote = async () => {
        //     const { response, result } = await services.updateNote({
        //         id: id,
        //         note: {
        //             title: title,
        //             content: content
        //         }
        //     })
        //     if (response.ok) {
        //         console.log(result)
        //     } else {
        //         console.log('AddNote.jsx :: updateNote :: failed', result)
        //     }
        // }
        // updateNote()

        console.log(id)
        console.log(`updated title: ${title}`)
        console.log(`updated content: ${content}`)
    }
    
    return (
        <form className="p-10 flex flex-col">
        <div className='w-full p-5'>
            <button type='submit' onSubmit={handleSubmit} className='float-end bg-blue-500 text-white px-3 py-2 rounded-lg cursor-pointer hover:bg-blue-600'>
                {mode === 'edit' ? 'Update Note' : 'Save Note'}
            </button>
        </div>
        <div className='flex flex-col gap-3'>
            <input
                type="text"
                value={title}
                className='px-3 py-2 rounded-lg bg-white text-black outline-none focus:bg-gray-50 border border-gray-200 w-full'
                placeholder='title...'
            />
            <Editor
                apiKey='ok3femhgsts0hm5y14ohjxs1ye1thr1wzqwc1v08ewt3y7d7'
                value={content}
                readonly={readOnly}
                placeholder='Write your note here...'
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
    </form>
)};

export default AddNote;
