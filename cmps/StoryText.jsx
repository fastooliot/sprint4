const { useState, useEffect } = React
import ReadMoreReadLess from '../node_modules/ReadMoreReadLess'


export function StoryText({ story }) {
    const longStory = ((story.id.length) + (story.txt.length) > 50) ? true : false
    const [detailedView, setIsDetailedView] = useState(!longStory)

    if (!detailedView) { return <div className="story-text"><span className="story-fullname">{story.by.fullname}</span>{story.txt.substring(0, 20)}...<span className="more-button" onClick={() => setIsDetailedView(true)}>     more</span></div> }
    else { return <div className="story-text"><span className="story-fullname">{story.by.fullname}</span>{story.txt}</div> }
}