import { LikesPreview } from './LikesPreview.jsx'
import { StoryText } from './StoryText.jsx'
import { StoryComments } from './StoryComments.jsx'
import { AddComment } from './AddComment.jsx'
import { StoryActionButtons } from './StoryActionButtons.jsx'

export function StoryList({ stories }) {
    if (!stories.length) return <div>No stories to show</div>
    return <ul className="story-list no-bullets">
        {
            stories.map(story => <li key={story.id}><section className='story'>
                <section className='story-meta-data'>
                    <section className='story-header'>
                        <section className='story-header-data'>
                            <img className='story-profile-img' src={`./assets/img/users/${story.by.imgUrl}.jpg`} alt="ddd" />
                            <span className='story-name'>{story.by.fullname}</span>
                            <img className='dot-img' src=".\assets\img\icons\dot.svg" alt="" />
                            <span>{_calTimeDiff(story.storyUploadTime)}</span>
                        </section>
                        <section>
                            <img className='dots-img' src=".\assets\img\icons\dots.svg" alt="" />
                        </section>
                    </section>
                </section>
                <section className='story-image'>
                    <img src={story.imgUrl} alt="sss" />
                </section>
                <section className='story-comments-command'>
                    <section className='actions-buttons'>
                        <StoryActionButtons story = {story} />

                        {/* <img src=".\assets\img\icons\heart.svg" alt="" title='Like' />
                        <img src=".\assets\img\icons\comment.svg" alt="" title='Comment' />
                        <img src=".\assets\img\icons\sent.svg" alt="" title='Share post' /> */}
                    </section>
                    <section className='bookmark-button'>
                        <img src=".\assets\img\icons\bookmark.svg" alt="" title='Save' />
                    </section>
                </section>
                <section className='story-text-row'>
                    <StoryText story = {story} />
                </section>
                <section className='story-comments'>
                    <StoryComments story = {story} />
                </section>
                <section className='add-comment'>
                    <AddComment story = {story} />
                </section>
            </section>
            </li>)
        }
    </ul>
}

function _calTimeDiff(uploadTime) {
    const date = new Date(uploadTime)
    let day = date.getDate()
    let month = date.getMonth()
    let year = date.getFullYear()
    day = day < 10 ? '0' + day : day
    month = month < 10 ? '0' + month : month
    const timeDiff = (Date.now() - uploadTime) / 1000
    if (timeDiff < 60) return 'Few seconds ago'
    else if (timeDiff < 60 * 60) return 'Few minutes ago'
    else return (`${day}/${month}/${year}`)
}