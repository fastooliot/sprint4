export function StoryComments({ story }) {
    const numberOfComments = story.comments.length
    if (numberOfComments > 0) {
        return <div className="comments-counter">{`View all ${numberOfComments} comments`}</div>
    }
}