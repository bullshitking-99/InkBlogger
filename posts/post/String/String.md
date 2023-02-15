# 你是否想过，字符串没有属性，为什么可以像对象一样调用

在日常开发中，我们已经习惯了对诸如字符串、数字、布尔值等原始数据类型使用其内建的属性

```javascript
let str = "Hello";

alert(str.toUpperCase()); // HELLO
alert(str.length); // 5
```

如果我们把`str.toUpperCase()`单拎出来，看起来就好像是`str`对象调用了自身的一个方法属性`toUpperCase`

这时就会突然疑惑：不是只有对象可以使用`.`或`[]`调用属性吗？原始数据类型和引用类型应该是天壤之隔呀 😲

---

## 对象调用内置方法

在我们直接解开这个的问题的神秘面纱前，我们不妨先来了解另一个相关问题，这会对我们了解后续答案起到帮助：对象是可以调用属性，但它又是如何调用一些不存在于自身（初始化字面量）的属性的？

```javascript
let obj = {
  age: "11",
};
console.log(obj.hasOwnProperty("age")); //true
```

如果你对 JS 的[原型和继承](https://zh.javascript.info/prototypes "原型和继承")有一些了解，那么这个问题其实非常简单

```javascript
let obj = {
  age: "11",
};

/* 相当于
let obj = new Object({
  age: "11",
}); */
```

`hasOwnProperty`方法存在于`Object`这一构造函数的`prototype`属性中，在控制台输入`Object.prototype`，你就会发现在`Object`的这一属性上存储着所有普通对象可以使用的内置方法

![](posts/post/String/image/image_puzr7h3KRE.png)

&#x20;那么这些方法又是如何当普通对象 obj 获取到的呢？这就是对原型和继承的核心概念

### \[\[Prototype]]

在 JavaScript 中，对象有一个特殊的隐藏属性 `[[Prototype]]`（如规范中所命名的），它要么为 `null`，要么就是对另一个对象的引用。该对象被称为“原型”：

![](posts/post/String/image/image_f3obQHHgxJ.png)

当我们从 `object` 中读取一个缺失的属性时，JavaScript 会自动从原型中获取该属性。在编程中，这被称为“原型继承”。

使用特殊的名字 `__proto__`可以访问到这一隐藏属性

```javascript
console.log(obj.__proto__.constructor === Object); //true
console.log(obj.__proto__.hasOwnProperty); //[Function: hasOwnProperty]
```

### new 操作符

如上，对象所有的内建方法都存储在`Object.prototype`中，而 new 操作符所做的，就是将我们创建的对象 obj 的属性 `[[Prototype]]`与构造函数`Object`的`prototype`属性联系起来

```javascript
// 验证new的作用

function Rabbit(name) {
  this.name = name;
}
Rabbit.prototype.jump = true;

let rabbit = new Rabbit("love");

// new将rabbit的[[Prototype]]属性赋值为Rabbit的prototype属性，当然new还做了更多事情，比如运行构造函数...
// let rabbit = {};
// rabbit.__proto__ = Rabbit.prototype;

console.log(rabbit.jump); // true
```

综上，我们知道了自己创建的对象是如何调用其内建方法的

## 原始类型调用内置方法

回到我们最初的例子

```javascript
let str = "string";
console.log(str.length); // 6
```

str 变量并没有 length 属性，但是如果我们试图访问它们的属性，那么临时包装器对象将会通过内建的构造器 `String`、`Number` 和 `Boolean` 被创建。它们提供给我们操作字符串、数字和布尔值的方法然后消失。

### 临时包装器对象

- 临时：它是在原始类型调用内置属性时创建的，用完则被销毁
- 包装器：它内部的`value`属性存储着该原始类型的值
- 对象：该对象的`[[Prototype]]`指向对应内建构造器的`prototye`属性（一个对象），可以直接调用其中的属性

其实在执行 `console.log(str.length) `这段代码时，事情的经过是这样的：

1.  `new String(str)` 创建一个临时包装器对象
2.  借助对象调用指定的方法
3.  销毁这个对象（对象失去引用后就会被垃圾回收，从内存里消失）

写成代码大概是这个样子的：

```javascript
let str = "string";
let len = str.length;
console.log(len); // 6

let str = "string";
let _str = new String(str);
let len = _str.length;
_str = null;
console.log(len); // 6
```

这样做的好处是：原始类型可以提供方法，但它们依然是轻量级的

引用《JavaScript 启示录》中的相关解释：

> 在针对字符串、数字和布尔值使用字面量时，只有在该值被视为对象的情况下才会创建实际的复杂对象。换句话说，在尝试使用与构造函数关联的方法或检索属性（如 var len = 'abc'.length) 之前，一直在使用原始数据类型。当这种情况发生时，Javascript 会在幕后为字面量值创建一个包装器对象，以便将该值视为一个对象。调用方法以后，Javascript 即抛弃包装器对象，该值返回字面量类型。这就是字符串、数字、布尔值被认为是原始数据类型的原因。

### 一个面试题

```javascript
const str = "string";
str.pro = "hello";
console.log(str.pro + "world"); //undefinedworld
```

为啥`str.pro`会是`undefined`？

当执行 `str.pro = 'hello'` 时，实际上内部创建了一个临时包装器对象，然后给这个对象的 `pro` 属性赋值为 `hello` ，对象创建后马上销毁了，当下一次试图获取 `str.pro` 的值时，又会创建一个全新的临时包装器对象，显然新的没有 `pro` 属性，所以是 `undefined`&#x20;

## 总结

- 所有的内建对象都遵循相同的模式（pattern）：
  - 方法都存储在 prototype 中（`Array.prototype`、`Object.prototype`、`Date.prototype` 等）。
  - 对象本身只存储数据（数组元素、对象属性、日期）。
- 原始数据类型也将方法存储在内建构造函数的 prototype 中：`Number.prototype`、`String.prototype` 和 `Boolean.prototype`。在使用时创建临时包装器对象来调用方法，只有 `undefined` 和 `null` 没有包装器对象。
- 内建原型可以被修改或被用新的方法填充。但是不建议更改它们。唯一允许的情况可能是，当我们添加一个还没有被 JavaScript 引擎支持，但已经被加入 JavaScript 规范的新标准时，才可能允许这样做。
