#!/usr/bin/env node

const ffmpeg = require("fluent-ffmpeg");
const path = require("path");
const program = require("commander");

const ora = require("ora");

const pack = require("./package.json");
const clean = require("./src/utils/clean");
const screenshots = require("./src/utils/screenshots");
const spriteImage = require("./src/utils/spriteImage");
const moveImage = require("./src/utils/moveImage");
const config = require('./src/utils/config')


ffmpeg.setFfmpegPath(path.join(__dirname, "/ffmpeg/bin/ffmpeg.exe"));
ffmpeg.setFfprobePath(path.join(__dirname, "/ffmpeg/bin/ffprobe.exe"));


async function start(data) {
  const spinner = ora("开始截取视频截图").start();
  try {
    await clean(config.tempDir);
    await screenshots(data);
    spinner.text = "开始合成精灵图";
    await spriteImage(data);
    await moveImage(data);
    await clean(config.tempDir);
    spinner.text = "视频缩略图生成成功";
    spinner.succeed();
  } catch (error) {
    console.log(error);
    spinner.text = "视频缩略图生成失败";
    spinner.fail();
  }
}

program
  .version(pack.version)
  .usage("[options] <file>")
  .option(
    "--output <path>",
    "输出的图片名称，默认 screenshot.png",
    "./screenshot.png"
  )
  .option("--input <path>", "视频路径")
  .option("--quality <n>", "图片质量，默认 60", 60)
  .option("--count <n>", "图片数量，默认 100", 100)
  .description("视频截图工具")
  .action((data) => {
    console.log(data);
    if (!data.input) {
      console.error("获取不到视频,请检查参数");
      return;
    }
    start(data);
  });

program.parse(process.argv);
