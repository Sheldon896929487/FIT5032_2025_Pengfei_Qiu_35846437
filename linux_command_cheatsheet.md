# Linux 常用命令速查表（中英文对照）

| 中文说明 | 英文命令 | 说明（英文） |
|----------|-----------|--------------|
| 列出目录内容 | ls | List directory contents |
| 详细列表显示 | ls -l | List with details |
| 显示所有文件（含隐藏） | ls -a | Show all files (including hidden) |
| 切换目录 | cd 目录 | Change directory |
| 显示当前路径 | pwd | Print working directory |
| 创建新目录 | mkdir 目录 | Make new directory |
| 删除空目录 | rmdir 目录 | Remove empty directory |
| 删除文件 | rm 文件 | Remove file |
| 递归删除目录及内容 | rm -r 目录 | Recursively remove directory and contents |
| 复制文件/目录 | cp 源 目标 | Copy file/directory |
| 递归复制目录 | cp -r 源 目标 | Recursively copy directory |
| 移动/重命名文件或目录 | mv 源 目标 | Move/rename file or directory |
| 创建空文件/更新时间 | touch 文件 | Create empty file or update timestamp |
| 查看文件内容 | cat 文件 | View file content |
| 分页显示文件内容 | more 文件 | View file content page by page |
| 分页显示（可上下翻页） | less 文件 | View file content with navigation |
| 查看文件前10行 | head 文件 | View first 10 lines of file |
| 查看文件后10行 | tail 文件 | View last 10 lines of file |
| 实时查看文件追加内容 | tail -f 文件 | View file content in real time |
| 按名称查找文件 | find 路径 -name "文件名" | Find files by name |
| 在文件中查找内容 | grep "内容" 文件 | Search content in file |
| 递归查找目录下内容 | grep -r "内容" 目录 | Recursively search content in directory |
| 快速查找文件 | locate 文件名 | Quickly locate files |
| 查看命令路径 | which 命令 | Show command path |
| 查找命令相关文件 | whereis 命令 | Locate command files |
| 修改文件权限 | chmod 权限 文件 | Change file permissions |
| 修改文件所有者和组 | chown 用户:组 文件 | Change file owner and group |
| 查看/设置默认权限掩码 | umask | View/set default permission mask |
| 查看当前进程 | ps | Show current processes |
| 查看所有进程 | ps aux | Show all processes |
| 动态显示进程状态 | top | Show dynamic process status |
| 更友好的进程查看 | htop | Friendlier process viewer (need install) |
| 终止进程 | kill 进程号 | Terminate process |
| 强制终止进程 | kill -9 进程号 | Force terminate process |
| 按名称终止进程 | pkill 进程名 | Terminate process by name |
| 查看磁盘空间 | df -h | Show disk space |
| 查看目录大小 | du -sh 目录 | Show directory size |
| 查看内存使用 | free -h | Show memory usage |
| 查看系统运行时间 | uptime | Show system uptime |
| 查看系统信息 | uname -a | Show system information |
| 查看当前登录用户 | who | Show logged-in users |
| 查看历史命令 | history | Show command history |
| 查看/配置网络接口 | ifconfig | View/configure network interfaces |
| 查看网络接口信息 | ip a | Show network interface info |
| 测试网络连通性 | ping 地址 | Test network connectivity |
| 查看端口占用 | netstat -tuln | Show port usage |
| 查看端口（更现代） | ss -tuln | Show ports (modern) |
| 获取网页内容 | curl 地址 | Fetch web content |
| 下载文件 | wget 地址 | Download file |
| 远程文件拷贝 | scp 源 目标 | Remote file copy |
| 远程登录 | ssh 用户@主机 | Remote login |
| 打包压缩 | tar -czvf 文件.tar.gz 目录 | Compress files/directories |
| 解压 | tar -xzvf 文件.tar.gz | Extract files |
| 压缩为zip | zip 文件.zip 文件/目录 | Compress to zip |
| 解压zip | unzip 文件.zip | Extract zip file |
| 更新软件源 | apt update | Update package sources |
| 升级已安装软件 | apt upgrade | Upgrade installed packages |
| 安装软件包 | apt install 包名 | Install package |
| 卸载软件包 | apt remove 包名 | Remove package |
| 搜索软件包 | apt search 关键字 | Search for package |
| 查看命令手册 | man 命令 | Show manual page |
| 输出内容 | echo 内容 | Output content |
| 显示日期时间 | date | Show date and time |
| 显示日历 | cal | Show calendar |
| 重启系统 | reboot | Reboot system |
| 立即关机 | shutdown now | Shutdown immediately |
| 终止当前命令 | Ctrl + C | Terminate current command |
| 挂起当前命令 | Ctrl + Z | Suspend current command |
| 退出终端 | Ctrl + D | Exit terminal |
| 自动补全 | Tab | Auto-complete |
| 历史命令切换 | ↑/↓ | Switch history commands | 