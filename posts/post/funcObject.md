# 函数原来是个对象

函数是一个值，他的类型是对象

我们可以把函数想象成可被调用的“行为对象（action object）”。不仅可以调用它们，还能把它们当作对象来处理：增/删属性，按引用传递等。

## name属性

保存函数的名称，若为匿名函数则在上下文中寻找，有时找不到，大多数时候都可以，比如

```javascript
// 1
let sayHi = function() {
  alert("Hi");
};

alert(sayHi.name); // sayHi（有名字！）

// 2
let user = {

  sayHi() {
    // ...
  },

  sayBye: function() {
    // ...
  }

}
alert(user.sayHi.name); // sayHi
alert(user.sayBye.name); // sayBye

// 3 找不到的情况
// 函数是在数组中创建的
let arr = [function() {}];

alert( arr[0].name ); // <空字符串>
// 引擎无法设置正确的名字，所以没有值

```

## length属性

保存该函数设定的参数个数，...rest参数不计入其中

常用来进行多态操作，即根据传输函数参数的个数来灵活调用该函数

```javascript
function ask(question, ...handlers) {
  let isYes = confirm(question);

  for(let handler of handlers) {
    if (handler.length == 0) {
      if (isYes) handler();
    } else {
      handler(isYes);
    }
  }

}

// 对于积极的回答，两个 handler 都会被调用
// 对于负面的回答，只有第二个 handler 被调用
ask("Question?", () => alert('You said yes'), result => alert(result));
```

这种特别的情况就是所谓的 [多态性](https://en.wikipedia.org/wiki/Polymorphism_\(computer_science\) "多态性") —— 根据参数的类型，或者根据在我们的具体情景下的 `length` 来做不同的处理。这种思想在 JavaScript 的库里有应用。



## 自定义属性

可以为函数对象添加属性以存储函数的状态（如调用次数）

```javascript
function sayHi() {
  alert("Hi");

  // 计算调用次数
  sayHi.counter++;
}
sayHi.counter = 0; // 初始值

sayHi(); // Hi
sayHi(); // Hi

alert( `Called ${sayHi.counter} times` ); // Called 2 times
```

该属性应与函数内定义的局部变量区分开来

可使用自定义属性替代闭包，就是将外部函数中存储的数据变量改为了用内部函数的属性进行存储，例：

```javascript
function makeCounter() {
  // 不需要这个了
  // let count = 0

  function counter() {
    return counter.count++;
  };

  counter.count = 0;

  return counter;
}

let counter = makeCounter();
alert( counter() ); // 0
alert( counter() ); // 1
```

然而这样与闭包最大的区别在于：闭包中存储于外部的变量将只有嵌套函数可以访问，外部代码无法访问，因为它是属于外部函数的词法环境的，而自定义属性是属于嵌套函数的，可以在外部修改该属性的值

需要注意的是，两种方法皆有用处，取决于需求

> ⛵**自定义属性不仅可以是变量，还可以是函数，很多知名的 JavaScript 库都充分利用了这个功能。**
>
> 它们创建一个“主”函数，然后给它附加很多其它“辅助”函数。例如，[jQuery](https://jquery.com/ "jQuery") 库创建了一个名为 `$` 的函数。[lodash](https://lodash.com/ "lodash") 库创建一个 `_` 函数，然后为其添加了 `_.add`、`_.keyBy` 以及其它属性（想要了解更多内容，参查阅 [docs](https://lodash.com/docs "docs")）。实际上，它们这么做是为了减少对全局空间的污染，这样一个库就只会有一个全局变量。这样就降低了命名冲突的可能性。



## 命名函数表达式NFE

named function expression （NFE）

用途：使用函数表达式的命名来在函数内部进行自调用，避免使用变量名自调用会产生的变量值被修改问题

特点：该函数名无法被外部访问

示例：

发生某个事件时，需要函数再调用一次，并可使用默认参数等

```javascript
let sayHi = function func(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    func("Guest"); // 现在一切正常
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Hello, Guest（嵌套调用有效）
```

在该示例中，如果不采用NFE，而在函数内部直接使用函数变量名进行自调用，会因为该变量变化而导致新的被赋值变量函数（welcome）也无法执行

```javascript
let sayHi = function(who) {
  if (who) {
    alert(`Hello, ${who}`);
  } else {
    sayHi("Guest"); // Error: sayHi is not a function
  }
};

let welcome = sayHi;
sayHi = null;

welcome(); // Error，嵌套调用 sayHi 不再有效！
```

这样因为在函数表达式sayHi的词法环境中，并没有函数名这一属性，所以只能在外部词法环境中寻找，而外部词法环境中该变量名可能赋值已改变，使用NFE，会在内部词法环境中存储该命名，并可直接进行调用，从而不受外部代码影响，因为该命名外部也无法访问

需要注意的是，使用NFE后，函数的name属性会是该内部命名（func），不会再是智能分配的函数表达式的变量名（sayHi）

