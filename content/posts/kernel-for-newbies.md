---
title: "Kernel For Newbies"
date: 2020-07-07T12:29:41+08:00
---

Lets gear up with the necessary things.
You would usually need a minimum of a dual core PC, some odd 4GB ram, and atleast 10GB disk free space.
If you don’t match the specs, don’t worry, we can workaround it.
And then, you need Linux installed, doesn’t matter any distro, just grab up probably the latest ubuntu/openSUSE/fedora/Arch or whatever that suits you. Kernels can be compiled on literally any distro. They don’t need much of dependencies. For deps, just check out akhilnarang/scripts

Lets jump into the what it is to compile a kernel. So, you have seen a developer sending fancy kernel zips for you, you wanna make your own kernel, with your name stamped on it? Well, that’s too easy than you think. 

A bit of terminologies………

Since we aren’t compiling a phone kernel inside a phone, you need a cross-compiler.

__What is cross compiler now?__
A cross compiler is a compiler capable of creating executable code for a platform other than the one on which the compiler is running. For example, a compiler that runs on a Linux amd64 but generates code that runs on Android smartphone (aarch64) is a cross compiler.

__What is aarch64?__

That’s the common architecture for all android smartphones today. Well, there is an aarch32 but, that’s too old to be considered in current age.

**So, where do I get a damn cross-compiler, I googled, I cant find it.**

https://developer.arm.com/tools-and-software/open-source-software/developer-tools/gnu-toolchain/gnu-a/downloads

Go to this link, and grab the toolchain AArch64 GNU/Linux target and is x86_64 host.
Just use some common sense, they are right there visible on that site. They are updated regularly, so be sure to check them out once in a while.

Ok, I have the toolchains, what more?
Can I compile?

Oh yes, you can almost compile now, did you clone the sources?
Probably look at your OEM code or someone’s code you wanna compile. Clone the sources fully with git. 

Next steps, just few path changes, and finally we can hit the compile

> **A toolchain prefix is what all files on that dir start with. Like `aarch64-linux-gnu-***` The first part will remain almost constant. Remember the hyphen. You need to add it.**

Cd to the directory where you have the cross-compiler, and then run this.

`export CROSS_COMPILE=$(pwd)/bin/<toolchain_prefix>-`

Since you aren’t building a kernel for your PC, tell that to the kernel buildsystem
export ARCH=arm64 && export SUBARCH=arm64
This tells that you are building for arm64 architecture.

Find the defconfig to build.
> **The defconfig is, in simple terms, a file containing a lot of switches and configurations that your kernel build will read and work out the binary. If you donno anything, better don’t mess with it.**

All the defconfigs are located at arch/arm64/configs/xxxxx_defconfig
You need to find which defconfig your OEM/the other person used. Use your common sense again.

Next:
The glorious make.

`make O=out <defconfig_name>`

and then
`make O=out -j$(nproc)`

Wait for a while, it takes around 1min-1hr depending on your system specs.
If those commands succeed, you will have an Image, Image-dtb, Image.gz, or Image.gz-dtb file at the end. They will be usually at `out/arch/arm64/boot/Image.gz-dtb` or accordingly.

Assuming you were able to compile the kernel successfully, you now need to flash it!

How do I make a dtb into zip? Rename?
No! That’s not how you do it.
Add this dtb file to the root dir of the cloned anykernel3
https://github.com/osm0sis/anykernel3
Get to the anykernel.sh and use a bit of common sense. That’s all. Your flashable zip must be ready.

What’s next:

**Upstreaming CAF:**

If your device has a qualcomm snapdragon processor, then sure it has CAF support. CAF is known for improving performance and other stuff with their patches.

__What all can you grab?__

Generally people grab QCACLD-3.0 and Techpack. You may also merge their own kernel repos. It contains a bit more latest patches than what your OEM would have shipped.

__How should I merge?__
Merging CAF requires tags. They aren’t normal repos with branches. They are tagged so that you can fetch a specific tag at any point. 
Lets say your processor is Snapdragon 660. Look up for its codename(google), its sdm660.
If you wanna know the latest tag for your processor checkout this link: https://t.me/CAFReleases
Just use telegram’s search button and search for your processor.

Mind it these are all tagged with android versions. If you use a kernel that’s Pie and merge a CAF tag of android 10, you might be ending with 420 conflicts, not kidding.

- You need to get some patience looking for your tag, as usual
- Get here, https://source.codeaurora.org/quic/la/
- You will find kernel/msm-4.4, 4.9, 4.14 and a bunch others
- According to whats yours, copy that link
- Then its a usual git merge!
- git pull https://source.codeaurora.org/quic/la/kernel/msm-4.14/ {YOUR TAG}
- And boom! Again conflicts! Again resolution!


**QCACLD Upstreaming**

Just look out which android is your OEM/other developer using it on. Because Pie tags can work on 10 while the other way round wont. 
You found the tag name, so get to your terminal and follow a few steps.

From LKN chat in telegram,
Initial merge:
```bash
git remote add qcacld-3.0 https://source.codeaurora.org/quic/la/platform/vendor/qcom-opensource/wlan/qcacld-3.0
git fetch qcacld-3.0 <TAG>
git merge -s ours --no-commit --allow-unrelated-histories FETCH_HEAD
git read-tree --prefix=drivers/staging/qcacld-3.0 -u FETCH_HEAD
git commit
```

**Updating to a newer tag**:
```bash
git fetch qcacld-3.0 <TAG>
git merge -X subtree=drivers/staging/qcacld-3.0 FETCH_HEAD --allow-unrelated-histories
```
Repeat the above for 
qca-wifi-host-cmn and fw-api as well.
- qcacld-3.0 source: https://source.codeaurora.org/quic/la/platform/vendor/qcom-opensource/wlan/qcacld-3.0
- fw-api source: https://source.codeaurora.org/quic/la/platform/vendor/qcom-opensource/wlan/fw-api
- qca-wifi-host-cmn source: https://source.codeaurora.org/quic/la/platform/vendor/qcom-opensource/wlan/qca-wifi-host-cmn

If you happen to have some merge conflicts, just understand its some bunch of C code, you can understand the logic and figure it out.

Well, techpack of 4.14 too follows similar scheme as you did for the qcacld.
The repos you need to lookout for are audio-kernel and data-kernel

__**Linux Upstream**__

__Why upstream?__:

Upstreaming Linux helps you patch some critical vulnerabilities that might have been spotted after the kernel was released.
The point releases like 4.14.170, 171, indicate some vulnerability or performance or maybe even some driver fixes.
They dont usually add major changes.

__How to upstream?__:
Linux upstream can be done from 2 different places as of now.
- https://git.kernel.org/pub/scm/linux/kernel/git/stable/linux.git
- https://android.googlesource.com/kernel/common/+refs
- https://github.com/android-linux-stable/

__What is the diff?__
Kernel/common is done by the same person who deals with merges on kernel.org git.
Its adapted for android, if you want the bleeding edge patches working perfectly on android you need to head right here.


__Android-Linux-Stable:__

This has both CAF patches and Linux stable merged. It’s a sweet spot for laziness. Go checkout their readme for more: https://github.com/android-linux-stable/notes/tree/master/trees

Merging any of these is bound to introduce a git conflict. Have fun resolving them.

__Upstreaming your kernel with ASB:__

What's android security patch doing in kernels?

- Well, Google releases security patches every month, and we know that, there's nothing new about it.
But they also fix some vulnerabilities they found on their Pixel Kernel. You can merge them up, showing off to your users that
security is maxxed (Bootloader unlocked, so nothing is safe)

- So lets get started.

- Go to Google kernel/common, if you forgot/donno what it is. Its here https://android.googlesource.com/kernel/common/
- Browse its tags, not branches!
- Look for the ASB-2020-01-05-{kernel-version}-{android-version}
- By android version, it means your kernel's base android version.
- Dont randomly pick an android q patch over android p kernel base. Thats not gonna work!
- Now for merging the tag!
- git pull https://android.googlesource.com/kernel/common/ {your tag you discovered}
- Its gonna throw a real bunch of conflicts, use some C knowledge and common sense to resolve them.

**Building with Clang:**

Clang is an LLVM C/C++/Objective-C compiler, which means, its basically just another C compiler. But whats so special about clang? Its faster!
When you compile 1million files, a bump of few ms on each file, bumps the whole process by minutes.

__Can every kernel build on clang?__
Yes, as long as your kernel is above 3.18
Do I need to do something to make it support?
Grab a clang-patchset from https://github.com/nathanchance/android-kernel-clang
Checkout the branches and decide which one you need.

4.14 and above natively support clang. You don’t need to mess with your source.

Have fun hacking!
