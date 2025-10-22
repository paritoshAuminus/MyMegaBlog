import BASE_URL from "../api/api"

// ---------------------------------------------------
// ACCESSIBILITY SERVICES
// ---------------------------------------------------

class Services {

    // ----------------------------------
    // CREATE NEW NOTE
    // ----------------------------------
    async createNote({ title, content }) {
        try {
            const response = await fetch(`${BASE_URL}/notes`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': localStorage.getItem('megaNotesAccessToken')
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            })
            const result = await response.json()
            if (response.ok) {
                return { response, result }
            } else if (response.status === 401) {
                console.log('services error :: created note :: Invalid user', response.status)
            } else {
                console.log("createNote :: failed to create note", result);
            }
        } catch (error) {
            console.log('services error :: createNote ::', error)
        }
    }

    // --------------------------------------------------------------
    // FETCH ALL NOTES :: getNotes :: fetch a list of notes (objects)
    // --------------------------------------------------------------
    async getNotes() {
        try {
            const response = await fetch(`${BASE_URL}/notes`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': Number(localStorage.getItem('megaNotesAccessToken'))
                }
            })
            const result = await response.json()
            if (response.ok) {
                return { response, result }
            } else {
                console.log('getNotes :: failed to fetch notes', response.status)
            }
        } catch (error) {
            console.log('services error :: getNotes ::', error)
        }
    }

    //-----------------------------------------------------
    // FETCH ONE NOTE :: getNote :: fetch one note (object)
    //-----------------------------------------------------
    async getNote({ id }) {
        try {
            const response = await fetch(`${BASE_URL}/notes/${id}`, {
                method: 'GET',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': Number(localStorage.getItem('megaNotesAccessToken'))
                }
            })
            const result = await response.json()
            if (response.ok) {
                return { response, result }
            } else {
                console.log('getNote :: failed to fetch note ::', response.message)
            }
        } catch (error) {
            console.log('services error :: getNote ::', error)
        }
    }

    //--------------
    // UPDATE NOTE
    //--------------
    async updateNote(id, { title, content }) {      // note: { title, content }
        try {
            const response = await fetch(`${BASE_URL}/notes/${id}`, {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': Number(localStorage.getItem('megaNotesAccessToken'))
                },
                body: JSON.stringify({
                    title: title,
                    content: content
                })
            })

            const result = await response.json()

            if (response.ok) {
                return { response, result }
            } else {
                console.log('updateNote :: failed to update note', response.message)
            }
        } catch (error) {
            console.log('services error :: updateNote ::', error)
        }
    }

    async deleteNote({ id }) {
        try {
            const response = await fetch(`${BASE_URL}/notes/${id}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': Number(localStorage.getItem('megaNotesAccessToken'))
                }
            })
            if (response.status === 204) { // successful
                return true
            } else if (response.status === 404) {
                console.log('deleteNote :: Note not found', response.status)
            }
        } catch (error) {
            console.log('services error :: deleteNote :: ', error)
        }
    }
}

const services = new Services()

export default services;