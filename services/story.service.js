import { utilService } from "./util.service.js"
import { storageService } from "./storage.service.js"
import { userService } from "./user.service.js"

const STORY_KEY = 'storyDB'

_createStories()

export const storyService = {
    query,
    addLike,
    addComment
}

function query() {
    return storageService.query(STORY_KEY)
        .then(stories => {
            stories = stories.map(story => story)
            return stories
        })
}

function getEmptyStory(txt = '', imgUrl = '', loc = { lat: 34, lng: 31 }) {
    const storyUploadTime = Date.now()
    return { txt, imgUrl, loc, storyUploadTime }
}

async function _createStories() {
    let stories = utilService.loadFromStorage(STORY_KEY)
    if (!stories || !stories.length) {
        stories = []
        for (var i = 1; i < 5; i++) {
            const imageIdx = utilService.getRandomIntInclusive(1, 13)
            var story = await _createStory(utilService.makeLorem(), `./assets/img/stories/${imageIdx}.jpg`)
            story = generateComments(story)
            story = generateLikes(story)
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
    const userIdx = utilService.getRandomIntInclusive(1, 4)
    const user = await userService.get(userIdx)
    story.by._id = user.id
    story.by.imgUrl = user.profileImgUrl
    story.by.fullname = user.fullname
    story.comments = []
    story.likedBy = []
    story.tags = []
    story.comments = []
    await storageService.post(STORY_KEY, story)
    return story
}

function generateComments(story) {
    let users = utilService.loadFromStorage('userDB')
    users.forEach((user) => {
        if (utilService.getRandomIntInclusive(0, 100) > 50) {
            story.comments.push({
                id: utilService.makeId(),
                by: {
                    _id: user.id,
                    fullname: user.fullname,
                    imgUrl: user.profileImgUrl
                },
                txt: utilService.makeLorem(utilService.getRandomIntInclusive(1, 100)),
                likedBy: []
            })
        }
    })
    return story
}

function generateLikes(story) {
    let users = utilService.loadFromStorage('userDB')
    users.forEach((user) => {
        (utilService.getRandomIntInclusive(0, 100) < 50) && story.likedBy.push({
            _id: user.id,
            fullname: user.fullname,
            imgUrl: user.profileImgUrl
        })
    })
    return story
}

function addLike(story, isLiked) {
    if (!isLiked) {
        story.likedBy.push({
            own: 'own'
        })
    } else {
        story.likedBy = story.likedBy.filter(item => item.own != 'own')
    }
}

function addComment(story, comment) {
    let users = utilService.loadFromStorage('userDB')
    story.comments.push({
        id: utilService.makeId(),
        by: {
            _id: users[0].id,
            fullname: users[0].fullname,
            imgUrl: users[0].profileImgUrl
        },
        likedBy: [],
        txt: comment
    })
    storageService.updateStory(STORY_KEY, story)
}