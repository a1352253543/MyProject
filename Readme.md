# Vue

## 组件

### 组件的定义

包含界面局部功能代码和资源的集合，一个组件可以没有样式css，可以没有交互js，但是一定要有结构html

- 即创建组件时，可以不写交互，可以不写样式，但是一定要使用生命周期的配置项template写结构

### 非单文件组件（几乎不用）

#### 定义

一个文件中包含有n个组件（.html文件中有很多个.vue）

#### 非单文件组件的流程

1. 创建组件

   ```vue
   const 临时的组件名，即在什么位置 = Vue.extend({
   			template：`		//组件的格式不要写在大哥vm指向的容器中了，这里是组件化编程的优势
   				<div>
                       这里写这个组件的结构，即在什么位置
                    <div> 
   			`,
   			data(){
   				return {
   					对象
   				}
   			}
   		})
   ```

   创建组件时的配置项和创建Vue的vm实例的配置项相似（直接CV），然后修改以下配置项：

   - 删掉el配置项，因为组件是一块砖，哪里需要哪里搬，所以不需要在创建的时候指定其为哪个容器服务，即不需要写el配置项，最终所有的组件都要被一个vm管理，由vm的el决定服务于哪个容器
   - data配置项要写成普通函数的形式，函数内部返回真正想写的那个对象
     - 当data配置项写成对象式时，当另外一个页面也用该组件时，对象式在内存中是有引用关系的，当我修改了某个数据，另外那个页面数据也发生了变化，所以要写成函数式，每一次调用都是给的新的、不变的字面量数据

2. 注册组件

   此时因为各个组件内都有其相应的data配置项了，所以创建vm的data配置项可以删去，且添加一个新的配置项components，告诉大哥vm他有几个小弟，分别叫啥名

   ```vue
   new Vue({		//创建vm
   			el:'#root',
   			//第二步：注册组件（局部注册）（局部注册用的多）
   			//局部注册的组件只能在el对应的容器中使用，用的多
   			components:{		//key-value
   				最终的组件名1：临时的组件名1，		
   				最终的组件名2：临时的组件名2
   				//当临时的组件名和最终的组件名相同时，可以简写为
   				组件名1，
   				组件名2
   				//最终的组件名，即组件真正叫什么
   			}
   		})
   
   如果想要别的大哥也使用这个小弟，则将这个小弟使用全局注册
   Vue.component('最终的组件名'，临时的组件名)
   ```

3. 使用组件

   在大哥vm的div中写组件标签

   ```vue
   <div id="root">
       <!-- 编写组件标签 -->
       <组件名1></组件名1>
       <!-- 编写组件标签 -->
       <组件名2></组件名2>
       <!-- 此处就体现了复用，只写了一遍组件代码，写两个组件标签就能用第二次，且这两个之间的数据不会相互影响（因为data写成了函数式） -->
       <组件名2></组件名2>		
   </div>
   ```

4. 组件名的写法

   - 一个单词组成：
     - 首字母小写
     - 首字母大写，推荐使用
   - 多个单词组成：
     - kebab-case命名法
     - CamelCase命名法，(需要Vue脚手架支持)，推荐使用

5. 组件标签的写法

   - <组件名></组件名>
   - <组件名/>，(需要Vue脚手架支持)

6. 创建组件的简写写法

   ```vue
   const 组件名 = Vue.extend(options) 
   可简写为
   const 组件名 = options
   ```

   

7. 组件的嵌套

   - 第一步，先定义子组件

     ```vue
     const 子组件名 = Vue.extend({		//第一步，先定义子组件
     			...
     		})
     ```

     

   - 第二步，再注册子组件

     ```vue
     const 父组件名 = Vue.extend({
     			name:'父组件名',
     			template:`
     				<div>
     					...
     					<子组件名></子组件名>		//第三步，再写子组件标签	
     				</div>
     			`,
     			data(){
     				return {
     					...
     				}
     			},
     
     			//第二步，再注册子组件（局部），这里的子组件是专门给父组件使用的
     			//组件的嵌套，子组件的注册不能和父组件在一起注册，那样就平级了，要在父组件定义的内部注册，注意：要先（先是指代码在上方）定义子组件，再注册子组件，定义在注册上面
     			components:{		
     				子组件名
     			}
     		})
     ```

     

   - 第三步，再写子组件标签

8. app组件（标准化开发）

   app组件用来管理所有的组件，vm大哥管理二把手app，app管理众多小弟（注意，小弟们也是有层级之分的，app只管理小弟的头（所有平级的祖先组件））

   - 定义app组件

     ```vue
     const app = Vue.extend({		//每个祖先组件之下的父组件和子组件不用写进来
     			template:`
     				<div>	
     					<祖先组件名1></祖先组件名1>
     					<祖先组件名2></祖先组件名2>
     				</div>
     			`,
     			components:{
     				祖先组件名1,
     				祖先组件名2
     			}
     		})
     ```

     

   - 注册app组件并写组件标签

     ```vue
     //创建vm
     new Vue({
     			el:'#root',
     			//注册组件（局部）
     			components:{app}		
     		})
     ```

     ```vue
     <!-- 准备好一个容器-->
     <div id="root">
     	//不用写一大堆祖先组件标签了
         //只用写一个app组件标签
         <app></app>
     </div>
     ```

     更简单的写法：

     ```vue
     //创建vm
     new Vue({
     			template:'<app></app>',		//这里体现了app组件的方便，不用写其他的组件，这里写了app，则容器中的div中就不用写app标签了
     			el:'#root',
     			//注册组件（局部）
     			components:{app}		
     		})
     ```

     ```vue
     <!-- 准备好一个容器-->
     <div id="root">
     	//啥都不用写，因为写在了vm的template中
     </div>
     ```

9. 

### VueComponents构造函数（看了原型和原型链的内容后再回来看第六点的内置关系）

1. 组件本质是一个名为VueComponent的构造函数，且不是程序员定义的，是Vue.extend生成的
2. 我们只需要写组件标签，Vue解析时会帮我们创建组件的实例对象， 即Vue帮我们执行了：new VueComponent(options)
3. 每次调用Vue.extend，返回的都是一个全新的VueComponent（与全局事件总线有关）
4. 关于this指向：
   - 组件配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【VueComponent实例对象】
   - new Vue(options)配置中：data函数、methods中的函数、watch中的函数、computed中的函数 它们的this均是【Vue实例对象】，就是vm。
5. VueComponent的实例对象，简称vc（也可称之为：组件实例对象）。Vue的实例对象，简称vm。vm管理着很多vc
6. vm和vc的比较
   - 一个重要的内置关系：VueComponent.prototype.__proto__ === Vue.prototype
   - 为什么要有这个关系：让组件实例对象（vc）可以访问到 Vue原型上的属性、方法。
   - vc是由vm缔造的，vm是由Vue缔造的
   - vc有的功能，vm都有
   - 但是vm的通过el决定为哪个容器服务的功能vc就没有，且vm的data可以写成函数式也可以写成对象式，而vc的data必须写成函数式

### 单文件组件（主流）

#### 定义

一个文件中只包含有1个组件（只有一个.vue）

#### 优势

条理清晰，代码好维护，所以大型项目经常使用单文件组件

#### 前提概要

1. 单文件组件的.vue文件不能被浏览器所直接识别，要通过一系列的操作转换为纯粹的.js文件，才能被浏览器识别和渲染
2. 如何转换？
   - 使用webpack搭建工作流，（比较麻烦，不推荐）
   - 使用Vue团队使用webpack搭建好的脚手架，（推荐）

#### 单文件组件的流程

1. 安装插件

   安装vetur插件，使得vscode认识.vue文件并产生高亮

2. 定义小弟们.vue

   尖括号<快速调出组件框架，该框架很简单，与非单文件组件形成鲜明对比（非单：把结构、交互、样式写在同一个.html中，格式看起来混乱，且违背了组件设计的初衷）

   ```vue
   <template>
    	//组件的结构
   </template>
   
   <script>
       //组件的交互（数据、方法等）
   export default {		//为了能让别人和自己引入组件而将其暴露（ES6）
   	name:'组件名',
   	...
   }
   </script>
   
   <style>
   	//组件的样式
   </style>
   ```

   ```vue
   const 组件名 = Vue.extend({
   	...
   })
   export default 组件名
   
   简写为
   
   export default Vue.extend({
   	...
   })
   
   简写为
   
   export default ({		//直接暴露组件的配置对象，推荐使用
   	name:'组件名'
   	...
   })
   ```

   

3. 定义二把手App.vue

   ```vue
   <template>
   	 <!-- 第三步：写组件标签 -->
   	<组件名/>
   </template>
   
   <script>
       //第一步：引入组件
       import xxx from xxx
       
   	export default {
           name：'App',
           //第二部：注册组件
           components:{
           组件名
       }
   
   	}
   </script>
   
   <style>
   
   </style>
   ```

   

4. 定义老大vm

   创建main.js文件或index.js

   ```vue
   //浏览器不认识ES6语法，要把全部步骤文件放在脚手架中才能正常运行
   //这个文件是用来，vm的，只有app.vue有资格和vm联系
   // new Vue不能写在.vue文件中，要写在这里
   
   // 引入vue
   import Vue from 'vue'
   
   // 第一步，引入二把手App
   import App from './App.vue'		//执行到此时，执行步骤三
   
   // 关闭Vue的生产提示
   Vue.config.productionTip = false
   
   // 第二步，创建Vue实例对象vm
   new Vue({		//因为步骤一先引入的Vue，所以这里可以new
   	render: h => h(App),		// render后面专门讲，是将App组件放入容器中的作用
   	el:'#root',		//为哪个容器服务，等价于.$mount('#app') 
   	template:`<App></App>`,		//<!-- 要么在index.html的容器div中写：<App></App>标签，要么在main.js的template中写<App></App>标签 -->
   	components:{App},		//注册二把手App 
   })
   ```

   

5. 创建容器

   创建index.html入口文件，使用!调出框架

   ```html
   <!DOCTYPE html>
   <head>
       <meta charset="UTF-8">
       <title>Document</title>
   </head>
   <body>
    	//第一步：创建容器
       <div id="root">
           第四步：写二把手App标签(方法一)，方法二：在main.js新增配置项template，在这里面写
           <App></App>
       </div>
       
       //第二步：引入vue源码，因为main.js中用了Vue，但是没引入，在这里引入，且要在引入main.js上面
       <script type="text/javascript" src="../js/vue.js"></script>
       
       //第三步：引入main.js
       <script type="text/javascript" src="./main.js"></script>
   </body>
   </html>
   ```

### props配置项

1. 功能：让组件接收外部传过来的数据

2. 传递数据：```<Demo name="xxx"/>```

3. 接收数据：

   1. 第一种方式（只接收）：```props:['name'] ```

   2. 第二种方式（限制类型）：```props:{name:String}```

   3. 第三种方式（限制类型、限制必要性、指定默认值）：

      ```js
      props:{
      	name:{
      	type:String, //类型
      	required:true, //必要性
      	default:'老王' //默认值
      	}
      }
      ```

   > 备注：props是只读的，Vue底层会监测你对props的修改，如果进行了修改，就会发出警告，若业务需求确实需要修改，那么请复制props的内容到data中一份，然后去修改data中的数据。

### mixin配置项(混入)

1. 功能：可以把多个组件共用的配置提取成一个混入对象

2. 使用方式：

   第一步定义混合：

   ```
   {
       data(){....},
       methods:{....}
       ....
   }
   ```

   第二步使用混入：

   ​	全局混入：```Vue.mixin(xxx)```
   ​	局部混入：```mixins:['xxx']

### 插件

1. 功能：用于增强Vue

2. 本质：包含install方法的一个对象，install的第一个参数是Vue，第二个以后的参数是插件使用者传递的数据。

3. 定义插件：

   ```js
   对象.install = function (Vue, options) {
       // 1. 添加全局过滤器
       Vue.filter(....)
   
       // 2. 添加全局指令
       Vue.directive(....)
   
       // 3. 配置全局混入(合)
       Vue.mixin(....)
   
       // 4. 添加实例方法
       Vue.prototype.$myMethod = function () {...}
       Vue.prototype.$myProperty = xxxx
   }
   ```

4. 使用插件：```Vue.use()

### 组件的自定义事件

区别于js原生的内置事件，内置时间是给html元素用的，而自定义事件是给组件用的

1. 一种组件间通信的方式，适用于：<strong style="color:red">子组件 ===> 父组件</strong>

2. 使用场景：A是父组件，B是子组件，B想给A传数据，那么就要在A中给B绑定自定义事件（<span style="color:red">事件的回调在A中</span>）。

3. 绑定自定义事件：

   1. 第一种方式，在父组件中：```<Demo @atguigu="test"/>```  或 ```<Demo v-on:atguigu="test"/>```

   2. 第二种方式，在父组件中：

      ```js
      <Demo ref="demo"/>
      ......
      mounted(){
         this.$refs.xxx.$on('atguigu',this.test)
      }
      ```

   3. 若想让自定义事件只能触发一次，可以使用```once```修饰符，或```$once```方法。

4. 触发自定义事件：```this.$emit('atguigu',数据)```		

5. 解绑自定义事件```this.$off('atguigu')```

6. 组件上也可以绑定原生DOM事件，需要使用```native```修饰符。

7. 注意：通过```this.$refs.xxx.$on('atguigu',回调)```绑定自定义事件时，回调<span style="color:red">要么配置在methods中</span>，<span style="color:red">要么用箭头函数</span>，否则this指向会出问题！

## 路由

### 定义

 一个路由（route）就是一组映射关系（key - value），多个路由需要路由器（router）进行管理。key是路径，value是组件。

### 路由的文件结构

```
├── node_modules 
├── public
│   ├── favicon.ico: 网站页签图标（更改时拖拽放入即可，前提是名称一致）
│   └── index.html: 整个网站的主页面
├── src
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放一般组件，不包括App和路由组件-------------------改动
│   │   └── HelloWorld.vue
│   │── pages:存放路由组件（需要靠切换来展示页面的组件）-----------------新增
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件
│   │── router: 路由器-----------------------------------------------新增
│   │   └── index.js用于创建整个网站的路由器---------------------------新增
├── .gitignore: git版本管制忽略的配置（不用改）
├── babel.config.js: ES6转换到ES5的配置文件（不用改）
├── package.json: npm应用包配置文件（可以查看npm下载包的版本等信息） 
├── README.md: 项目说明书
├── package-lock.json：包版本控制文件（锁定npm包的版本）
```



### 路由的作用

为了实现单页面应用导航区和展示区的交互切换

- 定义：单页面应用（SPA，single page web application），即vue框架中只有一个.html文件

- 多页面应用：不使用Vue时，一个网站需要好多.html文件，在主页html中，有很多导航按钮，点击按钮时，就会跳转到其他.html（且页面中左上角的重新加载此页按钮会转动），实现页面的切换

- 单页面应用的特点：点击导航区的导航按钮后

  - 重新加载此页按钮不转动

  - 不会新开页签，页签不闪烁 

  - 页面不跳转，只进行局部更新（展示区更新）

    - 实现原理：
    - 刚开始若想要展示区什么都不展示，则路径没有/XXX，只有![image-20220107143453854](C:/Users/13522/AppData/Roaming/Typora/typora-user-images/image-20220107143453854.png)
    - 当点击导航区内的按钮时，会引起路径的变化，路径增加了后缀/XXX
    - 浏览器路径一旦发生变化，就会被Vue中的router监测到，router读取路径，发现后缀/XXX，且根据程序员配置的路由规则（key是后缀，即路径，value可能是组件，可能是函数）来在相应展示区展示相应的组件

  - 路径发生变化，目的是为了让用户将此链接保存下来时，二回直接能精确定位进入到想要到达的页面![image-20220107143233312](C:/Users/13522/AppData/Roaming/Typora/typora-user-images/image-20220107143233312.png)

  - 数据需要通过ajax请求获取

  - 只有一个页面，即index.html

    

### 路由的实现

1. 安装vue-router插件库

   ```
   npm i vue-router
   ```

2. 在main.js文件中引入vue-router插件库

   ```javascript
   import VueRouter from 'vue-router'
   ```

3. 在main.js文件中应用vue-router插件库

   ```javascript
   Vue.use(VueRouter)
   ```

4. 此时，便可以使用router配置项了，在src文件夹下，新建router文件夹，在router文件夹中新建index.js文件，该文件专门用于创建整个应用的路由器

   - 在index.js文件中引入路由器

     ```javascript
     import VueRouter from 'vue-router'		//VueRouter是一个构造函数
     ```

   - 在index.js文件中创建路由器

     ```javascript
     //路由器管理路由
     const router =  new VueRouter({
     	routes:[		//路由们是一个数组，里面是一组一组的路由（key：value）
     		{		//第一组路由
     			path:'/路径名',		//key
     			component:组件名		//value
     		},
     		{		//第二组路由
     			path:'/路径名',		//key
     			component:组件名		//value
     		}
     	]
     })
     ```

   - 此时路由规则中的value没有定义，所以在index.js文件中引入组件

     ```javascript
     import 组件名 from '组件所在的位置'
     import 组件名 from '组件所在的位置'
     ```

   - 在index.js文件中暴露路由器

     ```javascript
     export default router
     ```

   - 简写

     ```javascript
     const router =  new VueRouter
     和
     export default router
     简写为
     export default new VueRouter
     ```

5. 在main.js文件中引入刚才创建好的路由器

   ```javascript
   //一个应用有一个路由器就够了
   import router from 'index.js文件的地址'
   ```

6. 在main.js文件中添加router配置项

   ```vue
   new Vue({
       其他配置项，
       router:router
   })
   ```

7. 保存后，此时，在浏览器的路径中出现/#/表示路由配置成功

8. 实现点击导航项，切换路径的功能

   - 原生html中使用a标签实现页面的跳转

   - 在App.vue文件的div中编写router-link标签，使用router-link标签替代a标签、用to属性替代href属性

     - router-link标签通过vue-router库转换成a标签

     - router-link标签的样式等其他写法都与a标签相同

     - active-class属性可配置高亮样式

       ```vue
       <router-link active-class="active" to="/路径名（网站后缀名）">组件名</router-link>
       ```

     - 当有多级路由时，to属性后的路径要写完整的，路径太长，很麻烦，解决方法：

       ```vue
       :to="{name:'路由名'}"
       或
       to="/路由名"
       
       //适用于路径太长的情况，一般不用，详情见路由命名
       ```

9. 指定展示位置

   - 此时，当切换点击导航项时，路由器已经能监测到路径的变化，且完成了路由规则的匹配，但是路由器不知道将内容展示到何处

   - 在App.vue文件的div中编写router-view标签，规定展示内容的区域在哪个div中

   - 注意：该div是展示区div，而router-link标签的div是导航区div

   - ```vue
     <router-view></router-view>
     ```

   


### 路由的分类

1. 前端路由

   value是组件，用于展示页面内容，当浏览器的路径发生变化时，对应的组件就会显示

2. 后端路由

   value是函数，用于处理客户端提交的请求，当服务器接收到一个请求时，根据请求路径找到匹配的函数来处理请求，返回响应数据

   ![image-20220107145306221](C:/Users/13522/AppData/Roaming/Typora/typora-user-images/image-20220107145306221.png)

   

### 注

1. 路由组件通常存放在```pages```文件夹，一般组件通常存放在```components```文件夹。
2. 通过切换，“隐藏”了的路由组件，默认是被销毁掉的，需要的时候再去挂载，在来回切换导航的时候，路由组件是来回的进行挂载、销毁、挂载、销毁
3. 每个路由组件都有自己的```$route```属性，里面存储着自己的路由信息。
4. 整个应用只有一个router，无论有多少个路由规则，始终都在同一个路由器下管理，可以通过组件的```$router```属性获取到。
5. 导航名、路径名（后缀名）、组件名不一定要一模一样

### 嵌套路由（多级路由）

导航区点击后，展示区展示，展示区中又有导航区和展示区，只需要写新的导航区和展示区代码（新的组件）、还要写嵌套的路由规则

1. 配置路由规则，使用children配置项：

   ```js
   routes:[
   	{		//一级路由
   		path:'/about',
   		component:About,
   	},
   	{		//一级路由
   		path:'/home',
   		component:Home,
   		children:[ 		//二级路由，使用children配置项，是一个数组，因为一级路由可以有n个二级子路由
   			{		//子路由的path不要写斜杠，因为低层遍历规则时已经加上斜杠了
   				path:'news', 		//此处一定不要写斜杠：/news
   				component:News
   			},
   			{
   				path:'message',		//此处一定不要写斜杠：/message
   				component:Message
   			}
   		]
   	}
   ]
   ```

2. 跳转（要写完整的多级路径）：

   因为当路径发生改变时，路由器监测到，然后去匹配，如果不写完整的多级路径，则匹配不上，页面不呈现子value

   ```vue
   <router-link to="完整的多级路径">导航项名</router-link>
   ```

### 路由的query参数

与ajax中的query参数相似

1. 传递参数

   ```vue
   <!-- 跳转并携带query参数，to的字符串写法 -->
   <router-link :to="/home/message/detail?id=666&title=你好">跳转</router-link>
   				
   <!-- 跳转并携带query参数，to的对象写法 -->
   <router-link 
   	:to="{
   		path:'/home/message/detail',
   		query:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

2. 接收参数：

   ```js
   $route.query.id
   $route.query.title
   ```

### 路由命名

1. 作用：当多级路由时，路径太长，改成路由名，可以简化路由的跳转。

2. 如何使用

   1. 给路由命名：

      ```js
      {
      	path:'/demo',
      	component:Demo,
      	children:[
      		{
      			path:'test',
      			component:Test,
      			children:[
      				{
                            name:'hello' //给路由命名
      					path:'welcome',
      					component:Hello,
      				}
      			]
      		}
      	]
      }
      ```

   2. 简化跳转：

      ```vue
      <!--简化前，需要写完整的路径 -->
      <router-link to="/demo/test/welcome">跳转</router-link>
      
      <!--简化后，直接通过名字跳转 -->
      <router-link :to="{name:'hello'}">跳转</router-link>
      
      <!--简化写法配合传递参数 -->
      <router-link 
      	:to="{
      		name:'hello',
      		query:{
      		   id:666,
                  title:'你好'
      		}
      	}"
      >跳转</router-link>
      ```

### 路由的params参数

与ajax中的params参数相似

1. 配置路由，声明接收params参数

   ```js
   {
   	path:'/home',
   	component:Home,
   	children:[
   		{
   			path:'news',
   			component:News
   		},
   		{
   			component:Message,
   			children:[
   				{
   					name:'xiangqing',
   					path:'detail/:id/:title', //使用占位符声明接收params参数
   					component:Detail
   				}
   			]
   		}
   	]
   }
   ```

2. 传递参数

   ```vue
   <!-- 跳转并携带params参数，to的字符串写法 -->
   <router-link :to="/home/message/detail/666/你好">跳转</router-link>
   				
   <!-- 跳转并携带params参数，to的对象写法 -->
   <router-link 
   	:to="{
   		name:'xiangqing',
   		params:{
   		   id:666,
               title:'你好'
   		}
   	}"
   >跳转</router-link>
   ```

   > 特别注意：路由携带params参数时，若使用to的对象写法，则不能使用path配置项，必须使用name配置！

3. 接收参数：

   ```js
   $route.params.id
   $route.params.title
   ```

### 路由组件的props配置项

​	作用：复用代码，让路由组件更方便的收到参数

```js
{
	name:'xiangqing',
	path:'detail/:id',
	component:Detail,

	//第一种写法：props值为对象，该对象中所有的key-value的组合最终都会通过props传给Detail组件
	// props:{a:900}

	//第二种写法：props值为布尔值，布尔值为true，则把路由收到的所有params参数通过props传给Detail组件
	// props:true
	
	//第三种写法：props值为函数，该函数返回的对象中每一组key-value都会通过props传给Detail组件
	props(route){
		return {
			id:route.query.id,
			title:route.query.title
		}
	}
}
```

### router-link标签的replace属性

1. 作用：控制路由跳转时操作浏览器历史记录的模式
2. 记录：即网站的路径
3. 浏览器的历史记录有两种写入方式：分别为```push```和```replace```，```push```是追加历史记录（不破坏历史记录，把新的记录压入栈），```replace```是替换当前记录。路由跳转时候默认为```push```
4. 如何开启```replace```模式：```<router-link replace .......>News</router-link>```
5. 浏览器是通过栈来保存历史记录，历史记录中有个指针，默认指向栈顶的记录，push模式：当点击一次后退按钮时，指针向下移动一次，网页路径发生改变，跳转，前进按钮同理

### 编程式路由导航

1. 作用：当使用button写的导航项，而不使用router-link标签时，想要实现路由跳转，则要使用编程式路由导航，让路由跳转更加灵活

2. 具体编码：

   ```js
   //$router的两个API
   this.$router.push({		//和之前的to后的内容相似
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   
   this.$router.replace({
   	name:'xiangqing',
   		params:{
   			id:xxx,
   			title:xxx
   		}
   })
   this.$router.forward() //前进
   this.$router.back() //后退
   this.$router.go() //可前进也可后退
   ```

### 缓存路由组件

1. 作用：让不展示的路由组件保持挂载，不被销毁。例如，一个输入框组件，用户输入了数据，保存了真实DOM的数据，当用户切走再切回来时，因为它被销毁了，所以内容没了。想要保持内容的存在，就要将其在切走时保持挂载，不被销毁。

2. 具体编码：

3. 注意：这个标签写在该处：想要保持挂载的组件是在谁的展示区中，标签写在谁的组件文件中

   ```vue
   <keep-alive include="想要缓存的路由组件名"> 
       <router-view></router-view>
   </keep-alive>
   
   <keep-alive :include="['想要缓存的路由组件名1','想要缓存的路由组件名2',...]"> 
       <router-view></router-view>
   </keep-alive>
   ```



### 两个新的生命周期钩子

1. 作用：路由组件所独有的两个钩子，用于捕获路由组件的激活状态。
2. 具体名字：
   1. ```activated```路由组件被激活时触发。
   2. ```deactivated```路由组件失活时触发。

### 路由守卫

1. 作用：对路由进行权限控制，检查是否有权限，没有权限的话点击导航项，不切换

2. 分类：全局守卫、独享守卫、组件内守卫

3. 全局守卫:

   ```js
   //全局前置守卫：初始化时执行、每次路由切换前执行
   //to参数：要去的目标路由的信息
   //from参数：来自哪里的源路由的信息
   //只要设置该守卫，默认情况下权限为最高，切换不了，保护住了，想要切换则要适当放行
   //next()：放行
   router.beforeEach((to,from,next)=>{		//beforeEach这个路由器的API可以让每一次路由切换之前都调用一个函数
   	console.log('beforeEach',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){ //权限控制的具体规则
   			next() //放行
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next() //放行
   	}
   })
   
   //全局后置守卫：初始化时执行、每次路由切换后执行
   router.afterEach((to,from)=>{
   	console.log('afterEach',to,from)
   	if(to.meta.title){ 
   		document.title = to.meta.title //修改网页的title
   	}else{
   		document.title = 'vue_test'
   	}
   })
   ```

4. 独享守卫:

   ```js
   beforeEnter(to,from,next){
   	console.log('beforeEnter',to,from)
   	if(to.meta.isAuth){ //判断当前路由是否需要进行权限控制
   		if(localStorage.getItem('school') === 'atguigu'){
   			next()
   		}else{
   			alert('暂无权限查看')
   			// next({name:'guanyu'})
   		}
   	}else{
   		next()
   	}
   }
   ```

5. 组件内守卫：

   ```js
   //进入守卫：通过路由规则，进入该组件时被调用
   beforeRouteEnter (to, from, next) {
   },
   //离开守卫：通过路由规则，离开该组件时被调用
   beforeRouteLeave (to, from, next) {
   }
   ```

### 路由器的两种工作模式

1. 对于一个url来说，#及其后面的内容就是hash值。

2. hash值不会包含在 HTTP 请求中，即：hash值不会带给服务器。

3. 路由器的默认工作模式，hash模式：

   1. 地址中永远带着#号，不美观 。
   2. 若以后将地址通过第三方手机app分享，若app校验严格，则地址会被标记为不合法。
   3. 兼容性较好。

4. history模式：

   1. 没有哈希值了，地址干净，美观 。
   2. 兼容性和hash模式相比略差。
   3. 应用部署上线时需要后端人员支持，解决刷新页面服务端404的问题。否则，要改为hash模式，重新打包、部署。
      1. history模式时，刷新页面后，服务器匹配时，找不到路径的后缀资源，会报404错误
         - 解决404错误的办法：
           - 前端换用hash模式
           - 后端用node.js的connect-history-api-fallback中间件进行处理
      2. 而hash模式，因为hash值不会带给服务器，服务器不匹配hash值，不会报错

5. 如何配置history模式：

   在index.js文件中，创建路由器时，添加配置项

   ```vue
   mode:'history'
   ```

6. 补充：项目前端代码写完后，要先把这些文件（主要是src中的文件）打包（通过npm run build命令，打包后会自动生成一个dist文件夹，其中便是.html.css.js文件），不管用的是什么前端框架，都要将其打包成原始的.html.css.js文件，然后给后端人员放到服务器上部署后（主要用到node.js和express技术栈，一般是后端的活），才能上线（视频133集）

## 脚手架

### 定义

- 脚手架也叫Vue CLI（command line interface，CLI，命令行接口工具）

- Vue脚手架是Vue官方提供的标准化开发工具，.vue文件不能被浏览器所直接识别，要通过脚手架转换，浏览器才能识别

### 搭建环境

1. 配置npm淘宝镜像

   仅第一次执行

   ```
   npm config set registry http://registry.npm.taobao.org
   ```

2. 全局安装脚手架

   仅第一次执行

   ```
   npm install -g @vue/cli
   ```

3. 创建项目

   在想要创建项目的地方cmd进入

   ```
   vue create +项目名称
   ```

   - babel：ES6到ES5的语法转换
   - eslint：语法检查

4. 启动项目

   从文件夹打开vscode，开启终端快捷键：ctrl+`

   停止终端快捷键：两次ctrl+c

   ```
   npm run serve
   ```

   该命令运行后，自动运行main.js入口文件

5. 按需安装相应的包

   安装ol包

   ```
   cnpm install ol
   ```

   安装后，node_modules文件夹中就有了ol包

### 脚手架文件结构

```
├── node_modules 
├── public（文件夹名称不能改）
│   ├── favicon.ico: 网站页签图标（名称不能改，要想改图标：名称一致，拖入覆盖）
│   └── index.html: 整个网站的主页面（名称不能改）
├── src（文件夹名称不能改）
│   ├── assets: 存放静态资源
│   │   └── logo.png
│   │── component: 存放组件（存放所有组件，除了App组件）（文件夹名称可以改，但不推荐）
│   │   └── HelloWorld.vue
│   │── App.vue: 汇总所有组件
│   │── main.js: 入口文件（名称不能改）
├── .gitignore: git版本管制忽略的配置（不用改）
├── babel.config.js: ES6转换到ES5的配置文件（不用改）
├── package.json: npm应用包配置文件（可以查看npm下载包的版本等信息） 
├── README.md: 项目说明书
├── package-lock.json：包版本控制文件（锁定npm包的版本）
```

1. package.json文件

   - serve命令：配置好脚手架
   - build命令：前端开发完毕后打包

2. main.js文件

   ```js
   //该文件是整个项目的入口文件
   
   //引入残缺版的Vue（没有模板解析器的Vue包）
   import Vue from 'vue'
   //引入App组件，它作为变量，传参给render箭头函数
   import App from './App.vue'
   //关闭vue的生产提示
   Vue.config.productionTip = false
   
   //创建Vue实例对象---vm
   new Vue({
   	el:'#app',	
       //render函数完成了这个功能：将App组件放入容器中
       //当引入残缺版的Vue时，且vm中需要写template配置项时，要使用render函数，否则没有模板解析器来解析template配置项，会报错
       //而组件中的template标签是通过package.json中的vue-template-complier这个模板解析器解析
     	render: h => h(App),		//这是简写，详情见视频63集		
   })
   ```

   关于node_modules中的不同版本的Vue包

   - vue.js与vue.runtime.xxx.js的区别：
     - vue.js是完整版的Vue，包含：核心功能 + 模板解析器。
     - vue.runtime.xxx.js是运行版的Vue，只包含：核心功能；没有模板解析器。
     - 默认是引入vue.runtime.esm.js，即ES6 module。
   - 因为vue.runtime.xxx.js没有模板解析器，所以不能使用template这个配置项，需要使用render函数接收到的createElement函数去指定具体内容。
   - 为什么要设置完整版和精简版？因为在开发时，模板解析器的体积较大，前端代码写完后，打包时，含有模板解析器的完整版也在其中（但是这时不需要解析器了），所以体积大，不好。所以在开发时，使用精简版的Vue包+render函数，能节省项目体积

3. [文件结构这些可以更改](https://cli.vuejs.org/zh/config/)

   - 使用vue inspect > output.js可以查看到Vue脚手架的默认配置。
   - 使用vue.config.js可以对脚手架进行个性化定制，详情见：https://cli.vuejs.org/zh

### 脚手架配置代理

#### 方法一

​	在vue.config.js中添加如下配置：

```js
devServer:{
  proxy:"http://localhost:5000"
}
```

说明：

1. 优点：配置简单，请求资源时直接发给前端（8080）即可。
2. 缺点：不能配置多个代理，不能灵活的控制请求是否走代理。
3. 工作方式：若按照上述配置代理，当请求了前端不存在的资源时，那么该请求会转发给服务器 （优先匹配前端资源）

#### 方法二

​	编写vue.config.js配置具体代理规则：

```js
module.exports = {
	devServer: {
      proxy: {
      '/api1': {// 匹配所有以 '/api1'开头的请求路径
        target: 'http://localhost:5000',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api1': ''}
      },
      '/api2': {// 匹配所有以 '/api2'开头的请求路径
        target: 'http://localhost:5001',// 代理目标的基础路径
        changeOrigin: true,
        pathRewrite: {'^/api2': ''}
      }
    }
  }
}
/*
   changeOrigin设置为true时，服务器收到的请求头中的host为：localhost:5000
   changeOrigin设置为false时，服务器收到的请求头中的host为：localhost:8080
   changeOrigin默认值为true
*/
```

说明：

1. 优点：可以配置多个代理，且可以灵活的控制请求是否走代理。
2. 缺点：配置略微繁琐，请求资源时必须加前缀。

## vue的一个特殊属性：ref属性

1. 被用来给元素或子组件注册引用信息（id的替代者，即原生用id，vue用ref）
2. 应用在html标签上获取的是真实DOM元素，应用在组件标签上是组件实例对象（vc）
3. 使用方式：
    1. 打标识：```<h1 ref="xxx">.....</h1>``` 或 ```<School ref="xxx"></School>```,替代原生写法id="xxx"
    2. 获取：```this.$refs.xxx```，替代原生写法getElementById
    3. 适用于vue的组件（应用于组件间的通信）

## scoped样式

1. 作用：让样式在局部生效，防止冲突。
2. 写法：```<style scoped>```

## 总结TodoList案例

1. 组件化编码流程：

    ​	(1).拆分静态组件：组件要按照功能点拆分，命名不要与html元素冲突。

    ​	(2).实现动态组件：考虑好数据的存放位置，数据是一个组件在用，还是一些组件在用：

    ​			1).一个组件在用：放在组件自身即可。

    ​			2). 一些组件在用：放在他们共同的父组件上（<span style="color:red">状态提升</span>）。

    ​	(3).实现交互：从绑定事件开始。

2. props适用于：

    ​	(1).父组件 ==> 子组件 通信

    ​	(2).子组件 ==> 父组件 通信（要求父先给子一个函数）

3. 使用v-model时要切记：v-model绑定的值不能是props传过来的值，因为props是不可以修改的！

4. props传过来的若是对象类型的值，修改对象中的属性时Vue不会报错，但不推荐这样做。

## webStorage

1. 存储内容大小一般支持5MB左右（不同浏览器可能还不一样）

2. 浏览器端通过 Window.sessionStorage 和 Window.localStorage 属性来实现本地存储机制。

3. 相关API：

    1. ```xxxxxStorage.setItem('key', 'value');```
        				该方法接受一个键和值作为参数，会把键值对添加到存储中，如果键名存在，则更新其对应的值。

    2. ```xxxxxStorage.getItem('person');```

        ​		该方法接受一个键名作为参数，返回键名对应的值。

    3. ```xxxxxStorage.removeItem('key');```

        ​		该方法接受一个键名作为参数，并把该键名从存储中删除。

    4. ``` xxxxxStorage.clear()```

        ​		该方法会清空存储中的所有数据。

4. 备注：

    1. SessionStorage存储的内容会随着浏览器窗口关闭而消失。
    2. LocalStorage存储的内容，需要手动清除才会消失。
    3. ```xxxxxStorage.getItem(xxx)```如果xxx对应的value获取不到，那么getItem的返回值是null。
    4. ```JSON.parse(null)```的结果依然是null。

## 全局事件总线（GlobalEventBus）

1. 一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 安装全局事件总线：

   ```js
   new Vue({
   	......
   	beforeCreate() {
   		Vue.prototype.$bus = this //安装全局事件总线，$bus就是当前应用的vm
   	},
       ......
   }) 
   ```

3. 使用事件总线：

   1. 接收数据：A组件想接收数据，则在A组件中给$bus绑定自定义事件，事件的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.$bus.$on('xxxx',this.demo)
      }
      ```

   2. 提供数据：```this.$bus.$emit('xxxx',数据)```

4. 最好在beforeDestroy钩子中，用$off去解绑<span style="color:red">当前组件所用到的</span>事件。

## 消息订阅与发布（pubsub）

1.   一种组件间通信的方式，适用于<span style="color:red">任意组件间通信</span>。

2. 使用步骤：

   1. 安装pubsub：```npm i pubsub-js```

   2. 引入: ```import pubsub from 'pubsub-js'```

   3. 接收数据：A组件想接收数据，则在A组件中订阅消息，订阅的<span style="color:red">回调留在A组件自身。</span>

      ```js
      methods(){
        demo(data){......}
      }
      ......
      mounted() {
        this.pid = pubsub.subscribe('xxx',this.demo) //订阅消息
      }
      ```

   4. 提供数据：```pubsub.publish('xxx',数据)```

   5. 最好在beforeDestroy钩子中，用```PubSub.unsubscribe(pid)```去<span style="color:red">取消订阅。</span>
	
## nextTick

1. 语法：```this.$nextTick(回调函数)```
2. 作用：在下一次 DOM 更新结束后执行其指定的回调。
3. 什么时候用：当改变数据后，要基于更新后的新DOM进行某些操作时，要在nextTick所指定的回调函数中执行。

## Vue封装的过度与动画

1. 作用：在插入、更新或移除 DOM元素时，在合适的时候给元素添加样式类名。

2. 图示：<img src="https://img04.sogoucdn.com/app/a/100520146/5990c1dff7dc7a8fb3b34b4462bd0105" style="width:60%" />

3. 写法：

   1. 准备好样式：

      - 元素进入的样式：
        1. v-enter：进入的起点
        2. v-enter-active：进入过程中
        3. v-enter-to：进入的终点
      - 元素离开的样式：
        1. v-leave：离开的起点
        2. v-leave-active：离开过程中
        3. v-leave-to：离开的终点

   2. 使用```<transition>```包裹要过度的元素，并配置name属性：

      ```vue
      <transition name="hello">
      	<h1 v-show="isShow">你好啊！</h1>
      </transition>
      ```

   3. 备注：若有多个元素需要过度，则需要使用：```<transition-group>```，且每个元素都要指定```key```值。



## 插槽

1. 作用：让父组件可以向子组件指定位置插入html结构，也是一种组件间通信的方式，适用于 <strong style="color:red">父组件 ===> 子组件</strong> 。

2. 分类：默认插槽、具名插槽、作用域插槽

3. 使用方式：

   1. 默认插槽：

      ```vue
      父组件中：
              <Category>
                 <div>html结构1</div>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot>插槽默认内容...</slot>
                  </div>
              </template>
      ```

   2. 具名插槽：

      ```vue
      父组件中：
              <Category>
                  <template slot="center">
                    <div>html结构1</div>
                  </template>
      
                  <template v-slot:footer>
                     <div>html结构2</div>
                  </template>
              </Category>
      子组件中：
              <template>
                  <div>
                     <!-- 定义插槽 -->
                     <slot name="center">插槽默认内容...</slot>
                     <slot name="footer">插槽默认内容...</slot>
                  </div>
              </template>
      ```

   3. 作用域插槽：

      1. 理解：<span style="color:red">数据在组件的自身，但根据数据生成的结构需要组件的使用者来决定。</span>（games数据在Category组件中，但使用数据所遍历出来的结构由App组件决定）

      2. 具体编码：

         ```vue
         父组件中：
         		<Category>
         			<template scope="scopeData">
         				<!-- 生成的是ul列表 -->
         				<ul>
         					<li v-for="g in scopeData.games" :key="g">{{g}}</li>
         				</ul>
         			</template>
         		</Category>
         
         		<Category>
         			<template slot-scope="scopeData">
         				<!-- 生成的是h4标题 -->
         				<h4 v-for="g in scopeData.games" :key="g">{{g}}</h4>
         			</template>
         		</Category>
         子组件中：
                 <template>
                     <div>
                         <slot :games="games"></slot>
                     </div>
                 </template>
         		
                 <script>
                     export default {
                         name:'Category',
                         props:['title'],
                         //数据在子组件自身
                         data() {
                             return {
                                 games:['红色警戒','穿越火线','劲舞团','超级玛丽']
                             }
                         },
                     }
                 </script>
         ```
   ```
   
   ```

## Vuex

### 1.概念

​		在Vue中实现集中式状态（数据）管理的一个Vue插件，对vue应用中多个组件的共享状态进行集中式的管理（读/写），也是一种组件间通信的方式，且适用于任意组件间通信。

### 2.何时使用？

​		多个组件需要共享数据时

### 3.搭建vuex环境

1. 创建文件：```src/store/index.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //应用Vuex插件
   Vue.use(Vuex)
   
   //准备actions对象——响应组件中用户的动作
   const actions = {}
   //准备mutations对象——修改state中的数据
   const mutations = {}
   //准备state对象——保存具体的数据
   const state = {}
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state
   })
   ```

2. 在```main.js```中创建vm时传入```store```配置项

   ```js
   ......
   //引入store
   import store from './store'
   ......
   
   //创建vm
   new Vue({
   	el:'#app',
   	render: h => h(App),
   	store
   })
   ```

###    4.基本使用

1. 初始化数据、配置```actions```、配置```mutations```，操作文件```store.js```

   ```js
   //引入Vue核心库
   import Vue from 'vue'
   //引入Vuex
   import Vuex from 'vuex'
   //引用Vuex
   Vue.use(Vuex)
   
   const actions = {
       //响应组件中加的动作
   	jia(context,value){
   		// console.log('actions中的jia被调用了',miniStore,value)
   		context.commit('JIA',value)
   	},
   }
   
   const mutations = {
       //执行加
   	JIA(state,value){
   		// console.log('mutations中的JIA被调用了',state,value)
   		state.sum += value
   	}
   }
   
   //初始化数据
   const state = {
      sum:0
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	actions,
   	mutations,
   	state,
   })
   ```

2. 组件中读取vuex中的数据：```$store.state.sum```

3. 组件中修改vuex中的数据：```$store.dispatch('action中的方法名',数据)``` 或 ```$store.commit('mutations中的方法名',数据)```

   >  备注：若没有网络请求或其他业务逻辑，组件中也可以越过actions，即不写```dispatch```，直接编写```commit```

### 5.getters的使用

1. 概念：当state中的数据需要经过加工后再使用时，可以使用getters加工。

2. 在```store.js```中追加```getters```配置

   ```js
   ......
   
   const getters = {
   	bigSum(state){
   		return state.sum * 10
   	}
   }
   
   //创建并暴露store
   export default new Vuex.Store({
   	......
   	getters
   })
   ```

3. 组件中读取数据：```$store.getters.bigSum```

### 6.四个map方法的使用

1. <strong>mapState方法：</strong>用于帮助我们映射```state```中的数据为计算属性

   ```js
   computed: {
       //借助mapState生成计算属性：sum、school、subject（对象写法）
        ...mapState({sum:'sum',school:'school',subject:'subject'}),
            
       //借助mapState生成计算属性：sum、school、subject（数组写法）
       ...mapState(['sum','school','subject']),
   },
   ```

2. <strong>mapGetters方法：</strong>用于帮助我们映射```getters```中的数据为计算属性

   ```js
   computed: {
       //借助mapGetters生成计算属性：bigSum（对象写法）
       ...mapGetters({bigSum:'bigSum'}),
   
       //借助mapGetters生成计算属性：bigSum（数组写法）
       ...mapGetters(['bigSum'])
   },
   ```

3. <strong>mapActions方法：</strong>用于帮助我们生成与```actions```对话的方法，即：包含```$store.dispatch(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：incrementOdd、incrementWait（对象形式）
       ...mapActions({incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   
       //靠mapActions生成：incrementOdd、incrementWait（数组形式）
       ...mapActions(['jiaOdd','jiaWait'])
   }
   ```

4. <strong>mapMutations方法：</strong>用于帮助我们生成与```mutations```对话的方法，即：包含```$store.commit(xxx)```的函数

   ```js
   methods:{
       //靠mapActions生成：increment、decrement（对象形式）
       ...mapMutations({increment:'JIA',decrement:'JIAN'}),
       
       //靠mapMutations生成：JIA、JIAN（对象形式）
       ...mapMutations(['JIA','JIAN']),
   }
   ```

> 备注：mapActions与mapMutations使用时，若需要传递参数需要：在模板中绑定事件时传递好参数，否则参数是事件对象。

### 7.模块化+命名空间

1. 目的：让代码更好维护，让多种数据分类更加明确。

2. 修改```store.js```

   ```javascript
   const countAbout = {
     namespaced:true,//开启命名空间
     state:{x:1},
     mutations: { ... },
     actions: { ... },
     getters: {
       bigSum(state){
          return state.sum * 10
       }
     }
   }
   
   const personAbout = {
     namespaced:true,//开启命名空间
     state:{ ... },
     mutations: { ... },
     actions: { ... }
   }
   
   const store = new Vuex.Store({
     modules: {
       countAbout,
       personAbout
     }
   })
   ```

3. 开启命名空间后，组件中读取state数据：

   ```js
   //方式一：自己直接读取
   this.$store.state.personAbout.list
   //方式二：借助mapState读取：
   ...mapState('countAbout',['sum','school','subject']),
   ```

4. 开启命名空间后，组件中读取getters数据：

   ```js
   //方式一：自己直接读取
   this.$store.getters['personAbout/firstPersonName']
   //方式二：借助mapGetters读取：
   ...mapGetters('countAbout',['bigSum'])
   ```

5. 开启命名空间后，组件中调用dispatch

   ```js
   //方式一：自己直接dispatch
   this.$store.dispatch('personAbout/addPersonWang',person)
   //方式二：借助mapActions：
   ...mapActions('countAbout',{incrementOdd:'jiaOdd',incrementWait:'jiaWait'})
   ```

6. 开启命名空间后，组件中调用commit

   ```js
   //方式一：自己直接commit
   this.$store.commit('personAbout/ADD_PERSON',person)
   //方式二：借助mapMutations：
   ...mapMutations('countAbout',{increment:'JIA',decrement:'JIAN'}),
   ```

6. 

    

## 我的插件



复制粘贴后自动缩进![image-20211219174941093](C:/Users/13522/AppData/Roaming/Typora/typora-user-images/image-20211219174941093.png)



让vscode认识.vue文件的插件，并高亮![image-20211218155902988](C:/Users/13522/AppData/Roaming/Typora/typora-user-images/image-20211218155902988.png)

智能提示![image-20211215170324764](C:\Users\13522\AppData\Roaming\Typora\typora-user-images\image-20211215170324764.png)

## 基于Vue的PC端开源组件库：element UI

建议不要做笔记，不要死记硬背，想实现啥效果，直接去复制粘贴修改