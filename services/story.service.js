import { utilService } from "./util.service.js"
import { storageService } from "./storage.service.js"
import { userService } from "./user.service.js"

const STORY_KEY = 'storyDB'
_createStories()

export const storyService = {
    query
}

function query() {
    return storageService.query(STORY_KEY)
        .then(stories => {
            stories = stories.map(story => story)
            return stories
        })
}

function getEmptyStory(txt = '', imgUrl = '', loc = { lat: 34, lng: 31 }) {
    return { txt, imgUrl, loc }
}

async function _createStories() {
    let stories = utilService.loadFromStorage(STORY_KEY)
    if (!stories || !stories.length) {
        stories = []
        for (var i = 1; i < 5; i++) {
            const imageIdx = utilService.getRandomIntInclusive(1, 13)
            const story = await _createStory(utilService.makeLorem(), `../assets/img/stories/${imageIdx}.jpg`)
            stories.push(story)
        }
        utilService.saveToStorage(STORY_KEY, stories)
    }
}

async function _createStory(storyText, storyImgUrl, lat = 34, lng = 31) {
    const story = getEmptyStory()
    story.txt = storyText
    story.imgUrl = storyImgUrl
    story.loc.lat = lat
    story.loc.lng = lng
    story.id = utilService.makeId()
    story.by = {
        _id: '',
        fullname: '',
        imgUrl: ''
    }
    const userIdx = utilService.getRandomIntInclusive(1,4)
    const user = await userService.get(userIdx)
    story.by._id = user.id
    await storageService.post(STORY_KEY, story)
    
    return story
}