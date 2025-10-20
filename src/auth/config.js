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
                body: JSON.stringify({
                    title: title,
                    content: content
                }),
                headers: {
                    'Content-Type': 'application/json',
                    'x-user-id': localStorage.getItem('megaNotesAccessToken'),
                    'Cache-Control': 'no-cache',
                    'Pragma': 'no-cache'
                }
            })
            const result = await response.json()
            if (response.ok) {
                console.log("✅ Note created:", result);
                console.log("Status:", response.status);
            } else {
                console.warn("❌ createNote :: failed to create note", result);
            }
        } catch (error) {
            console.log('services error :: createNote ::', error)
        }
    }

}

const services = new Services()

const response = services.createNote({
    title: 'New Title',
    content: 'this is the content'
})

export default services;