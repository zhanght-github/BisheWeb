import Cookies from 'js-cookie'

const RolesKey = 'roles'
const IdKey = 'id'
const SourceKey = 'source'

export function getRoles() {
  const roles = Cookies.get(RolesKey)
  if (roles) {
    try {
      return JSON.parse(Cookies.get(RolesKey))
    } catch (error) {
      console.log(error)
      return false
    }
  } else {
    return false
  }
}

export function setRoles(roles) {
  if (roles) {
    return Cookies.set(RolesKey, JSON.stringify(roles))
  } else {
    return false
  }
}

export function removeRoles() {
  return Cookies.remove(RolesKey)
}

export function getId() {
  return Cookies.get(IdKey) || ''
}

export function setId(id) {
  if (id) {
    return Cookies.set(IdKey, id)
  } else {
    return false
  }
}

export function removeId() {
  return Cookies.remove(IdKey)
}

export function getSource() {
  return Cookies.get(SourceKey) || ''
}

export function setSource(source) {
  if (source !== '') {
    return Cookies.set(SourceKey, source)
  } else {
    return false
  }
}

export function removeSource() {
  return Cookies.remove(SourceKey)
}
