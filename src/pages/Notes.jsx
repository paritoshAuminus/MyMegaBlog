import React, { useEffect, useState } from 'react'
import services from '../auth/config'
import { AddNote, NotesCard } from '../components'
import { useSelector } from 'react-redux'
import { useNavigate } from 'react-router-dom'

function Notes() {

    const [noteList, setNoteList] = useState([])
    const status = useSelector((state) => state.auth.status)
    const navigate = useNavigate()

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const fetchNotes = async () => {
            const { response, result } = await services.getNotes()
            if (response.ok) {
                setNoteList(result)     // [{...}, {...}, {...}]
            } else {
                console.log('failed to fetch notes ::', response.status)
            }
        }
        fetchNotes()
    }, [])

    return (
        <>
            <div className='w-full flex justify-between px-15 py-2'>
                <span className='text-lg md:text-xl'>{noteList.length} notes stored</span>
                <button onClick={() => setEdit(!edit)} className='px-3 py-2 bg-blue-500 hover:bg-blue-600 text-white rounded-lg cursor-pointer'>{edit? 'Cancel' : '+ Add Note'}</button>
            </div>
            {edit && <AddNote />}
            {noteList.length < 1 ?
                <div>
                    <ul className='grid grid-cols-3'>
                        {noteList.map((item) => (
                            <li>
                                <NotesCard
                                    key={item.id}
                                    title={item.title}
                                    content={item.content}
                                />
                            </li>
                        ))}
                    </ul>
                </div>
                :
                <div className='w-full text-center text-wrap py-24 text-xl'>
                    <p>No notes created yet...</p>
                </div>
            }
        </>
    )
}

export default Notes