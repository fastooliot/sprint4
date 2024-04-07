import { utilService } from "./util.service.js"
import { storageService } from "./storage.service.js"

const USER_KEY = 'userDB'
_createUsers()

export const userService = {
    query,
    get
}

function get(userId) {
    return storageService.get(USER_KEY, userId)
    .then(user => user)
}

function query() {
    return storageService.query(USER_KEY)
    .then(users => {
        users = users.map(user => user)
        return users
    })
}

function getEmptyUser(username = '', password = '', fullname = '', profileImgUrl = '..\\assets\\img\\users\\default.jpg') {
    return {username, password, fullname, profileImgUrl}
}

function _createUsers() {
    let users = utilService.loadFromStorage(USER_KEY)
    if (!users || !users.length) {
        users = []
        for (var i = 1; i < 5; i++) {
            users.push(_createUser(utilService.makeLorem(2), 'ggggggggggg', utilService.makeLorem(2), i, i))
        }
        utilService.saveToStorage(USER_KEY, users)
    }
}

function _createUser(username, password, fullname, profileImgUrl, id) {
    const user = getEmptyUser()
    user.username = username
    user.password = password
    user.fullname = fullname
    user.profileImgUrl = profileImgUrl
    user.id = id

    return user
}