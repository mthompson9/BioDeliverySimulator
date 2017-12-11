function storeSimName(simName) { 
    console.log(simName)
    sessionStorage.setItem('Simulation Name', simName)
    newSimulation(sessionStorage.getItem('Simulation Name'))
}
