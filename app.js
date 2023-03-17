import colors from 'colors'
import { inquirerMenu, pausa, leerInput, listDeleteTask, confirmation, checkTasks } from './helpers/inquirer.js'
import { readDB, saveFile } from './helpers/interactionsDB.js';
import { Tareas } from './models/tareas.js';


const main = async() => {

    console.clear()

    let opt = '';
    const tareas = new Tareas()

    const tareasDB = readDB()

    if(tareasDB){
        tareas.loadTask(tareasDB)
    }

    do{
        opt = await inquirerMenu()
        
        switch (opt){
           case '1':
            //crear tarea
            const desc = await leerInput('Descripción')
            tareas.crearTarea( desc )
            break;
           case '2':
            tareas.completeList()
           break;
           case '3':
            tareas.completeOrPendingTasks(true)
           break;
           case '4':
            tareas.completeOrPendingTasks(false)
           break;
           case '5':
            const list = await checkTasks(tareas.listadoArr)
            tareas.toggleStateTasks(list)
           break;
           case '6':
            const id = await listDeleteTask(tareas.listadoArr)
            const ok = await confirmation('¿Estás seguro de esta acción?')
            if(id !== 0){
                if(ok){
                    tareas.deleteTask(id)
                }
            }
           break;

        }

        saveFile(tareas.listadoArr)
        await pausa()
        
    } while (opt !== '0');
    


}

main()