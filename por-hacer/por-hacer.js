const fs = require('fs');

let listadoPoraHacer = [];

const saveDataBase = () => {
    let data = JSON.stringify(listadoPoraHacer);
    fs.writeFile('./db/data.json', data, (err) => {
        if (err) throw new Error('no se pudo Almacenar');
    })

}
const viewDb = () => {
    try {
        listadoPoraHacer = require('../db/data.json');

    } catch (error) {
        listadoPoraHacer = [];
    }
}

const crear = (descripcion) => {
    let poraHacer = {
        descripcion,
        completado: false
    };
    viewDb();
    listadoPoraHacer.push(poraHacer);
    saveDataBase()
    return poraHacer;

}

const getListado = () => {
    viewDb();
    return listadoPoraHacer;
}

const actualizar = (descripcion, completado = true) => {
    viewDb();
    let index = listadoPoraHacer.findIndex(tarea => tarea.descripcion === descripcion);

    if (index >= 0) {
        listadoPoraHacer[index].completado = completado;
        saveDataBase();
        return true;
    } else {
        return false;
    }
}

const borrar = (descripcion) => {
    viewDb();
    let index = listadoPoraHacer.findIndex(tarea => tarea.descripcion === descripcion);
    console.log(index);

    if (index >= 0) {
        listadoPoraHacer.splice(index, 1);
        saveDataBase();
        return true;
    } else {
        return false;
    }

}


module.exports = { crear, getListado, actualizar, borrar }