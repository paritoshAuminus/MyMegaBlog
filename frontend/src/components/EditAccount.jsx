import React from 'react'

function EditAccount() {

    const handleSubmit = () => {
        console.log('This is under development')
    }

  return (
    <form onSubmit={handleSubmit}>
        <input type="text" />
    </form>
  )
}

export default EditAccount