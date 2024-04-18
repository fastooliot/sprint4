export function LikesPreview({ story }) {
    return <div className="likes-counter">{`${story.likedBy.length} likes`}</div>
}