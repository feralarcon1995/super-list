document.addEventListener("DOMContentLoaded", function () {

  const form = document.querySelector('#form');
  const taskInput = document.querySelector('#taskInput');
  const list = document.querySelector('#list');

  const tareas = [];
  // funcion que agrega una tarea a la lista
  function addTaskList(task) {
    // crear el elemento li para la lista
    const li = document.createElement('li');
    li.classList.add('animate__animated', 'animate__fadeInUp');
    // añadir la clase para dar estilos
    li.innerHTML = `<span>${task} </span>  <button class="delete-btn">Eliminar</button>`;

    // obtenemos el boton de eliminar para darle el evento que finalmente eliminara la tarea
    li.querySelector('.delete-btn').addEventListener('click', function () {
      // remover la tarea
      li.remove();
      // remover la tarea del localstorage
      removeTaks(task);
      // lanzo alerta para indicar que la tarea fue eliminada
      Swal.fire(`${task} eliminado con exito.`);
    })

    // agregar el elemento li a la lista dentro del ul
    list.appendChild(li);
  }

  // funcion para eliminar una tarea que recibe el parametro del task a eliminar
  function removeTaks(task) {
    // obtener los elementos del localstorage 
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    // filtrar el elemento que queremos eliminar para actualizar el localstorage
    const updateTasks = tasks.filter(item => item !== task);
    // actualizar el localstorage
    saveTasks(updateTasks);
  }

  // evento submit para enviar el formulario
  form.addEventListener('submit', function (event) {
    // prevenir el envio del formulario
    event.preventDefault();
    // obtener el valor del input
    const task = taskInput.value.trim();
    // si el input no esta vacio y si no existe
    if (task !== "" && !isTaskExist(task)) {
      // llamar a la funcion para agregar la tarea en nuestro localstorage
      const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
      // si hay elementos en nuestro localstorage los trae y pushea en task
      tasks.push(task);
      // lo guardamos en el localstorage con la tarea nueva
      saveTasks(tasks);
      // llamamos a la funcion para agregar la tarea a la lista y como parametro le pasamos la task
      addTaskList(task);
      // limpiar el input
      taskInput.value = "";
    } else {
      // si existe lanza alerta
      Swal.fire(`Ups, ${task} ya existe, pruebe con otro.`);
    }
  })

  // funcion para guardar las tareas en el localstorage
  function saveTasks(tasks) {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }

  // funcion para cargar las tareas del localstorage
  function loadTasks() {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];

    if (!tasks.length) {
      console.log('entro')
      const li = document.createElement('li');
      li.classList.add('animate__animated', 'animate__fadeInUp');
      // añadir la clase para dar estilos
      li.innerHTML = `<span class="center">Aun no hay elementos, agrega uno por favor.</span>`;
      list.appendChild(li);
    } else {
      // si hay elementos en nuestro localstorage los trae y pushea en nuestra lista de tareas
      tasks.forEach(addTaskList);
    }

  }

  // funcion para verificar si existe la tarea en localstorage
  function isTaskExist(task) {
    const tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    return tasks.includes(task);
  }

  // llamamos a la funcion para cargar las tareas
  loadTasks();
})