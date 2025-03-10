let input, slider, button, dropdown, iframe;
let yOffsets = [];

function setup() {
  createCanvas(windowWidth, windowHeight);
  input = createInput();
  input.size(200, 30); // 設定文字框的寬度和高度
  input.style('font-size', '20px'); // 設定文字框內文字的大小

  input.position(10, 10);
  input.input(updateText);

  slider = createSlider(10, 100, 32); // 創建滑桿，範圍從 10 到 100，初始值為 32
  slider.position(220, 10); // 設定滑桿的位置

  button = createButton('跳動文字');
  button.position(400, 10); // 設定按鈕的位置，往左移動
  button.style('font-size', '20px'); // 設定按鈕內文字的大小
  button.style('padding', '10px 20px'); // 設定按鈕的內邊距
  button.mousePressed(startBouncing);

  dropdown = createSelect();
  dropdown.position(550, 10); // 設定下拉選單的位置
  dropdown.option('淡江大學');
  dropdown.option('教育科技學系');
  dropdown.option('測驗卷');
  dropdown.changed(updateIframe);

  iframe = createElement('iframe');
  iframe.position(150, 150); // 設定 iframe 的位置
  iframe.size(windowWidth - 300, windowHeight - 300); // 設定 iframe 的大小

  for (let i = 0; i < 100; i++) {
    yOffsets.push(random(0, 100));
  }
}

let displayText = '淡江大學';
let bouncing = false;

function updateText() {
  displayText = this.value();
}

function startBouncing() {
  bouncing = !bouncing;
}

function updateIframe() {
  let selected = dropdown.value();
  if (selected === '淡江大學') {
    iframe.attribute('src', 'https://www.tku.edu.tw/');
  } else if (selected === '教育科技學系') {
    iframe.attribute('src', 'https://www.et.tku.edu.tw/');
  } else if (selected === '測驗卷') {
    iframe.attribute('src', 'https://mercy94326.github.io/20250310/');
  }
}

function draw() {
  background(255, 255, 204); // 設定背景顏色為淡黃色
  textAlign(LEFT, TOP);
  textSize(slider.value()); // 使用滑桿的值來設定文字大小
  let y = 0;
  let index = 0;
  while (y < height) {
    let x = 0;
    while (x < width) {
      let yOffset = bouncing ? sin(frameCount * 0.1 + yOffsets[index % yOffsets.length]) * 10 : 0;
      text(displayText, x, y + yOffset);
      x += textWidth(displayText);
      index++;
    }
    y += textAscent() + textDescent();
  }
}