/* 该文件用来压缩ttf体积，剔除没用到的文字字体
为避免install时包太大，已将fontmin从package.json中删除
如果需要修改用到的三维文字，请务必先安装fontmin，然后修改下方text的文字，最后运行次脚本
*/
const Fontmin = require("fontmin");

const fontmin = new Fontmin()
  .src("./public/assets/FangZhengHeiTiJianTi-1.ttf")
  .dest("./public/assets/minTFF/")
  .use(
    Fontmin.glyph({
      text: "GIS1024.COM 专业技术分享 技术联播",
    })
  );

fontmin.run((err) => {
  if (err) {
    console.log(err);
  } else console.log("压缩成功");
});
