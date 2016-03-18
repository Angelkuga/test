##1、本地预览配置 
css、img、js配置的路径是相对于server.js 这个文件所在目录配置的
2、scss样式编译命令  进入grunt目录   
    输入  grunt   sass:act:XX  xx对应要编译的文件名
    输入  grunt  watch:act:xx  检测文件有变化  随时编译更新内容
    输入  grunt   sass:actone:base:common  编译 公共全局调用的样式文件
    