require('colors')
const { guardarDB, leerDB } = require('./helpers/guardarArchivo')
const { inquirerMenu, pausa, leerInput, listadoTareasBorrar, confirmar, mostrarListadoChecklist } = require('./helpers/inquirer')
const Tareas = require('./Models/tareas')

const main = async () => {

    let opt = ''

    const tareas = new Tareas()

    const tareasDB = leerDB();

    if (tareasDB) {
        tareas.cargarTareasFromArray(tareasDB)
    }

    do {
        opt = await inquirerMenu()
        
        switch (opt) {
            case '1':
                const desc = await leerInput('Descripcion: ')
                tareas.crearTarea(desc)
            break;
            
            case '2': 
                tareas.listadoCompleto()
            break;

            case '3': // listar completadas
                tareas.listadoPendientesCompletadas(true)
            break;

            case '4': // listar pendientes
                tareas.listadoPendientesCompletadas(false)
            break;

            case '5': // Completado | Pendiente
                const ids = await mostrarListadoChecklist(tareas.listadoArr)
                tareas.toggleCompletadas(ids)
            break;

            case '6': // Borrar Tareas
                const id = await listadoTareasBorrar(tareas.listadoArr)
                if (id !== '0') {
                    
                    const ok = await confirmar('¿Seguro?')
                    if (ok) {
                        tareas.borrarTarea(id)
                        console.log('Tarea Borrada')
                    }
                }
            break;
        
        }

        guardarDB(tareas.listadoArr)

        await pausa()

    } while(opt !== '0')

}

main()