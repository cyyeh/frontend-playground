/**
 * prototypal inheritance
 */

// Using Object.create to create an object from a prototype
const proto = {
  sender: 'luis@tjoj.com'
}

const child = Object.create(proto)
child.recipient = 'luke@tjoj.com'

console.log(child.sender) // luis@tjoj.com
console.log(child.recipient) // luke@tjoj.com

// another way to do this
const anotherChild = Object.setPrototypeOf({}, proto)
anotherChild.recipient = 'luke@tjoj.com'
console.log(anotherChild.sender) // luis@tjoj.com
console.log(anotherChild.recipient) // luke@tjoj.com
console.log(proto)
