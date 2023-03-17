import { Tarea } from "./tarea.js";

class Tareas {

    _listado = {}

    get listadoArr(){
        const listado = [];

        Object.keys(this._listado).forEach( key => {
            listado.push(this._listado[key])
        })

        return listado
    }

    constructor() {
        this._listado = {};
    }

    loadTask( tasks ){
        tasks.forEach( task => {
            this._listado[task.id] = task
        })
    }

    deleteTask(id){
        if(this._listado[id]){
            delete this._listado[id]
            console.log(`La tarea fue eliminada`)
        }
    }

    completeList(){
        
        this.listadoArr.map((e, index)=>{
            if(e.completadoEn !== null){
                console.log(`${index+1}. `.green +  `${e.desc} ` + `:: Completada`.green)
            } else{
                console.log(`${index+1}. `.green +  `${e.desc} ` + `:: Pendiente`.red)
            }
        })
    }

    completeOrPendingTasks( complete = true){
            this.listadoArr.map((e, index)=>{
                if(e.completadoEn !== null && complete){
                    console.log(`${index+1}. `.green +  `${e.desc} ` + `:: Completada`.green)
                }else if(e.completadoEn == null && !complete){
                    console.log(`${index+1}. `.green +  `${e.desc} ` + `:: Pendiente`.red)
                }
            })
    }

    crearTarea( desc = ''){
       const tarea = new Tarea(desc);
       this._listado[tarea.id] = tarea
    }

    toggleStateTasks(ids){

        ids.forEach(id =>{
            const task = this._listado[id]
            if(!task.completadoEn){
            task.completadoEn = new Date().toISOString()
        }

        })

        this.listadoArr.forEach(task => {
            if( !ids.includes(task.id)){
                this._listado[task.id].completadoEn = null
            }
        })
    }
}

export {
    Tareas
}