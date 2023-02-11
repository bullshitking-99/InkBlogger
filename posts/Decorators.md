# 手写节流与防抖？生动展示装饰器原理与实践

常看面试题中要求手写节流与防抖，这两个概念很容易了解，看看 lodash 的源码也只有简单几行，但其中所含原理（装饰器模式）却十分精彩，了解它，才能真正举一反三，通透自然。想学吗？来沈阳大街，我教你。🔧

- 前置知识：闭包

- 涉及知识：装饰器模式与转发、`func.call`、`func.apply`、方法借用、装饰器限制

---

## 装饰器模式

你有一个好朋友牛子，以前你们刚出社会，工作比较轻松，有事没事你就爱给牛子打个电话唠唠嗑，让他帮你干点啥，后来牛子发迹了，有钱了，工作也越来越忙，于是请了一个小秘书，这下你没办法直接给牛子打电话让他给你办事了，所有电话必须先打给小秘书，小秘书记录这一次通话，并决定要不要把电话转给牛子。

你别嫌小秘书碍事，如果很多人打电话问的都是一个问题，小秘书可以记录下牛子的第一次回答，然后自动把回答回复给相同的问题，这给牛子省下了很多时间。

当然，小秘书可以做更多的事情，这就取决于你的想象力了。

在这个不成文的案例中，牛子就是真正需要调用的功能函数，而小秘书就是我们要介绍的装饰器函数

### 装饰器函数

监视对目标函数的调用，可差不多理解为对象中的访问器属性`getter`和`setter`或 Vue 中的`watch`，使得在调用真正的功能函数之前可以做任何你想做的事情，如记录函数调用情况、缓存函数调用结果、甚至阻止这一次函数的调用。

让我们从一个最简单的例子看起 — 透明缓存，为功能函数添加缓存功能，将每一次调用的参数和结果记录下来，使得下一次重复调用可以直接返回结果，这对于一些 CPU 重负载的函数是十分必要的

```javascript
function slow(x) {
  // 这里可能会有重负载的 CPU 密集型工作
  alert(`Called with ${x}`);
  return x;
}

function cachingDecorator(func) {
  let cache = new Map();

  return function(x) {
    if (cache.has(x)) {
      // 如果缓存中有对应的结果
      return cache.get(x); // 从缓存中读取结果
    }

    let result = func(x); // 否则就调用 func

    cache.set(x, result); // 然后将结果缓存（记住）下来
    return result;
  };
}

slow = cachingDecorator(slow);

alert(slow(1)); // slow(1) 被缓存下来了，并返回结果
alert("Again: " + slow(1)); // 返回缓存中的 slow(1) 的结果

alert(slow(2)); // slow(2) 被缓存下来了，并返回结果
alert("Again: " + slow(2)); // 返回缓存中的 slow(2) 的结果
```

在上面的代码中，`cachingDecorator` 是一个 **装饰器（decorator）**：一个特殊的函数，它接受另一个函数并改变它的行为。

其思想是，我们可以为任何函数调用 `cachingDecorator`，它将返回缓存包装器。这很棒啊，因为我们有很多函数可以使用这样的特性，而我们需要做的就是将 `cachingDecorator` 应用于它们。

从外部代码来看，包装的 `slow` 函数执行的仍然是与之前相同的操作。它只是在其行为上添加了缓存功能。

总而言之，使用分离的 `cachingDecorator` 而不是改变 `slow` 本身的代码有几个好处：

- `cachingDecorator` 是可重用的。我们可以将它应用于另一个函数。

- 缓存逻辑是独立的，它没有增加 `slow` 本身的复杂性（如果有的话）。

- 如果需要，我们可以组合多个装饰器（其他装饰器将遵循同样的逻辑）。

### 使用`func.call`设定上下文

上面提到的缓存装饰器不适用于对象方法。众所周知，方法属性内的 this 指向调用他的对象，如果没有对象调用则 this 为 undefined，上述代码就存在这样的问题

```javascript
// 我们将对 worker.slow 的结果进行缓存
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    // 可怕的 CPU 过载任务
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  },
};

// 和之前例子中的代码相同
function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func(x); // (**)
    cache.set(x, result);
    return result;
  };
}

alert(worker.slow(1)); // 原始方法有效

worker.slow = cachingDecorator(worker.slow); // 现在对其进行缓存 (***)

alert(worker.slow(2)); // 蛤！Error: Cannot read property 'someMethod' of undefined
```

在`(***)`行代码中，我们传入`cachingDecorator`的是的代码块

```javascript
alert("Called with " + x);
return x * this.someMethod();
```

而返回的装饰器中内部匿名函数里，也就是`(**)`行中，我们直接调用这个代码块，其中的 this 是未被赋值的，也就是我们常说的丢失上下文。

为此，我们使用一个特殊的内建函数方法 [func.call(context, …args)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Function/call "func.call(context, …args)")，它允许调用一个显式设置 `this` 的函数。

语法如下：

```javascript
func.call(context, arg1, arg2, ...)
```

它运行 `func`，提供的第一个参数作为 `this`，后面的作为参数（arguments）

例如，在下面的代码中，我们在不同对象的上下文中调用 `sayHi`：`sayHi.call(user)` 运行 `sayHi` 并提供了 `this=user`，然后下一行设置 `this=admin`：

```javascript
function sayHi() {
  alert(this.name);
}

let user = { name: "John" };
let admin = { name: "Admin" };

// 使用 call 将不同的对象传递为 "this"
sayHi.call(user); // John
sayHi.call(admin); // Admin
```

在我们的例子中，我们可以在包装器中使用 `call` 将上下文传递给原始函数：

```javascript
let worker = {
  someMethod() {
    return 1;
  },

  slow(x) {
    alert("Called with " + x);
    return x * this.someMethod(); // (*)
  },
};

function cachingDecorator(func) {
  let cache = new Map();
  return function(x) {
    if (cache.has(x)) {
      return cache.get(x);
    }
    let result = func.call(this, x); // 现在 "this" 被正确地传递了
    cache.set(x, result);
    return result;
  };
}

worker.slow = cachingDecorator(worker.slow); // 现在对其进行缓存

alert(worker.slow(2)); // 工作正常
alert(worker.slow(2)); // 工作正常，没有调用原始函数（使用的缓存）
```

现在，当我们再次运行`worker.slow(2)`，`slow`内部（闭包返回的内部函数）会接收到来自`worker`的上下文信息，也就知道了我的`this`应该指向`worker`，调用就不会出错啦

### 传递多个参数

对不起，上面的代码还是不够给力，因为它只允许我传一个参数`x`，可这怎么可能呢 😭

我们要做的是两步：

1. 将多参数组合一下，作为`Map`的键

2. 在`func.call()`中传入所有参数

来，让我们唤起尘封的记忆，想想在不知道参数会有多少的时候如何在函数内部使用参数

- argument，存储所有参数的类数组（不是真数组，内部还差个迭代器），不能使用数组方法

- ...rest，存储多余参数（也可以是所有参数，在未指定其它参数情况下），是实打实的数组，可以使用数组方法

万事俱备，开整

```javascript
let worker = {
  slow(min, max) {
    alert(`Called with ${min},${max}`);
    return min + max;
  },
};

function cachingDecorator(func, hash) {
  let cache = new Map();
  return function() {
    let key = hash(arguments); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...arguments); // (**)

    cache.set(key, result);
    return result;
  };
}

function hash(args) {
  return args[0] + "," + args[1];
}

worker.slow = cachingDecorator(worker.slow, hash);

alert(worker.slow(3, 5)); // works
alert("Again " + worker.slow(3, 5)); // same (cached)
```

这里，我们自定义一个 hash 函数，组合一下参数列表，由于 Map 可以使用任何值作为键，具体怎么将参数传入`Map`随个人

或者使用`rest`参数数组

```javascript
function cachingDecorator(func, hash) {
  let cache = new Map();
  return function(...args) {
    let key = args.join(); // (*)
    if (cache.has(key)) {
      return cache.get(key);
    }

    let result = func.call(this, ...args); // (**)

    cache.set(key, result);
    return result;
  };
}
```

可以注意到在`(*)`我们直接使用数组方法，而`argument`用不了，但是我们可以使用 func.call 的特性借用一哈

#### 方法借用

```javascript
function hash() {
  alert([].join.call(arguments)); // 1,2
}

hash(1, 2);
```

这里用一个空数组引出 join 方法，然后手动给他传入参数

你可能说这是奇技淫巧，那对不起，我也觉得 🐶，开玩笑的，既然是教程，当然要展示这些知识在应用层面的多样性，毕竟知道的越多越安全

#### `func.apply`

我们可以使用 `func.apply(this, arguments)` 代替 `func.call(this, ...arguments)`。

其语法与 call 相同，唯一的语法区别是，`call` 期望一个参数列表，而 `apply` 期望一个包含这些参数的类数组对象。

因此，这两个调用几乎是等效的：

```javascript
func.call(context, ...args);
func.apply(context, args);
```

如果`args`是一个数组（即可迭代又是类数组的对象，如上文的`rest`数组），使用 `call` 或 `apply` 均可，但是 `apply` 可能会更快，因为大多数 JavaScript 引擎在内部对其进行了优化。

#### 呼叫转移

将所有参数连同上下文一起传递给另一个函数被称为“呼叫转移（call forwarding）”。

这是它的最简形式：

```javascript
let wrapper = function() {
  return func.apply(this, arguments);
};
```

当外部代码调用这种装饰器 `wrapper` 时，它与原始函数 `func` 的调用是无法区分的。这也是为何装饰器在许多库中大行其道

## 著名的装饰器：防抖与节流

为节省篇幅，减轻大家的阅读压力，这里就只简单介绍一下并给出源码（实现多种多样，仅供参考）

### 防抖

```javascript
// 调用装饰器后开始计时，经过一段冷静时间再调用真正的处理函数，连续调用重置计时，计时完执行最新的一次
// 常用于输入框的搜索提示，即等待输入完成后再进行处理

function debounce(func, delay) {
  // 记录上一次调度标识
  let lastTimerId;

  return function(...args) {
    // 取消上一次调度，若调度已执行，clearTimeout无副作用
    clearTimeout(lastTimerId);
    lastTimerId = setTimeout(() => {
      func.apply(this, args);
    }, delay);
  };
}

let f = debounce((str) => console.log(str), 1000);

f("a");
setTimeout(() => f("b"), 200);
setTimeout(() => f("c"), 500);
// 防抖函数从最后一次函数调用以后等待 1000ms，然后执行：alert("c")
```

### 节流

```javascript
function throttle(func, delay) {
  //   设置静默状态，在每次执行后进入静默并记录调用参数与上下文，解除静默后立即执行一次最终调用
  let isThrottle = false;
  let lastArgs;
  let lastThis;

  return function wrapper(...args) {
    //静默状态下记录调用的参数与上下文，以便之后调用
    if (isThrottle) {
      lastArgs = args;
      lastThis = this;
      return;
    }

    // 进入静默状态，执行一次函数
    isThrottle = true;
    func.apply(this, args);

    // 计时退出静默状态，执行期间最后一次调用
    // 内部运行的不是 func，而是 wrapper，因为我们不仅需要执行 func
    // 还需要再次进入冷却状态并设置 timeout 以重置它。
    setTimeout(() => {
      isThrottle = false;
      if (lastArgs) {
        wrapper.apply(lastThis, lastArgs);
        lastArgs = lastThis = null;
      }
    }, delay);
  };
}
```

## 装饰器限制

通常，用装饰的函数替换一个函数或一个方法是安全的，除了一件小东西。如果原始函数有属性，例如 `func.calledCount` 或其他，则装饰后的函数将不再提供这些属性。因为这是装饰器。因此，如果有人使用它们，那么就需要小心。

例如，在上面的示例中，如果 `slow` 函数具有任何属性，而 `cachingDecorator(slow)` 则是一个没有这些属性的包装器。

一些包装器可能会提供自己的属性。例如，装饰器会计算一个函数被调用了多少次以及花费了多少时间，并通过包装器属性公开（expose）这些信息。

存在一种创建装饰器的方法，该装饰器可保留对函数属性的访问权限，但这需要使用特殊的 `Proxy` 对象来包装函数。详情可参考 [Proxy 和 Reflect](https://zh.javascript.info/proxy#proxy-apply "Proxy 和 Reflect")&#x20;

## 总结

**装饰器** 是一个围绕改变函数行为的包装器。主要工作仍由该函数来完成。

装饰器可以被看作是可以添加到函数的 “features” 或 “aspects”。我们可以添加一个或添加多个。而这一切都无需更改其代码！

为了实现 `cachingDecorator`，我们研究了以下方法：

- [func.call(context, arg1, arg2…)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Function/call "func.call(context, arg1, arg2…)") —— 用给定的上下文和参数调用 `func`。

- [func.apply(context, args)](https://developer.mozilla.org/zh/docs/Web/JavaScript/Reference/Global_Objects/Function/apply "func.apply(context, args)") —— 调用 `func` 将 `context` 作为 `this` 和类数组的 `args` 传递给参数列表。

通用的 **呼叫转移（call forwarding）** 通常是使用 `apply` 完成的：

```javascript
let wrapper = function() {
  return original.apply(this, arguments);
};
```

我们也可以看到一个 **方法借用（method borrowing）** 的例子，就是我们从一个对象中获取一个方法，并在另一个对象的上下文中“调用”它。采用数组方法并将它们应用于参数 `arguments` 是很常见的。另一种方法是使用 Rest 参数对象，该对象是一个真正的数组。
