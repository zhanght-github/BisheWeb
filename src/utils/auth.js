import Cookies from 'js-cookie'

const RolesKey = 'roles'
const NameKey = 'name'
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

export function getName() {
  return Cookies.get(NameKey) || ''
}

export function setName(name) {
  if (name) {
    return Cookies.set(NameKey, name)
  } else {
    return false
  }
}

export function removeName() {
  return Cookies.remove(NameKey)
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
