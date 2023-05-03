window.addEventListener('load', function () {
    // 1.获取元素
    var movelunboshowblock = document.querySelector('.movelunboshowblock');
    var movelunboimgs = movelunboshowblock.children[0];
    var movelunbocircles = movelunboshowblock.children[1];
    // 获得宽度
    var w = movelunboshowblock.offsetWidth;

    var index = 0; //声明变量
    // 2.利用定时器进行自动轮播

    var timer = setInterval(() => {
        index++
        var translatex = -w * index;
        movelunboimgs.style.transition = 'all .3s';
        movelunboimgs.style.transform = 'translateX(' + translatex + 'px)';
    }, 2000);
    // 监听过渡完成事件
    movelunboimgs.addEventListener('transitionend', function () {
        if (index >= 3) {
            index = 0;
            // 去掉返回时的过渡效果并返回
            movelunboimgs.style.transition = 'none';
            var translatex = -w * index;
            movelunboimgs.style.transform = 'translateX(' + translatex + 'px)';
        } else if (index < 0) {
            index = 2;
            // 去掉返回时的过渡效果并返回
            movelunboimgs.style.transition = 'none';
            var translatex = -w * index;
            movelunboimgs.style.transform = 'translateX(' + translatex + 'px)';
        }
        // 3.小圆点跟随变化
        // 移除带有类名小圆点的类名
        movelunbocircles.querySelector('.current').classList.remove('current');
        // 让当前索引号的小圆点加上类名
        movelunbocircles.children[index].classList.add('current');
        flag = true;// 节流阀改为打开状态
    })

    // 4.手指滑动轮播图
    var startX;
    var moveX;
    var flag = true;// 节流阀为打开状态
    movelunboimgs.addEventListener('touchstart', function (e) {
        // 拿到手指的初始坐标
        startX = e.targetTouches[0].pageX;
        // 清除定时器
        clearInterval(timer);
    })
    // 计算手指的滑动距离并移动图片盒子
    movelunboimgs.addEventListener('touchmove', function (e) {
        if (flag) {// 节流阀判断
            // 计算手指移动距离
            moveX = e.targetTouches[0].pageX - startX;
            // 移动盒子：盒子原来的位置 + 手指移动的距离
            var translatex = -w * index + moveX;
            // 手指拖动本就是一点点的拖 所以不需要过渡效果
            movelunboimgs.style.transition = 'none'; //取消过渡效果
            // 赋值给图片盒子
            movelunboimgs.style.transform = 'translateX(' + translatex + 'px)';
            // 阻止滚动屏幕的行为
            e.preventDefault(); // 禁止鼠标选中的意思
        }
    })
    // 手指离开后的滚动与回弹效果 并开启计时器
    movelunboimgs.addEventListener('touchend', function () {
        if (flag) {// 节流阀判断
            flag = false;// 节流阀改为关闭状态
            if (moveX > 150) {
                index--
            } else if (moveX < -150) {
                index++
            }
            var translatex = -w * index;
            movelunboimgs.style.transition = 'all .3s';
            movelunboimgs.style.transform = 'translateX(' + translatex + 'px)';
            clearInterval(timer)
            timer = setInterval(() => {
                index++
                var translatex = -w * index;
                movelunboimgs.style.transition = 'all .3s';
                movelunboimgs.style.transform = 'translateX(' + translatex + 'px)';
            }, 2000);
        }
    })
})