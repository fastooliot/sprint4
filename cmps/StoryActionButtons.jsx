import { storyService } from '../services/story.service.js'
import { LikesPreview } from '../cmps/LikesPreview.jsx'

const { useState, useEffect } = React


export function StoryActionButtons({ story }) {
    const [isLiked, setIsLiked] = useState(false)

    useEffect(() => {
        loadStories()
    }, [isLiked])

    function loadStories() {
        storyService.query().then((stories) => {
        })
    }

    function _like_render(isLiked) {
        const likeImg = isLiked ? ".\\assets\\img\\icons\\heart_red.svg" : ".\\assets\\img\\icons\\heart.svg"
        LikesPreview({ story })
        return likeImg
    }
    
    return <React.Fragment>
        <img onClick={() => {
            setIsLiked(isLiked => !isLiked)
            storyService.addLike(story, isLiked)
        }} src = {_like_render(isLiked)} alt="" title='Like' />
        <img src=".\assets\img\icons\comment.svg" alt="" title='Comment' />
        <img src=".\assets\img\icons\sent.svg" alt="" title='Share post' />
        <div className="likes-counter">{`${story.likedBy.length} likes`}</div>
    </React.Fragment>
}








