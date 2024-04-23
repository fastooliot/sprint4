import {storyService} from '../services/story.service.js'

const { useState, useEffect} = React

export function StoryComments({ story }) {
    var [commentsCounter, setCommentsCounter] = useState(story.comments.length)
    const [textAreaValue, setTextAreaValue] = useState('')

    useEffect(()=> {
        console.log('new comment')
    }, [commentsCounter])

    const handleTextChange = (event) => {
        setTextAreaValue(event.target.value)
    }
    const handleKeyDown = (event) => {
        if (event.key === 'Enter') {
            storyService.addComment(story, textAreaValue)
            event.preventDefault()
            setTextAreaValue('')
            setCommentsCounter(story.comments.length)
        }
    } 

    return <React.Fragment>
     <div className="comments-counter">{`View all ${commentsCounter} comments`}</div>
     <textarea onKeyDown={handleKeyDown} value={textAreaValue} onChange={handleTextChange} placeholder="Add a comment..."></textarea>
    </React.Fragment>
}