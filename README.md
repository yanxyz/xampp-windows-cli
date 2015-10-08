# xampp-windows-cli

Some assistant utils for XAMPP/Windows.

It's boring that I have to go into deep and diffrent directories to config
Apache/PHP/MySql. Every time when I install or config XAMPP, I have to
repeat these boring operations. So I write this program.

## Usage

First install:

- [Node.js 4.0+](https://nodejs.org/)
- [XAMPP](https://www.apachefriends.org/download.html)

After installation is successful, run the following commands in the
command prompt:

```bat
npm install -g xampp-windows-cli
xa --help
cd /d %USERPROFILE%/.xampp
copy config-sample/config.js
rem edit config.js
xa prepare
rem here suppose 5.6 is used
cd 5.6
rem edit the config files, then run the command
xa set
```

As you can see, I have changed the mysql datadir in the "config.js",
and changed the default vhost in the "httpd-vhosts.conf", then I put
the site in the DocumentRoot of this vhost. By doing so I don't have to
backup htdocs and mysql database when uninstalling xampp.

I also use "httpd-temp.conf" to quickly set up a vhost for current
directory, see "config-sample/httpd-temp.conf" for details.

Every time after changing the vhosts/php.ini/my.ini, these modules
need to restart. This program don't directly restart them but use
"xampp-control.exe" to start Apache/MySql, because it won't open a
prompt window.

## License

MIT (c) Ivan Yan
