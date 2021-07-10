const Tarea = require('./tarea')

class Tareas {

    _Listado = {}

    get listadoArr() {

        const listado = []
        Object.keys(this._Listado).forEach(key => {
            const tarea = this._Listado[key]
            listado.push(tarea)
        })

        return listado
    }

    constructor() {
        
        this._Listado = {}
    }

    cargarTareasFromArray(tareas = []) {

        tareas.forEach(tarea => {

            this._Listado[tarea.id] = tarea
        })

    }

    crearTarea(desc) {

        const tarea = new Tarea(desc)

        this._Listado[tarea.id] = tarea
    }

    listadoCompleto() {
        console.log()
        this.listadoArr.forEach((tarea, i) => {

            const indice = `${i + 1}`.green
            const {desc, completadoEn} = tarea;
            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red
            console.log(`${indice} ${desc} :: ${estado}`)

        })
    }

    listadoPendientesCompletadas(completadas = true) {
        console.log()
        let indice = 0
        this.listadoArr.forEach((tarea) => {

            const {desc, completadoEn} = tarea;

            const estado = completadoEn ? 'Completada'.green : 'Pendiente'.red

            if(completadas) {
                if (completadoEn) {
                    indice += 1
                    console.log(`${(indice + '.').green} ${desc} :: ${completadoEn}`)
                }
            } else {
                if (!completadoEn) {
                    indice += 1
                    console.log(`${(indice + '.').green} ${desc} :: ${estado}`)
                }
            }

        })
    }

    borrarTarea(id) {
        if (this._Listado[id]) {
            delete this._Listado[id]
        }
    }

    toggleCompletadas(ids = []) {
        ids.forEach(id => {
            const tarea = this._Listado[id];
            if (!tarea.completadoEn) {
                tarea.completadoEn = new Date().toISOString()
            }
        })

        this.listadoArr.forEach(tarea => {
            if (!ids.includes(tarea.id)) {
                const task = this._Listado[tarea.id];
                task.completadoEn = null;
            }
        })
    }

}

module.exports = Tareas