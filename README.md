# openai-starter
simple starter for openai.

# 这两个代码都是openai生成给我的，我也不会优化，暂时使用足够，后期看情况更新。

example-local.html
文件是本地有网络即可运行，对接的是openai的api，不建议放到网络环境，因为源代码都是暴露的，很容易泄露apikey。

worker.js
需要注册cloudflare账户，启用免费的worker即可。访问路径https://你的worker路径.worker.dev/?pwd=password
