import React, { useEffect, useState } from 'react'
import services from '../auth/config'
import { AddNote, NotesCard } from '../components'
import { Link } from 'react-router-dom'

function Notes() {

    const [noteList, setNoteList] = useState([])
    const [create, setCreate] = useState(false)

    const handleCreate = async ({ title, content }) => {
        const { response, result } = await services.createNote({ title, content })
        if (!response.ok) {
            setCreate(false)
        } else {
            setCreate(false)
            console.log('Notes :: handleCreate :: failed to create note')
        }
    }

    useEffect(() => {
        const fetchNotes = async () => {
            const { response, result } = await services.getNotes()
            if (response.ok) {
                setNoteList(result)
            } else {
                console.log('failed to fetch notes ::', response.status)
            }
        }
        fetchNotes()
    }, [handleCreate])



    return (
        <>
            <div className='w-full flex justify-between px-15 py-2'>
                <span className='text-lg md:text-xl'>{noteList.length} notes stored</span>
                <button
                    onClick={() => setCreate(!create)}
                    className='px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer'
                >
                    {create ? 'Cancel' : '+ Add Note'}
                </button>
            </div>

            {/* create new note */}
            {create && <AddNote onSave={handleCreate} />}

            {/* List all notes */}
            {noteList.length > 0 ? (
                <div className='px-10'>
                    <ul className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4'>
                        {noteList.map((item) => (
                            <li key={item.id}>
                                <Link to={`/noteDetails/${item.id}`}>
                                    <NotesCard title={item.title} content={item.content} />
                                </Link>
                            </li>
                        ))}
                    </ul>
                </div>
            ) : (
                <div className='w-full text-center text-wrap py-24 text-xl'>
                    <p>No notes created yet...</p>
                </div>
            )}

        </>
    )
}

export default Notes