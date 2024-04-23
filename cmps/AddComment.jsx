const { useState, useEffect } = React

export function AddComment ({ story }) {


    const [textAreaValue, setTextAreaValue] = useState('')

    const handleTextChange = (event) => {
        setTextAreaValue(event.target.value)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            setTextAreaValue(event.target.value)
        }
    }



    return <textarea onKeyDown={handleKeyDown} value={textAreaValue} onChange={handleTextChange} placeholder="Add a comment..."></textarea>
} 