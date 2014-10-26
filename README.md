Module Name
===

## Quick Start [phantomjs equivalent](http://phantomjs.org/quick-start.html)

```js
// @TODO: Finish this section
```

----

### API

Whenever you see `async` in front of a function it means it's [co](https://github.com/tj/co) compatible

#### `pluginName` API

`async pluginName.initialize()` - Bootstraps the instance (spawns the phantom process)  
**Returns** `undefined`, throws error if fail  
**Example** `yield pluginName.initialize()`

`pluginName.created`  - Property to determine if a `pluginName` instance was created  
Returns: `true` | `false`  
Example: `if (pluginName.created) { /* code */ }`

The following are async and are much like the phantomjs docs  
`get()` and `set()` are used to get regular phantomjs Properties
`injectJs`  
`addCookie`  
`clearCookies`  
`deleteCookie`  
`set`  
`get`

`async pluginName.createPage()` - Creates a [`page-like`](http://phantomjs.org/api/webpage/) instance
**Returns** `page` instance
**Example** `var page = yield pluginName.createPage()`

`exit()` - kills the phantomjs instance and underlying process

#### `page` API

----

### Basic Examples

```js

```
