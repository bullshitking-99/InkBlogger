# 函数绑定func.bind

本节介绍函数的内置方法bind，他可以绑定函数调用的this以及参数，返回一个对象，他代替函数被调用，并将绑定的this和参数传递给原函数

-   bind为硬绑定，直接引用初始化时传入的对象，不受对象变量修改的影响，且只能绑定一次
-   bind返回的外来对象（exotic object）不具有原函数的属性
-   使用bind绑定参数后的函数被称为partial（偏函数应用程序）

## 对this丢失的解决

在将对象方法作为回调参数传入另一个函数的过程中，会发生丢失this的情况

```javascript
// 丢失this
function test(callback) {
  callback();
}

const obj = {
  name: "lee",
  sayHi() {
    console.log(this.name, "hi");
  },
};

test(obj.sayHi); //Cannot read properties of undefined (reading 'name')
```

其原因为，传入`test`函数的仅为`sayHi`中的代码块，在`test`中调用的`sayHi`并非对象调用，因此`this`为`undefined`

### 解决方式

#### 包装器

使用箭头函数对传入的回调进行包装，则传入test的可以是完整的对象调用函数

```javascript
// 丢失this
function test(callback) {
  callback();
}

const obj = {
  name: "lee",
  sayHi() {
    console.log("hi", this.name);
  },
};

// test(obj.sayHi); // Cannot read properties of undefined (reading 'name')
test(() => obj.sayHi()); // hi lee

```

这种方法的缺陷是会受到对象`obj`改变的影响，当我们传入回调参数的函数是异步的，如`setTimeout`，而主代码流中`obj`会在之后变化，如属性值变化或干脆`obj=null`，则异步调用也会产生错误结果

包装器对上下文的绑定是软绑定，代码稳定性受限

#### bind

函数提供了一个内建方法 [bind](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Function/bind "bind")，它可以绑定 `this`。

```javascript
// 稍后将会有更复杂的语法
let boundFunc = func.bind(context);
```

`func.bind(context)` 的结果是一个特殊的类似于函数的“外来对象（exotic object）”，它可以像函数一样被调用，并且透明地（transparently）将调用传递给 `func` 并设定 `this=context`。

```javascript
let user = {
  firstName: "John"
};

function func() {
  alert(this.firstName);
}

let funcUser = func.bind(user);
funcUser(); // John
```

`func.bind`是硬绑定，其绑定的是初始化时的对象，绑定后对原对象的引用也使得原对象不会因一些原因（如`user=null`）而被垃圾回收

```javascript
let user = {
  firstName: "John",
  sayHi() {
    alert(`Hello, ${this.firstName}!`);
  }
};

let sayHi = user.sayHi.bind(user); // (*)

// 可以在没有对象（译注：与对象分离）的情况下运行它
sayHi(); // Hello, John!

setTimeout(sayHi, 1000); // Hello, John!

// 即使 user 的值在不到 1 秒内发生了改变
// sayHi 还是会使用预先绑定（pre-bound）的值，该值是对旧的 user 对象的引用
user = {
  sayHi() { alert("Another user in setTimeout!"); }
};
```

## bind绑定参数

### 偏函数（Partical functions）

到现在为止，我们只在谈论绑定 `this`。让我们再深入一步。

我们不仅可以绑定 `this`，还可以绑定参数（arguments）。

`bind` 的完整语法如下：

```javascript
let bound = func.bind(context, [arg1], [arg2], ...);
```

例如，我们有一个乘法函数 `mul(a, b)`，让我们使用 `bind` 在该函数基础上创建一个 `double` 函数：

```javascript
function mul(a, b) {
  return a * b;
}

let double = mul.bind(null, 2);

alert( double(3) ); // = mul(2, 3) = 6
alert( double(4) ); // = mul(2, 4) = 8
alert( double(5) ); // = mul(2, 5) = 10
```

对 `mul.bind(null, 2)` 的调用创建了一个新函数 `double`，它将调用传递到 `mul`，将 `null` 绑定为上下文，并将 `2` 绑定为第一个参数。并且，参数（arguments）均被“原样”传递。

它被称为 [偏函数应用程序（partial function application）](https://en.wikipedia.org/wiki/Partial_application "偏函数应用程序（partial function application）") —— 我们通过绑定先有函数的一些参数来创建一个新函数。

请注意，这里我们实际上没有用到 `this`。但是 `bind` 需要它，所以我们必须传入 `null` 之类的东西。

为什么我们通常会创建一个偏函数？

好处是我们可以创建一个具有可读性高的名字（`double`，`triple`）的独立函数。我们可以使用它，并且不必每次都提供一个参数，因为参数是被绑定了的。

另一方面，当我们有一个非常通用的函数，并希望有一个通用型更低的该函数的变体时，偏函数会非常有用。

例如，我们有一个函数 `send(from, to, text)`。然后，在一个 `user` 对象的内部，我们可能希望对它使用 `send` 的偏函数变体：从当前 user 发送 `sendTo(to, text)`。

### 上下文未知的偏函数

现在我们需要创建一个`partial`作为工具函数，它接受任意一个函数，并为他绑定好设定的参数

```javascript
function partial(func, ...argsBound) {...}
```

如果我们使用原始的方法，在内部直接调用`func.bind()`，我们会发现如果传入的函数是对象中的方法，将无法获取到`bind`所需的上下文参数，仍然使用`null`填充则会导致可能的报错

```javascript
let user = {
  firstName: "John",
  say(time, phrase) {
    alert(`[${time}] ${this.firstName}: ${phrase}!`);
  }
};

function partial(func,...argsBound){
  return func.bind(null,...argsBound)
}

user.sayNow = partial(user.say,new Date().getHours() + ':' + new Date().getMinutes())

user.sayNow("hello") //  Cannot read properties of null (reading 'firstName')
```

因为我们传入partial的func只是一个代码段``alert(`[${time}] ${this.firstName}: ${phrase}!`);``

运行绑定后的`sayNow`时，`func`的`this`指向为null，也就无法正确运行

为此，我们得借助一个老帮手，同样是函数内置属性的`func.call`来打造一个装饰器

```javascript
function partial(func, ...argsBound) {
  return function(...args) { // (*)
    return func.call(this, ...argsBound, ...args);
  }
}

user.sayNow = partial(user.say,new Date().getHours() + ':' + new Date().getMinutes())

user.sayNow("hello") // [10:00] John: Hello!

```

再次调用`user.sayNow`，`sayNow`中的`this`指向`user`，`(*)`中`function`的`this`也同样为`user`，此时`func`即可使用正确的上下文和参数完成调用

关于func.call，以及背后的装饰器原理，可以参见我的另一篇文章

<https://juejin.cn/post/7142768444478341128>



## 总结

方法 `func.bind(context, ...args)` 返回函数 `func` 的“绑定的（bound）变体”，它绑定了上下文 `this` 和第一个参数（如果给定了）。

通常我们应用 `bind` 来绑定对象方法的 `this`，这样我们就可以把它们传递到其他地方使用。例如，传递给 `setTimeout`。

当我们绑定一个现有的函数的某些参数时，绑定后的（不太通用的）函数被称为 **partially applied** 或 **partial**。

当我们不想一遍又一遍地重复相同的参数时，partial 非常有用。就像我们有一个 `send(from, to)` 函数，并且对于我们的任务来说，`from` 应该总是一样的，那么我们就可以搞一个 partial 并使用它。

