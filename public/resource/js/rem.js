/*
 * @Author: wanghan
 * @Date: 2022-10-10 10:17:18
 * @LastEditors: wanghan
 * @LastEditTime: 2022-10-10 14:33:22
 */
let formatREM = function (doc, win) {
  var docEl = doc.documentElement,
    resizeEvt = 'orientationchange' in window ? 'orientationchange' : 'resize',
    recalc = function () {
      var clientWidth = docEl.clientWidth;
      if (!clientWidth) return;
      clientWidth <= 960 && (clientWidth = 960);
      //这里是假设在1920px宽度设计稿的情况下，1rem = 100px；
      //   如果超过1920尺寸后，保持1920比例
        clientWidth >= 1920 && (clientWidth = 1920);
      docEl.style.fontSize = 100 * (clientWidth / 1920) + 'px';
    };
  if (!doc.addEventListener) return;
  win.addEventListener(resizeEvt, recalc, !1);
  doc.addEventListener('DOMContentLoaded', recalc, !1);
};


formatREM(document, window);
