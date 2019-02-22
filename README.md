# nested-promise-all


```javascript
const nestedPromiseAll = require('nested-promise-all')

const result = await nestedPromiseAll({
  foo: new Promise(r => setTimeout(() => r('foo-result'), 300)),
  bar: {
    hello: new Promise(r => setTimeout(() => r('hello-result'), 100)),
    world: {
      yo: new Promise(r => setTimeout(() => r('yo-result'), 200))
    }
  }
})

console.log(result)

// outputs :
//
// { 
//	foo: 'foo-result',
//	bar: { 
//		hello: 'hello-result', 
//		world: { 
//			yo: 'yo-result' 
//		} 
//	} 
// }
```
