import ls from 'local-storage'
export function InitStorage(){
    console.log('storage inited');
    if(ls.get("stats")===null){
        ls.set("stats", JSON.stringify({stats: {
            money: 5000,
            income: 0,
            residents: 0,
            power: 0,
            water: 0
        }}))
    }
    if(ls.get("buildings")===null){
        ls.set("buildings", JSON.stringify([]))
    }
    if(ls.get("progress")===null){
        ls.set("progress", 0)
    }
}

export function delStorage(){
    ls.clear()
    window.location.reload(false);
}