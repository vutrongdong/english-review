var textToBeTypedArr = ["Search....", "vocabulary", "hello", "english"]
var index = 0, isAdding = true, textToBeTypedIndex = 0

function setText(text, time = 0) {
  setTimeout(function () {
    const isFocus = $(".input-search input").is(":focus");
    const valueInput = $(".input-search input").val()
    if (!isFocus && !valueInput) {
      $(".input-search input").attr("placeholder", text)
    }
  }, time)
}

export function playAnim() {
  setTimeout(function () {
    const isFocus = $(".input-search input").is(":focus");
    const valueInput = $(".input-search input").val()
    if (!isFocus && !valueInput) {
      const text = textToBeTypedArr[textToBeTypedIndex].slice(0, index);
      setText(`${text}|`)
      if (isAdding) {
        // adding text
        if (index > textToBeTypedArr[textToBeTypedIndex].length) {
          // no more text to add
          isAdding = false
          setText(text)
          setText(`${text}|`, 500)
          setText(`${text}`, 1000)
          setText(`${text}|`, 1500)
          setText(`${text}`, 2000)
          //break: wait 2s before playing again
          setTimeout(function () {
            playAnim()
          }, 2500)
          return
        } else {
          // increment index by 1
          index++
        }
      } else {
        // removing text
        if (index === 0) {
          // no more text to remove
          isAdding = true
          //switch to next text in text array
          textToBeTypedIndex = (textToBeTypedIndex + 1) % textToBeTypedArr.length
        } else {
          // decrement index by 1
          index--
        }
      }
    }
    // call itself
    playAnim()
  }, isAdding ? 200 : 150)
}
