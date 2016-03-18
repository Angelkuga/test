# [cms-h5](https://gitlab.yuangongbao.com/frontend/cms-h5)

cms-h5活动

## Installation

* cd grunt目录
* npm install
* npm start 启动devServer


## Features

  * 支持ES6
  * 提供devServer，开发时，自动合并html，css，js
  * MockApi页面开发调试
  * grunt打包
  


## 开发一个cms-h5活动

  * 创建活动目录：cd grunt目录，运行 `grunt gen:actName ` (将会自动创建cms所需文件)

  * 也可手动创建，如下：
  
 1. 在src目录，新建一个目录，命名为活动名称，比如：signinv2。

 2. 在signinv2目录中，建开发文件：signinv2.html,signinv2.js , mockApi.js（模拟接口），refactor\signinv2.html,refactor\signinv2.scss, refactor\signinv2.js，refactor\images。其中`refactor`目录供重构使用。

 3. html文件中，可使用Lizard模板。比如：
```html
<div>html cotent</div>
</script>
<script  id="nearTpl" type="text/lizard-template">
    <p>客户<span><%-data.mobile%></span>于<%-data.time%>获得
```
    
 4. js文件中，可使用ES6。

 5. 启动devServer 
 	* 开发时，访问[http://localhost:80/page/act?_id=signinv2 ] 修改html，css，js 文件后，刷新页面即可。
	* 重构时，访问[http://localhost:80/page/act?_id=signinv2&devtype=refactor ]

* 注
	* 依赖的框架资源地址，配置见dev.config.js中`useLocalFramework`:true。建议使用true访问本地资源（CDN不可用的情况下），false则访问CDN生产地址。
	* 图片路径前缀替换。当需要切换html，css，js中图片路径前缀时，使用queryString参数`devimgpath`={oldPrefix}|{newPrefix}，即可替换。
	比如：图片路径已经替换为CDN路径，但由于网络原因等，需要从本地访问图片，则访问：http://localhost/page/act?_id=signinv2&devtype=refactor&devimgpath=https://dn-ygbimg.qbox.me/acts/act_20151228_6/|images/ 。


## 开发模拟接口调试

1.调试本地接口，修改 `dev.config.js`中apiDomainUrl为自己开发机域名，如：`http://tsy.h.caifupai.com` 。

2.在活动目录中，比如:threeBillion 下，新建 mockApi.js文件，如下：

```js
{
	"enable":true,//全局是否启用模拟接口测试
	"threeBillionWinnerList":{
		enable:false,
		response:function(req){//返回模拟数据
			var actName = req.headers['actname'];
			var testid = req.query.testid + req.headers['type'];
			return {"retCode":0,"retMsg":"","retData":{"parList":[{"mobile":"000 mocking 000"+actName+","+testid,"redPackAmount":"100","couponValue":"0","time":"4\u5206\u949f\u524d"},{"mobile":"153 **** 4089","redPackAmount":"1","couponValue":"0","time":"7\u5206\u949f\u524d"}]},"retHtml":""};
		}
	},
	"threeBillionCard":{
		enable:true,//启用
		response:function(req){
			
			return {"retCode":0,"retMsg":"","retData":{"chanceSelf":100,"chanceInvite":90},"retHtml":""};
		}
	},
	"apiName":{
		enable:true,
		response:function(req){
			var testid = req.query.testid;
		}
	}
}

```

*`注：模拟接口为actApi目录下的接口。做页面UI数据调试使用。当需要调试本地接口时，将全局enable：false，此时本地接口需开启cors`

3. 手机调试，连接自己或同事电脑开的wifi，将localhost换成本机ip。比如：http://10.4.54.123/page/act?_id=signinv2

## common目录、codeTemplate目录说明

1. common目录： 
	*  common.js存放活动的公共代码，比如：screenUtil 。会自动添加在[actName].js的文件头部。
	*  scss目录，由重构使用，放置公共scss。
2. codeTemplate目录：活动目录的代码模板，供grunt gen:actName使用


## 打生产包

1. cd grunt目录，运行 grunt act:actName 如：grunt act:threeBillion

2. 将dist\threeBillion 中 html，css，threeBillion.min.js copy到生产cms中。（其中threeBillion_es5.js为转译ES5的源文件）

## 提测
* 测试人员，直接从git的cms-h5仓库，从`dist`中找到活动目录，copy css，html，XXX_es5.js 到测试环境的cms中。


## 重构

1. common\scss目录存放公共的scss，比如：登录浮层css，登录浮层-图形验证码css，showLoading样式，等。

2. 重构时，在[actName]目录下的refactor目录中，编写html，scss，js，images。调试访问：[http://localhost:80/page/act?_id=signinv2&devtype=refactor].

3. 重构-开发scss使用 `grunt watch:act:actName`   编译最终css，使用 `grunt sass:act:actName`

4. 重构调试完成后。
	* 上传活动图片到cdn，替换html,scss中图片的url地址。
	* 活动分享的图片，命名为cms_share.png 放在images中，由开发或重构，上传到cms管理后台的分享图片字段。

5. 完成后，提交代码并告知开发。