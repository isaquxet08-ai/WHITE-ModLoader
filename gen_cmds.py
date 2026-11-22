import os
BASH_DIR = "./game/api/bash"
if not os.path.exists(BASH_DIR): os.makedirs(BASH_DIR)
cmds = {"ls":"列出目录","cat":"查看文件","pwd":"当前目录","df":"磁盘空间","uname":"系统信息","free":"内存状态","ps":"进程","grep":"搜索","find":"查找","stat":"状态","head":"头部","tail":"尾部","mkdir":"建目录","cp":"复制","echo":"打印"}
t = "// 自动生成: {c}.js\n(function() {{ if (!window.WHITE_API || !window.WHITE_API.console) return; WHITE_API.console.registerCommand('{c}', '{d}', function(a) {{ WHITE_API.console.runShell('{c} ' + a.join(' ')); }}); }})();"
for c, d in cmds.items():
    with open(os.path.join(BASH_DIR, f"{c}.js"), "w") as f: f.write(t.format(c=c, d=d))
print("🎉 Linux 命令生成完毕")
