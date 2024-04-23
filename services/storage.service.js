import { reject } from "lodash"
import { resolve } from "path"

export const storageService = {
    query,
    get,
    post,
    updateStory
}

function query(entityType, delay = 500) {
    var entities = JSON.parse(localStorage.getItem(entityType)) || []
    return new Promise(resolve => setTimeout(() => resolve(entities), delay))
}

function get(entityType, entityId) {
    return query(entityType).then(entities => {
        const entity = entities.find(entity => entity.id === entityId)
        if (!entity) throw new Error(`Get failed, cannot find entity with id: ${entityId} in: ${entityType}`)
        return entity
    })
}

function post(entityType, newEntity) {
    newEntity = {...newEntity}
    return query(entityType).then(entities => {
        entities.push(newEntity)
        _save(entityType, entities)
        return newEntity
    })
}

function _save(entityType, entities) {
    localStorage.setItem(entityType, JSON.stringify(entities))
}

function updateStory(entityType, story) {
    return query(entityType).then(entities=> {
        const idx = entities.findIndex(entity=> entity.id === story.id)
        if (idx < 0) throw new Error (`Update failed, cannot find entity with id: ${story.id} in: ${entityType}`)
        entities.splice(idx, 1, story)
        _save(entityType, entities)
        return(story)
    })
}