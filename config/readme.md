# xampp-windows-cli

## 安装

事先安装

- [Node.js 8.9.0+](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/download.html)

```sh
git clone https://github.com/yanxyz/xampp-windows-cli
yarn
npm link
xa -h
```

自定义配置文件放在 `{repo}/config/user` 目录下。
它们若存在，则读取它们，不读取默认配置文件，注意不会和默认配置合并。

## vhosts

### 如何创建 vhost？

以 a.com 为例说明。

第一步，`xa hosts` 编辑 hosts，添加

```
127.0.0.1	a.com	www.a.com
```

第二步，`xa setup a`，创建 vhost

vhosts 的配置本来是添加到 `apache/conf/extra/httpd-vhosts.conf` 内。
xa 为了方便管理，在 `config.sitesEnabled` 目录下为每个域名创建一个 conf 文件。
若需要，可以用 `xa edit a` 修改 conf。

第三步，`xa start`，启动或重启 Apache

### vhosts 如何支持 https？

首先[制作证书](https://yanxyz.github.io/note/software/xampp/apache/vhosts/#ssl)

然后创建 vhost，步骤和上面差不多。第二步，

- `xa setup a --ssl`，指定 vhost 使用 https。
- `xa setup a --both`，指定 vhost 使用 http 和 https。
