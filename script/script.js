let inputTareas = document.getElementById('inputTareas');
let listaTareas = document.getElementById('listaTareas')
let sfxAdd = new Audio("https://github.com/rd-varela/tpjava2/blob/main/sfx/Add.mp3?raw=true");
let sfxDel = new Audio("https://github.com/rd-varela/tpjava2/blob/main/sfx/Substract.mp3?raw=true")
let sfxComp = new Audio("https://github.com/rd-varela/tpjava2/blob/main/sfx/Tick.mp3?raw=true")
let sfxClear = new Audio("https://github.com/rd-varela/tpjava2/blob/main/sfx/Clear.mp3?raw=true")
let isMuted = false;

if (localStorage.getItem('isMuted')) {
    isMuted = localStorage.getItem('isMuted') === 'true';
    updateMuteButton();
}

document.getElementById('muteBtn').addEventListener('click', function() {
    isMuted = !isMuted;
    updateMuteButton();
    

    localStorage.setItem('isMuted', isMuted);
});

function updateMuteButton() {
    const muteBtn = document.getElementById('muteBtn');
    if (isMuted) {
        muteBtn.classList.add('muted');
    } else {
        muteBtn.classList.remove('muted');
    }
}

function playSound(audio) {
    if (!isMuted) {
        audio.play();
    }
}

cargarTareas();

function agregarTarea(){
    let textoTareas = inputTareas.value.trim();
    if (textoTareas !== '') {
        let li = document.createElement('li');
        li.textContent = textoTareas;
        listaTareas.appendChild(li);
        inputTareas.value = '';
        playSound(sfxAdd);
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
    playSound(sfxComp);
    guardarTareas();
}

function borrarTarea(event){
    let tarea = event.target.parentElement;
    listaTareas.removeChild(tarea);
    playSound(sfxDel);
    guardarTareas();
}

clearButton.addEventListener('click', function() {
    listaTareas.innerHTML = '';
    playSound(sfxClear);
    localStorage.removeItem('tareas');
});

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