import React, { useEffect, useState } from "react";
import { Link, useParams } from "react-router-dom";
import services from "../auth/config";
import AddNote from './AddNote';

const NoteDetails = () => {

    const { id } = useParams()
    const [note, setNote] = useState({})

    const [edit, setEdit] = useState(false)

    useEffect(() => {
        const fetchNote = async () => {
            const { response, result } = await services.getNote({ id: id })
            if (response.ok) {
                setNote(result)
            }
        }
        fetchNote()
    }, [])



    return (
        <div className="min-h-screen bg-gray-100 flex flex-col items-center py-10">
            <div className="w-full py-2 px-3 flex justify-between">
                <Link 
                to={'/notes'}
                className="text-lg px-3 py-0.5 rounded-lg text-white bg-blue-500 hover:bg-blue-600 cursor-pointer"
                >
                    Back
                </Link>
                <button
                    onClick={() => (setEdit(!edit))}
                    className="text-lg px-3 py-0.5 rounded-lg text-white bg-blue-500 hover:bg-blue-600 cursor-pointer">
                    Edit
                </button>
            </div>
            {edit ?
                <AddNote
                    initialValue={note.content}
                    noteTitle={note.title}
                    mode={"edit"}
                    id={id}
                />
            :
            <main className="w-full bg-white shadow-lg rounded-lg p-8 border border-gray-200">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">
                    {note.title}
                </h2>
                <p className="whitespace-pre-line text-gray-700 leading-relaxed">
                    {note.content}
                </p>
            </main>
            }
        </div>
    );
};

export default NoteDetails;
