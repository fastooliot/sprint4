import StoryPreview from './StoryPreview.jsx'

export function StoryList({stories}) {
    if (!stories.length) return <div>No stories to show</div>
    return <ul className="story-list no-bullets">
        {
            stories.map(story => <li key={story.id}>a</li>)
        }
    </ul>
}