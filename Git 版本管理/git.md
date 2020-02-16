### Git 版本管理

Git 是一个用于控制管理代码历史版本的工具，区别与集中式的 SVN，Git 使用了分布式的管理方式。Git 可以在任何时候，把文档的状态作为更新记录保存起来。
通常在团队协作中，每个人都拥有自己的一个本地代码仓库，可以对自己本地的代码进行管理。同时，团队会用一个共享的远程仓库，可以将代码版本在各个成员之间共享。

#### 1. 基本信息设置

##### 配置用户和邮箱

	git config --global user.name "<用户名>"
	git config --global user.email "<邮箱>"

##### 基础配置

1. 查看用户配置：	`git config --list`
2. 设置命令别名： `git config --global alias.co checkout` 
例：把「checkout」缩略为「co」，然后就使用「co」来执行命令。


#### 2. 基础操作

##### 初始化本地仓库
  
    git init

初始化一个本地仓库之后，工作目录下就会新增一个 `.git` 目录。

##### 克隆远程仓库

    git clone <remote address> <name>

1. `<remote address>` 是远程仓库的地址
2. `<name>` 是克隆后本地仓库的目录名称。

例：`git clone git@github.com:Vince6666/demo1.git demo`

如果已经有了一个远程仓库库，则可以不需要初始化一个本地仓库，直接克隆远程的仓库到本地，并且该仓库是和远程仓库关联的。如果你有远程仓库的权限，就可以对这个仓库 `push` 你的提交。

##### 查看仓库状态

    git status

该命令可以查看当前的仓库（代码分支）的状态。

##### 提交文件修改的历史记录

当我们在本地仓库进行修改之后，就要将我们的修改作为代码的一个历史版本进行提交：

    git add <file_name>

执行该命令之后，文件就会被添加到 git 仓库的暂存区（stage）中。  

使用 `git add .` 可以直接将当前目录下的修改全部添加到暂存区中，一般情况下会很方便。  

添加到暂存区的文件，还需要再提交到本地仓库中：

    git commit -m '本次提交说明'

这样就将我们的修改提交到本地仓库中，生成一条历史记录。

![Alt text](/images/提交过程.png "git 提交过程")

###### 使用 vim 编辑提交说明

如果在提交时不带 `-m` 参数，而是输入 `git commit` 直接回车，则会进入到 vim 编辑器的界面，默认使用 vim 编辑器进行提交信息的编写。  

1. `#` 开头的是注释
2. 按 `i` 进入插入模式，可以编辑信息；按 `Esc` 退出插入模式，回到普通模式
3. 按 `:` 进入命令模式。常见命令： 

		:q 	退出
		:q! 	强制退出，不进行保存
		:wq	保存并退出
		:wq! 	强制保存并退出

##### 添加远程仓库地址

如果你的本地仓库是自己通过 `git init` 命令创建的（不是克隆下来的），并且你想要将它放到一个远程仓库上，与团队其他成员共享，就需要为本地仓库添加远程仓库连接，也就是说将本地仓库的历史版本库放到远程仓库中保存，与远程仓库关联。

	git remote add <name> <remote address>

1. `<name>` 是远程仓库的名称，默认是 `origin`
2. `<remote address>` 是远程仓库地址

例如： `git remote add origin https://github.com/Vince6666/demo.git`
或者： `git remote add origin git@github.com:Vince6666/demo1.git`

使用 `git remote add` 命令为本地仓库添加一个远程仓库地址，地址可以是 `http/https` 格式的也可以是 `ssh` 格式的。

##### 将本地仓库的提交记录推送到远程仓库

为了将本地数据库的修改记录共享到远程数据库，必须上传本地数据库中存储的修改记录。
执行 `Push` 之后，本地的修改记录会被上传到远程数据库。所以远程数据库的修改记录就会和本地数据库的修改记录保持同步。

	git push -u origin master

执行该命令可以向远程仓库 `origin` 进行推送。如果指定了 `-u` 选项，那么下一次推送就可以省略分支名称了。_**但是在首次执行命令向空的远程仓库推送时，必须指定远程仓库和分支名称。**_

##### 拉取并合并其他修改

进行拉取(Pull) 操作，就是从远程数据库下载最近的变更日志，并覆盖自己本地数据库的相关内容。当团队其他成员对该分支上的代码进行了修改并且已经 push 到远程仓库后，你可以将他的提交拉取到本地并且将他的提交进行合并自己本地仓库上。

	git pull <name> <branch>

第一次拉取远程仓库的修改的时候，由于本地分支与远程分支还没有建立起关联关系，所以需要指定远程仓库和分支名称。 

例如： `git pull origin master`

之后进行拉取操作时，可直接执行 `git pull` 命令，这样，本地仓库就会获取到其他成员提交的代码修改。

##### 整合修改记录

在团队成员进行同时开发时，很可能你的某一次 `push` 操作会被拒绝，这是因为你们同处在一个代码版本下，在你进行 `push` 之前，已经有其他成员进行 `push` 了，这时你再进行 `push`，就会出现下面的错误提示：

```
$ git push
To github.com:Vince6666/demo1.git
 ! [rejected]        master -> master (fetch first)
error: failed to push some refs to 'git@github.com:Vince6666/demo1.git'
hint: Updates were rejected because the remote contains work that you do
hint: not have locally. This is usually caused by another repository pushing
hint: to the same ref. You may want to first integrate the remote changes
hint: (e.g., 'git pull ...') before pushing again.
hint: See the 'Note about fast-forwards' in 'git push --help' for details.
```

这种情况下，你需要先执行 `git pull` 命令，将远程的提交拉取下来并合并到本地分支。然后再进行 `push` 操作。

**但是**，有时候我们执行 `git pull` 操作之后，可能会出现无法自动合并的情况。_**这是因为远程仓库和本地仓库的同一个地方都发生了修改，无法自动判断要选用哪一个修改，所以就会发生冲突。**_

这是 git 会在发生冲突的地方修改文件的内容，如下所示，需要我们手动修正冲突：
```
// 一些其他内容...
// 一些其他内容...

<<<<<<<< HEAD
// 本地修改的内容...
=======================
// 远程仓库的内容...
>>>>>>>> 3a23b640265efb45cfee715865221bd2ae3c9c29

// 一些其他内容...
// 一些其他内容...
```
发生冲突的部分会用 `<<<<< HEAD` 和 `>>>>> commit的Hash值` 包围起来，其中，`========` 是本地修改的内容与远程仓库的内容分隔线。
这部分的冲突需要自己手动修正，修正后将 `<<<`等标志删掉之后，就可以进行 `push` 推送了。

##### 查看提交历史记录

	git log

执行该命令可以查看历史提交记录，每个提交记录都会有一个 `hash`，另外还有作者、日期和提交说明：
```
commit fe62a495d26d3751409a8fd0a7969752b71171ec
Author: Vince6666 <13257688007@163.com>
Date:   Sat Feb 15 21:26:58 2020 +0800

    first commit
```

