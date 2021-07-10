require('colors')

const mostrarMenu = () => {

    return new Promise(resolve => {
        // console.clear()
        console.log('==========================='.green)
        console.log('  Seleccione una opcion'.green)
        console.log('===========================\n'.green)

        console.log(`${'1.'.green} Crear una tarea`)
        console.log(`${'2.'.green} Listar tareas`)
        console.log(`${'3.'.green} Listar tareas completadas`)
        console.log(`${'4.'.green} Listar tareas pendientes`)
        console.log(`${'5.'.green} Completar tarea(s)`)
        console.log(`${'6.'.green} Borrar tarea`)
        console.log(`${'0.'.green} Salir \n`)

        // readline permite capturar un valor desde consola, es parecido al Scanner de Java y al NextLine
        // stdin es para entrada y stdout es para salida
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })

        // question permite imprimir un mensaje y capturar mediante un callback el contenido en un objeto
        readline.question('Seleccione una opcion: ', (opt) => {
            // console.log({opt})
            readline.close()
            resolve(opt)
        })
    })

}

const pause = () => {

    return new Promise(resolve => {
        const readline = require('readline').createInterface({
            input: process.stdin,
            output: process.stdout
        })
    
        readline.question(`\nPresiones ${'ENTER'.green} para continuar\n`, (opt) => {
            readline.close()
            resolve(opt)
        })
    })
    
}

module.exports = {
    mostrarMenu,
    pause
}