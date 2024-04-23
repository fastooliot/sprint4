const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

import { StoryList, storyList } from '../cmps/StoryList.jsx'

import { storyService } from '../services/story.service.js'
import { userService } from '../services/user.service.js'

export function StoryIndex() {
    const [stories, setStories] = useState(null)
    const [users, setUsers] = useState(null)


    useEffect(() => {
        loadUsers()
        loadStories()
    }, [])

    function loadStories() {
        storyService.query()
            .then((stories) => {
                setStories(stories)
            })
    }

    function loadUsers() {
        userService.query()
        .then((users) => {
            setUsers(users)
        })
    }

    if (!stories) return <div>loading...</div>
    return <section className="story-index">
        <StoryList
            stories={stories} />
    </section>
}
