import inquirer from 'inquirer';
import colors from 'colors'

const menuOpts = [
    {
        type: 'list',
        name: 'option',
        message: '¿Que desea hacer?',
        choices: [
            {
               value: '1',
               name: '1. Crear tarea' 
            },
            {
                value: '2',
                name: '2. Listar tarea' 
             },
             {
                value: '3',
                name: '3. Listar tareas completadas' 
             },
             {
                value: '4',
                name: '4. Listar tareas pendientes' 
             },
             {
                value: '5',
                name: '5. Completar tarea(s)' 
             },
             {
                value: '6',
                name: '6. Borrar tarea' 
             },
             {
                value: '0',
                name: '0. Salir' 
             }
        ],
    }
]

const inquirerMenu = async() =>{

    console.clear();
    console.log('============================='.green)
    console.log('    Seleccione una opción    '.white)
    console.log('============================='.green)

    const { option } = await inquirer.prompt(menuOpts)

    return option

}

const pausa = async() => {
    const question = [
        {
            type: 'input',
            name: 'enter',
            message: `\nPresiona ${'ENTER'.green} para continuar...`,
        }
    ]
    await inquirer.prompt(question);
}

const leerInput = async( message ) => {
    const question = [
        {
            type: 'input',
            name: 'desc',
            message,
            validate(value) {
                if( value.length === 0){
                    return 'Ingresa un valor'
                }
                return true
            }

        }
    ]

    const { desc } = await inquirer.prompt(question)
    return desc
}

const checkTasks = async(tasks = []) =>{

    const choices = tasks.map( (task, i) =>{
        const idx =`${i+1}.`.green

        return {
            value: task.id,
            name: `${idx} ${task.desc}`,
            checked: (task.completadoEn !== null) ? true : false
        }
    })

    const questions = [
        {
            type: 'checkbox',
            name: 'ids',
            message: 'Seleccione',
            choices
        }
    ]

    const { ids } = await inquirer.prompt(questions)
    return ids
}

const listDeleteTask = async(tasks = []) =>{

    const choices = tasks.map( (task, i) =>{
        const idx =`${i+1}.`.green

        return {
            value: task.id,
            name: `${idx} ${task.desc}`
        }
    })

    choices.unshift({
        value: '0',
        name: '0.'.green + ' Cancelar'
    })

    const questions = [
        {
            type: 'list',
            name: 'id',
            message: 'Borrar',
            choices
        }
    ]

    const { id } = await inquirer.prompt(questions)
    return id
}

const confirmation = async(message) => {
    const question = [
        {
            type: 'confirm',
            name: 'ok',
            message
        }
    ]

    const {ok} = await inquirer.prompt(question)
    return ok
}

export {
    inquirerMenu,
    pausa,
    leerInput,
    listDeleteTask,
    confirmation,
    checkTasks
}