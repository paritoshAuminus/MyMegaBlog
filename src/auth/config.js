import BASE_URL from "../api/api"

// ---------------------------------------------------
// ACCESSIBILITY SERVICES
// ---------------------------------------------------

class Services {

    // create note
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

    // getNotes
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

}

const services = new Services()

export default services;