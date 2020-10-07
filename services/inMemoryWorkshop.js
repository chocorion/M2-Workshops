inMemoryWorkshop = [];


function getWorkshopList() {
    return new Promise((resolve, ) => {
        resolve(inMemoryWorkshop);
    });
}

function getWorkshopByName(name) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("name parameter is required"));
        }
        resolve(inMemoryWorkshop.find(workshop => workshop.name === name));
    });
}

function addWorkshop(name, description) {
    return new Promise((resolve, reject) => {
        if (!name) {
            reject(new Error("Workshop name required"));
        }
        if (!description) {
            reject(new Error("Workshop description required"));
        }
        inMemoryWorkshop.push({
            name,
            description
        });
        resolve();
    });
}

function removeWorkshopByName(name) {
    return new Promise((resolve, reject) => {
        getWorkshopByName(name)
            .then(workshop => {
                getWorkshopList()
                    .then(list => {
                        const index = list.indexOf(workshop);

                        if (index > -1) {
                            list.splice(index, 1);
                            resolve();
                        } else {
                            reject(new Error("Workshop is not in memory"));
                        }
                    });
            });
    });
}

function updateWorkshop(name, newName, newDescription) {
    return new Promise((resolve, reject) => {
        getWorkshopByName(name)
            .then(workshop => {
                workshop.name = newName? newName : workshop.name,
                workshop.description = newDescription? newDescription : workshop.description;
                resolve();
            })
            .catch(error => {
                reject(error);
            });
    });
}

module.exports = {
    getWorkshopList,
    getWorkshopByName,
    addWorkshop,
    removeWorkshopByName,
    updateWorkshop
};