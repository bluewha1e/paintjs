const canvas = document.getElementById("jsCanvas");
const ctx = canvas.getContext("2d");
const colors = document.getElementsByClassName("jsColor");
const range = document.getElementById("jsRange");
const mode = document.getElementById("jsMode");
const save = document.getElementById("jsSave");

const Initial_color = "#2c2c2c";
const Canvas_size = 700;

canvas.width = Canvas_size;
canvas.height = Canvas_size;

ctx.fillStyle = "white";
ctx.fillRect(0, 0, canvas.width, canvas.height);

ctx.strokeStyle = Initial_color;
ctx.fillStyle = Initial_color;
ctx.lineWidth = 2.5;

let painting = false;
let filling = false;

function stopPainting() {
    painting = false;
}

function startPainting() {
    painting = true;
}

function handleColorClick(event) {
    const color = event.target.style.backgroundColor;
    ctx.strokeStyle = color;
    ctx. fillStyle = color;
    console.log(color);
}

function handleRangeChange(event) {
    const size = event.target.value;
    ctx.lineWidth = size;
}

function handleModeClick() {
    if(filling === true){
        filling = false;
        mode.innerText = "paint"
    } else {
        filling = true;
        mode.innerText = "fill";
    }
}

function handleCanvasClick(){
if (filling === true) {
    ctx.fillRect(0, 0, canvas.width, canvas.height);
    console.log("filled")
    }
}

function handleSaveClick(){
    const image = canvas.toDataURL("image/png");
    const link = document.createElement("a");
    link.href = image;
    link.download = "image";
    link.click();
}

function onMouseMove(event) {
    const x = event.offsetX;
    const y = event.offsetY;
if(!filling){
    if(!painting){
        ctx.beginPath();
        ctx.moveTo(x, y);
    } else {
        console.log("creating line in", x, y);
        ctx.lineTo(x, y);
        ctx.stroke();
    }
}
}

if (canvas) {
    canvas.addEventListener("mousemove", onMouseMove);
    canvas.addEventListener("mousedown", startPainting);
    canvas.addEventListener("mouseup", stopPainting);
    canvas.addEventListener("mouseleave", stopPainting);
    canvas.addEventListener("click", handleCanvasClick);
}

if(range){
    range.addEventListener("input", handleRangeChange)
}

if(mode){
    mode.addEventListener("click", handleModeClick);
}

if(save){
    save.addEventListener("click", handleSaveClick)
}

Array.from(colors).forEach(color =>
     color.addEventListener("click", handleColorClick)
);