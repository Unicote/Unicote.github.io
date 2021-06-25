---
title: "Setting up a working environment for build"
date: 2021-05-13T15:58:00+03:00
---
- ⚠️ Note: I am using ubuntu 20.04. This manual is suitable for ubuntu 20.04, performance on other OC/versions is unknown.

## Installing & updating packages
- To begin with, we will update the existing packages in the system:
```bash
sudo apt-get update && sudo apt-get dist-upgrade
```
- Now we will install the packages we need, which are not present by default in the system:
```bash
sudo apt-get install git-core gnupg flex bison gperf build-essential zip curl zlib1g-dev gcc-multilib g++-multilib libc6-dev-i386 lib32ncurses5-dev x11proto-core-dev libx11-dev lib32z-dev libgl1-mesa-dev libxml2-utils xsltproc unzip bc ccache git imagemagick lib32readline-dev lib32z1-dev liblz4-tool pngquant libncurses5 libncurses5-dev libsdl1.2-dev libssl-dev libxml2 lzop pngcrush rsync schedtool squashfs-tools openjdk-8-jdk p7zip-full meld brotli qt5-qmake android-tools-adb android-tools-fastboot python3-networkx python3-pip texinfo maven swapspace m4
```

### CCache
- Let's set the ccache size. In the future, ccache will help you significantly speed up your build time. You can learn more about this technology [here](https://en.wikipedia.org/wiki/Cache_(computing))
```bash
ccache -M 50G
```
- Open bashrc to execute some commands at startup. They will be executed every time the terminal is opened.
```bash
sudo nano ~/.bashrc
```
- Add these lines to the end:
```bash
export USE_CCACHE=1
export PATH=~/bin:$PATH
```
- Close bashrc with ctrl+x and then ctrl+y
- Next, write in the terminal:
```bash
source ~/.bashrc
```

## Use python3
- Making python 3 by default (optional)
```bash
sudo ln -sf python3 /usr/bin/python
```

## Git
- Our computer doesn't know who I am in git. Let's help him solve this riddle by using this command
```bash
git config --global user.name "name" && git config --global user.email email@example.com
```
- Don't forget to change these parameters to your own:
- your_name-Username, nickname in git
- email@example.com -account email on git

## repo
- To sync the sources, we need a repo. Let's install it right from https://storage.googleapis.com/git-repo-downloads/repo
```bash
mkdir ~/bin && PATH=~/bin:$PATH && curl https://storage.googleapis.com/git-repo-downloads/repo > ~/bin/repo && chmod a+x ~/bin/repo
```
- Well, now you can sync the repo
