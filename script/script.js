let inputTareas = document.getElementById('inputTareas');
let listaTareas = document.getElementById('listaTareas')
let sfxAdd = new Audio("https://github.com/rd-varela/tpjava2/blob/main/sfx/Add.mp3?raw=true");
let sfxDel = new Audio("https://github.com/rd-varela/tpjava2/blob/main/sfx/Substract.mp3?raw=true")
let sfxComp = new Audio("https://github.com/rd-varela/tpjava2/blob/main/sfx/Tick.mp3?raw=true")

cargarTareas();

function agregarTarea(){
    let textoTareas = inputTareas.value.trim();
    if (textoTareas !== '') {
        let li = document.createElement('li');
        li.textContent = textoTareas;
        listaTareas.appendChild(li);
        inputTareas.value = '';
        sfxAdd.play();
        li.addEventListener('click', completarTarea);
        let deleteBtn = document.createElement('button');
        deleteBtn.textContent = '-';
        deleteBtn.addEventListener('click', borrarTarea)
        li.appendChild(deleteBtn);
        guardarTareas();
    }
}

inputTareas.addEventListener("keydown", function(event) {
    if (event.keyCode === 13) {
      agregarTarea();
    }
  });

function completarTarea(event) {
    let tarea = event.target;
    tarea.classList.toggle('completado')
    sfxComp.play();
    guardarTareas();
}

function borrarTarea(event){
    let tarea = event.target.parentElement;
    listaTareas.removeChild(tarea);
    sfxDel.play();
    guardarTareas();
}

function guardarTareas(){
    const tareas = [];
    const itemsTareas = listaTareas.getElementsByTagName('li');

    for (let i = 0; i < itemsTareas.length; i++){
        let tareaTexto = itemsTareas[i].textContent.replace('-', '').trim();
        let tareaCompletada = itemsTareas[i].classList.contains('completado');
        tareas.push({ texto: tareaTexto, completada: tareaCompletada });
    }

    localStorage.setItem('tareas', JSON.stringify(tareas));
    console.log(tareas)
    console.log(itemsTareas)
}

function cargarTareas(){
    const tareas = JSON.parse(localStorage.getItem('tareas'));
    if (tareas) {
            listaTareas.innerHTML = '';
            tareas.forEach(tarea => {
            let li = document.createElement('li');
            li.textContent = tarea.texto;
            if (tarea.completada) {
                li.classList.add('completado');
            }
            listaTareas.appendChild(li);
            li.addEventListener('click', completarTarea);

            let deleteBtn = document.createElement('button');
            deleteBtn.textContent = '-';
            deleteBtn.addEventListener('click', borrarTarea)
            li.appendChild(deleteBtn);

            guardarTareas();
            });
        }
}

clearButton.addEventListener('click', function() {
    listaTareas.innerHTML = '';
    localStorage.removeItem('tareas');
});

document.addEventListener('DOMContentLoaded', function () {
    const darkMode = document.getElementById('darkMode');
    const isDarkMode = localStorage.getItem('darkMode') === 'true';
    
    setDarkMode(isDarkMode);

    darkMode.addEventListener('click', function () {
        const darkModeEnabled = document.body.classList.toggle('darkMode');
        localStorage.setItem('darkMode', darkModeEnabled);
    });

    function setDarkMode(enableDarkMode) {
        if (enableDarkMode) {
            document.body.classList.add('darkMode');
        } else {
            document.body.classList.remove('darkMode');
        }
    }
});