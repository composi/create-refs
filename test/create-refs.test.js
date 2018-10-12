import { CreateRefs } from "../src"

test('Should be able to create new instance of CreateRefs.', () => {
  const refs = new CreateRefs()
  expect(typeof refs).toBe('object')
})

test('Should be able to cache element in refs.', () => {
  const refs = new CreateRefs()
  document.body.innerHTML = `
    <nav>
      <h1>Title</h1>
    </nav>`
  const title = document.querySelector('h1')
  // Cache element:
  refs.set('h1', title)
  expect(refs.has('h1')).toBe(true)
})


test('Should be able to get cached element from refs.', () => {
  const refs = new CreateRefs()
  document.body.innerHTML = `
    <p>
      <input type="text"/>
    </p>`
  const input = document.querySelector('input')
  // Cache element:
  refs.set('input', input)
  // Does cache has key?
  expect(refs.has('input')).toBe(true)
  // Does key point to cached element?
  expect(refs.get('input').nodeName).toBe('INPUT')
})

test('Should be able to get value of cached input tag.', () => {
  const refs = new CreateRefs()
  document.body.innerHTML = `
    <p>
      <input type="text"/>
    </p>`
  const input = document.querySelector('input')
  input.value = 'whatever'
  refs.set('input', input)
  expect(refs.has('input')).toBe(true)
  // Get value of cached input element:
  expect(refs.get('input').value).toBe('whatever')
})

test('Should be able to delete reference to element.', () => {
  const refs = new CreateRefs()
  document.body.innerHTML = `
    <p>
      <input type="text"/>
    </p>`
  const input = document.querySelector('input')
  input.value = 'whatever'
  refs.set('input', input)
  expect(refs.has('input')).toBe(true)
  // Delete cached input
  refs.delete('input')
  expect(refs.has('input')).toBe(false)
})


test('After deleting reference to element, trying to get it should return undefined.', () => {
  const refs = new CreateRefs()
  document.body.innerHTML = `
    <p>
      <input type="text"/>
    </p>`
  const input = document.querySelector('input')
  input.value = 'whatever'
  refs.set('input', input)
  expect(refs.has('input')).toBe(true)
  // Delete cached input
  refs.delete('input')
  // Result of get('input') should be undefined:
  expect(refs.get('input')).toBeUndefined()
})
