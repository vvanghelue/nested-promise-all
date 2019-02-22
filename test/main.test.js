const nestedPromiseAll = require('nested-promise-all')

it('simple nested object', async () => {
  const coolObject = {
  	hello : new Promise(r => setTimeout(() => r('hello-result'), 200)),
  	world : new Promise(r => setTimeout(() => r('world-result'), 100))
  }

  const expectedResult = {
  	hello: 'hello-result',
  	world: 'world-result'
  }

  await expect(nestedPromiseAll(coolObject)).resolves.toEqual(expectedResult)
})

it('complex nested object', async () => {
  const coolObject = {
  	hello : {
  		foo: new Promise(r => setTimeout(() => r('foo-result'), 400)),
  		bar: {
  			doh: new Promise(r => setTimeout(() => r('doh-result'), 200))
  		}
  	},
  	world : new Promise(r => setTimeout(() => r('world-result'), 100))
  }

  const expectedResult = {
  	hello : {
  		foo: 'foo-result',
  		bar: {
  			doh: 'doh-result'
  		}
  	},
  	world : 'world-result'
  }

  await expect(nestedPromiseAll(coolObject)).resolves.toEqual(expectedResult)
})

it('nested object with non-promise values', async () => {
  const coolObject = {
  	hi: 'cool',
  	hello : {
  		foo: new Promise(r => setTimeout(() => r('foo-result'), 400)),
  		bar: {
  			doh: new Promise(r => setTimeout(() => r('doh-result'), 200))
  		}
  	},
  	world : new Promise(r => setTimeout(() => r('world-result'), 100))
  }

  const expectedResult = {
  	hi: 'cool',
  	hello : {
  		foo: 'foo-result',
  		bar: {
  			doh: 'doh-result'
  		}
  	},
  	world : 'world-result'
  }

  await expect(nestedPromiseAll(coolObject)).resolves.toEqual(expectedResult)
})

it('execution must by parallel', async () => {
  const coolObject = {
  	hi: 'cool',
  	hello : {
  		foo: new Promise(r => setTimeout(() => r('foo-result'), 200)),
  		bar: {
  			doh: new Promise(r => setTimeout(() => r('doh-result'), 200))
  		}
  	},
  	world : new Promise(r => setTimeout(() => r('world-result'), 200))
  }

  const time = new Date().getTime()
  await nestedPromiseAll(coolObject)
  expect(new Date().getTime() - time < 300).toBe(true)
})