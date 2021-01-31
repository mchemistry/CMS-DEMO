import { DirectiveOptions } from 'vue'

// Interface ClickOutside
interface ClickOE extends HTMLElement {
  clickOutsideEvent?: any
}

export const clickOutside: DirectiveOptions = {
  bind: function(el: ClickOE, _, vnode) {
    el.clickOutsideEvent = function(e: Event) {
      if (!(el === e.target || el.contains(e.target as Node))) {
        // and if it did, call method provided in attribute value
        // check : https://stackoverflow.com/questions/51851418/execute-an-expression-rather-than-calling-a-method-inside-custom-vue-directives
        if (typeof _.value === 'function') {
          _.value.bind(vnode.context)(e)
        }
        // dont use `new Fuction()`
        // Creating a function from a string is fundamentally insecure. If you can absolutely trust that the string
        // is safe and you have no choice but to convert a string into a function, then new Function is the right
        // tool.
        // see: https://stackoverflow.com/questions/56803578/alternative-option-for-new-function-string-to-real-javascript
        // else {
        //   let expression = ''
        //   const quot: string[] = ["'", '`', '"']
        //   const len = _.expression.length
        //   const beginIndexOfQuot = quot.includes(_.expression[0]) ? 1 : 0
        //   const endIndexOfQuot = quot.includes(_.expression[len - 1]) ? len - 1 : len
        //   expression = _.expression.substring(beginIndexOfQuot, endIndexOfQuot)
        //   new Function(expression).bind(vnode.context)(e)
        // }
      }
    }
    document.body.addEventListener('click', el.clickOutsideEvent)
  },
  unbind: function(el: ClickOE) {
    document.body.removeEventListener('click', el.clickOutsideEvent)
  }
}
