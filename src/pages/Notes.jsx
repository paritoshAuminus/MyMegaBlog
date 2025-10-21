import React, { useEffect, useState } from 'react'
import services from '../auth/config'
import { NotesCard } from '../components'
import { useSelector } from 'react-redux'

function Notes() {

    const [noteList, setNoteList] = useState([])
    const status = useSelector((state) => state.auth.status)

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

    if (!status) navigate('/login')

    return (
        <>
            <div className='w-full flex justify-between px-15 py-2'>
                <span className='text-lg md:text-xl'>{noteList.length} notes stored</span>
                <button className='px-3 py-2 bg-blue-500 text-white rounded-lg cursor-pointer'>+ Add Note</button>
            </div>
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