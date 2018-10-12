# @composi/create-refs

CreateRefs creates a cache for DOM elements. Because it uses a WeakMap internally for caching, the references to DOM elements are available for garbage collection when they are removed from the DOM. The cache is read-only, so you can not use a reference to try and change the node, such as changing an element'e class, etc.

CreateRefs is not for caching JavaScript data objects. For that check out `@composi/datastore`.

## Install

`CreateRefs` is already installed in any project created with `@composi/create-composi-app`. All you need to do is import it into your project:

```
import { CreateRefs } from '@composi/create-refs'
```

## New Instance

Make an instance of CreateRefs:

```javascript
const refs = new CreateRefs()
```
## Add a Node to Cache

To cache a node you need a refence to a node and a key. Keys are just a descriptive string. Each reference should have a unique key.

```javascript
refs.set('input', document.querySelector('input'))
```

## Get a Node from Cache

You can retreive a node from the cache by using the key you provided when you first cached it.

```javascript
// Set focus on a cache input element:
refs.get('input').focus()

// Get the input's value:
const value = refs.get('input').value
```

## Test if Node is Cached

You can test if a cache contais a node by passing its key to the `has` method:

```javascript
if (refs.has('input')) {
  console.log(`Input value is: ${refs.get('input').value}.`)
}
```

## Remove Node from Cache

You can remove a cached node. You use CreateRef's `delete` method and the key for the reference to delete:

```javascript
if (refs.has('input') {
  refs.delete('input')
})
```
Deleting a cached element reference does not affect the element in the DOM. 

## Usage

To use CreateRefs with @composi/core you create an empty cache and then add a reference to a DOM element from witin an `onmount` handler:

```javascript
import { h, render } from '@composi/core'
import { CreateRefs } from '@composi/create-refs'

// Create a cache for DOM references:
const refs = new CreateRefs()

// Define a component:
function List({data}) {
  // Because this function is the handler for onmount,
  // which is registered on the input below,
  // it gets based a reference to the input when it is created.
  function buttonRef(input) {
    // Cache the input using the key 'input':
    refs.set('input', input)
  }
  // Access the cached input to get its value:
  function addItem() {
    const value = refs.get('input').value
    if (value) {
      // Add to list...
    }
  }
  return (
    <div>
      <p>
        <input type='text' onmount={buttonRef}/>
        <button onclick={addItem}>Add</button>
      </p>
      <ul>
        { /** define list item stuff here... */}
      </ul>
    </div>
  )
}
```

## CreateRefs vs Object

Using CreateRefs is not the same as simply storing a reference on an element on an object.s. For example, you could create an object called `refs` and store references to DOM elements on its:

```javascript
const refs = {}
refs.input = document.querySelector('input')
refs.input.focus()
const value = refs.input.value
// etc.
```
The problem with the above code is that if the input is part of a component that is rendered conditional, when the component is removed from the DOM, the object `refs` retains the reference to the input element, creating a memory leak. Using CreateRefs to store references to elements avoids this problem because its references are stored in a WeakMap. This allows the references to be garbage collected when the elements they point to no longer exist.
