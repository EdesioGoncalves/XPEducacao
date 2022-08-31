// Obtém todos os fieldset que tiver na aplicação
var fslist = document.querySelectorAll('.multiple-field');
for (var i = 0; i < fslist.length; i++) {
  initMultipleFieldSet(fslist[i]);
}

function initMultipleFieldSet(fs) {
  // Cria um botão dinamicamente
  var addButton = document.createElement("button");
  addButton.textContent = "Adicionar";
  addButton.type = "button";

  // Gera o botão na tela
  fs.appendChild(addButton);

  var firstInput = fs.querySelector("input");

  addButton.addEventListener("click", function () {
    var div = document.createElement("div");
    var newInput = document.createElement("input");
    newInput.name = firstInput.name;
    newInput.type = firstInput.type;

    var deleteButton = document.createElement("button");
    deleteButton.textContent = "Excluir";
    deleteButton.type = "button";

    // Cria um input e um button
    div.appendChild(newInput);
    div.appendChild(deleteButton);

    // Remove o elemento selecionado com arrow function
    deleteButton.addEventListener("click", () => div.remove());


    fs.insertBefore(div, addButton);
  });
}