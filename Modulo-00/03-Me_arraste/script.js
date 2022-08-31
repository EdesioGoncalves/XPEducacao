var caixa = document.getElementById("caixa");
var cx;
var cy;

// Função que receberá 2 argumentos para posicinar o caixa
function setPos(x, y) {
  caixa.style.left = x + "px";
  caixa.style.top = y + "px";
}

// Obtém evento ao clicar no mouse
caixa.addEventListener("mousedown", iniciaArraste);
// Obtém evento ao soltar o mouse
document.addEventListener("mouseup", terminaArraste);

// Função para iniciar o arraste do mouse
function iniciaArraste(e) {
  cx = e.clientX - pxParaNum(caixa.style.left);
  cy = e.clientY - pxParaNum(caixa.style.top);
  caixa.classList.add("arrastando");
  document.addEventListener("mousemove", arrasta);
}

// Função que termina o arraste do mouse
function terminaArraste(e) {
  caixa.classList.remove("arrastando");
  document.removeEventListener("mousemove", arrasta);
}

function arrasta(e) {
  var x = e.clientX;
  var y = e.clientY;
  setPos(x - cx, y - cy)
}

function pxParaNum(e) {
  return +(e.replace("px", ""));
}