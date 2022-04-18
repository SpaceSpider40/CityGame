import React, { useRef, useState, useEffect } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei"
import { Road, House1, House2, House3, House4, House5, House6, Powerplant1, Powerplant2, WaterTreatment1, WaterTreatment2 } from "./Buildings";
import style from "../Styles/uiStyle.module.css"
import ls from 'local-storage'
import { delStorage } from "./Storage";
import Progress from "./Progress";

export default function Game() {
    let newTiles = []
    const [buildings, setBuildings] = useState(JSON.parse(ls.get('buildings')))
    const [stats, setStats] = useState(JSON.parse(ls.get('stats')))
    const [pickedBuilding, setPickedBuilding] = useState()
    const [advancementsTab, setAdvancementsTab] = useState("0vh")
    const [confirmDel, setComfirmDel] = useState("none")
    let tier = ls.get("progress")

    stats.stats.income = housesIncome(JSON.parse(JSON.stringify(buildings)));
    stats.stats.residents = housesResidents(JSON.parse(JSON.stringify(buildings)));
    stats.stats.power = housesPower(JSON.parse(JSON.stringify(buildings)));
    stats.stats.water = housesWater(JSON.parse(JSON.stringify(buildings)));
    tier = Progress(housesResidents(JSON.parse(JSON.stringify(buildings))))
    ls.set("progress", Progress(housesResidents(JSON.parse(JSON.stringify(buildings)))))
    console.log(`tier`, tier);
    ls.set("stats", JSON.stringify(stats))

    useEffect(() => {
        const updateStats = setInterval(() => {

            let stat = stats

            stats.stats.money += stat.stats.income

            setStats(stats => ({
                ...stats,
                ...stat
            }))

            ls.set("stats", JSON.stringify(stats))
        }, 10000);

        return () => {
            clearInterval(updateStats);
        };
    }, []);

    generateMap();

    return <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas>
            <Stars></Stars>
            <ambientLight></ambientLight>
            <OrbitControls />
            {newTiles.map((props) => (<Tile pos={props.position} num={props.tileId} />))}
            {buildings.map((props) => (props.house1 !== undefined ? <House1 pos={props.house1.cords} /> : null))}
            {buildings.map((props) => (props.house2 !== undefined ? <House2 pos={props.house2.cords} /> : null))}
            {buildings.map((props) => (props.house3 !== undefined ? <House3 pos={props.house3.cords} /> : null))}
            {buildings.map((props) => (props.house4 !== undefined ? <House4 pos={props.house4.cords} /> : null))}
            {buildings.map((props) => (props.house5 !== undefined ? <House5 pos={props.house5.cords} /> : null))}
            {buildings.map((props) => (props.house6 !== undefined ? <House6 pos={props.house6.cords} /> : null))}
            {buildings.map((props) => (props.road !== undefined ? <Road pos={props.road.cords} /> : null))}
            {buildings.map((props) => (props.powerplant1 !== undefined ? <Powerplant1 pos={props.powerplant1.cords} /> : null))}
            {buildings.map((props) => (props.powerplant2 !== undefined ? <Powerplant2 pos={props.powerplant2.cords} /> : null))}
            {buildings.map((props) => (props.waterTreatment1 !== undefined ? <WaterTreatment1 pos={props.waterTreatment1.cords} /> : null))}
            {buildings.map((props) => (props.waterTreatment2 !== undefined ? <WaterTreatment2 pos={props.waterTreatment2.cords} /> : null))}
        </Canvas>
        <div className={style.adv} style={{ height: advancementsTab }}>
            <div className={style.advRow} style={{backgroundColor:tier>=1?"green":"transparent", borderRight:tier===1?"solid 10px #0b5c00":"none"}}>
                <div>Tier 1</div><div>H1</div>
            </div>
            <div className={style.advRow} style={{backgroundColor:tier>=2?"green":"transparent", borderRight:tier===2?"solid 10px #0b5c00":"none"}}>
                <div>Tier 2</div><div>H2</div>
            </div>
            <div className={style.advRow} style={{backgroundColor:tier>=3?"green":"transparent", borderRight:tier===3?"solid 10px #0b5c00":"none"}}>
                <div>Tier 3</div><div>H3</div>
            </div>
            <div className={style.advRow} style={{backgroundColor:tier>=4?"green":"transparent", borderRight:tier===4?"solid 10px #0b5c00":"none"}}>
                <div>Tier 4</div><div className={style.advCol}><div>H4</div><div>PP2</div><div>WT2</div></div>
            </div>
            <div className={style.advRow} style={{backgroundColor:tier>=5?"green":"transparent", borderRight:tier===5?"solid 10px #0b5c00":"none"}}>
                <div>Tier 5</div><div>H5</div>
            </div>
            <div className={style.advRow} style={{backgroundColor:tier>=6?"green":"transparent", borderRight:tier===6?"solid 10px #0b5c00":"none"}}>
                <div>Tier 6</div><div>H6</div>
            </div>
        </div>
        <div className={style.confirmDel} style={{ display: confirmDel }}>
            <span>Confirm, that you want to erase all of your progress?</span>
            <div><button onClick={() => (delStorage())} className={style.btnY}>Yes</button><button onClick={() => setComfirmDel("none")} className={style.btnN}>No</button></div>
        </div>
        <div className={style.exitBtn}><button onClick={() => (setComfirmDel("flex"))} id="b">&#8634;</button><label for="b">Restart?</label></div>
        <div className={style.techBut}  onClick={() => (advancementsTab === "0vh" ? setAdvancementsTab("78vh") : setAdvancementsTab("0vh"))}><div style={{width:getTierProgression(tier,stats.stats.residents)+"%"}} onClick={() => (advancementsTab === "0vh" ? setAdvancementsTab("78vh") : setAdvancementsTab("0vh"))}>Tier: {tier}</div></div>
        <div className={style.statsBar}>
            <div><div><span>Money </span>{stats.stats.money}</div><div className={style.progres}></div></div>
            <div><span>Income </span>{stats.stats.income}</div>
            <div><span>Residents </span>{stats.stats.residents}</div>
            <div><span>Electricity reserves </span>{stats.stats.power}</div>
            <div><span>Water reserves </span>{stats.stats.water}</div>
        </div>
        <div className={style.bottomBar}>
            <div>
                <span>Residential</span>
                <div>
                    <button onClick={() => (setPickedBuilding("house1"))}>H1</button>
                    <button onClick={() => (setPickedBuilding("house2"))}>H2</button>
                    <button onClick={() => (setPickedBuilding("house3"))}>H3</button>
                    <button onClick={() => (setPickedBuilding("house4"))}>H4</button>
                    <button onClick={() => (setPickedBuilding("house5"))}>H5</button>
                    <button onClick={() => (setPickedBuilding("house6"))}>H6</button>
                </div>
            </div>
            <div>
                <span>Industial</span>
                <div>
                    <button onClick={() => (setPickedBuilding("powerplant1"))}>PP1</button>
                    <button onClick={() => (setPickedBuilding("powerplant2"))}>PP2</button>
                    <button onClick={() => (setPickedBuilding("waterTreatment1"))}>WT1</button>
                    <button onClick={() => (setPickedBuilding("waterTreatment2"))}>WT2</button>
                </div>
            </div>

            <button onClick={() => (setPickedBuilding("road"))}>R</button>
        </div>
    </div>

    function housesIncome(buds) {
        let incomeSum = 0;

        buds.forEach(b => {
            incomeSum += b.house1 !== undefined ? b.house1.stats.income : 0;
            incomeSum += b.house2 !== undefined ? b.house2.stats.income : 0;
            incomeSum += b.house3 !== undefined ? b.house3.stats.income : 0;
            incomeSum += b.house4 !== undefined ? b.house4.stats.income : 0;
            incomeSum += b.house5 !== undefined ? b.house5.stats.income : 0;
            incomeSum += b.house6 !== undefined ? b.house6.stats.income : 0;
            incomeSum += b.powerplant1 !== undefined ? b.powerplant1.stats.income : 0;
            incomeSum += b.powerplant2 !== undefined ? b.powerplant2.stats.income : 0;
            incomeSum += b.waterTreatment1 !== undefined ? b.waterTreatment1.stats.income : 0;
            incomeSum += b.waterTreatment2 !== undefined ? b.waterTreatment2.stats.income : 0;
        });
        ls.set("stats", JSON.stringify(stats))
        return incomeSum
    }

    function housesResidents(buds) {
        let residentsSum = 0;

        buds.forEach(b => {
            residentsSum += b.house1 !== undefined ? b.house1.stats.residents : 0;
            residentsSum += b.house2 !== undefined ? b.house2.stats.residents : 0;
            residentsSum += b.house3 !== undefined ? b.house3.stats.residents : 0;
            residentsSum += b.house4 !== undefined ? b.house4.stats.residents : 0;
            residentsSum += b.house5 !== undefined ? b.house5.stats.residents : 0;
            residentsSum += b.house6 !== undefined ? b.house6.stats.residents : 0;
        });
        ls.set("stats", JSON.stringify(stats))
        return residentsSum
    }

    function housesPower(buds) {
        let powerSum = 0;

        buds.forEach(b => {
            powerSum += b.house1 !== undefined ? b.house1.stats.power : 0;
            powerSum += b.house2 !== undefined ? b.house2.stats.power : 0;
            powerSum += b.house3 !== undefined ? b.house3.stats.power : 0;
            powerSum += b.house4 !== undefined ? b.house4.stats.power : 0;
            powerSum += b.house5 !== undefined ? b.house5.stats.power : 0;
            powerSum += b.house6 !== undefined ? b.house6.stats.power : 0;
            powerSum += b.powerplant1 !== undefined ? b.powerplant1.stats.power : 0;
            powerSum += b.powerplant2 !== undefined ? b.powerplant2.stats.power : 0;
            powerSum += b.waterTreatment1 !== undefined ? b.waterTreatment1.stats.power : 0;
            powerSum += b.waterTreatment2 !== undefined ? b.waterTreatment2.stats.power : 0;
        });
        ls.set("stats", JSON.stringify(stats))
        return powerSum
    }

    function housesWater(buds) {
        let waterSum = 0;

        buds.forEach(b => {
            waterSum += b.house1 !== undefined ? b.house1.stats.water : 0;
            waterSum += b.house2 !== undefined ? b.house2.stats.water : 0;
            waterSum += b.house3 !== undefined ? b.house3.stats.water : 0;
            waterSum += b.house4 !== undefined ? b.house4.stats.water : 0;
            waterSum += b.house5 !== undefined ? b.house5.stats.water : 0;
            waterSum += b.house6 !== undefined ? b.house6.stats.water : 0;
            waterSum += b.powerplant1 !== undefined ? b.powerplant1.stats.water : 0;
            waterSum += b.powerplant2 !== undefined ? b.powerplant2.stats.water : 0;
            waterSum += b.waterTreatment1 !== undefined ? b.waterTreatment1.stats.water : 0;
            waterSum += b.waterTreatment2 !== undefined ? b.waterTreatment2.stats.water : 0;
        });
        ls.set("stats", JSON.stringify(stats))
        return waterSum
    }

    function generateMap() {
        let count = 15;
        let tileId = 0;
        for (let i = -count; i < count; i++) {
            for (let j = -count; j < count; j++) {
                newTiles.push({ position: [i, 0, j], tileId })
                tileId++
            }
        }
    }

    function placeBuilding(cords) {
        let newBuildings = buildings
        let bud = JSON.parse(JSON.stringify(buildings))
        let occupied = false;

        bud.forEach(b => {
            if (b.house1 !== undefined) if (arraysEqual(cords, b.house1.cords)) occupied = true;
            if (b.house2 !== undefined) if (arraysEqual(cords, b.house2.cords)) occupied = true;
            if (b.house3 !== undefined) if (arraysEqual(cords, b.house3.cords)) occupied = true;
            if (b.house4 !== undefined) if (arraysEqual(cords, b.house4.cords)) occupied = true;
            if (b.house5 !== undefined) if (arraysEqual(cords, b.house5.cords)) occupied = true;
            if (b.house6 !== undefined) if (arraysEqual(cords, b.house6.cords)) occupied = true;
            if (b.road !== undefined) if (arraysEqual(cords, b.road.cords)) occupied = true;
            if (b.powerplant1 !== undefined) if (arraysEqual(cords, b.powerplant1.cords)) occupied = true;
            if (b.powerplant2 !== undefined) if (arraysEqual(cords, b.powerplant2.cords)) occupied = true;
            if (b.waterTreatment1 !== undefined) if (arraysEqual(cords, b.waterTreatment1.cords)) occupied = true;
            if (b.waterTreatment2 !== undefined) if (arraysEqual(cords, b.waterTreatment2.cords)) occupied = true;
        });

        switch (pickedBuilding) {
            case 'house1':
                if (stats.stats.money >= 0 && stats.stats.power >= 0 && stats.stats.water >= 0 && nextToRoad(cords) && !occupied) {
                    stats.stats.money -= 100
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push(
                        {
                            house1: {
                                cords: cords,
                                stats: {
                                    power: -5,
                                    water: -2,
                                    residents: 4,
                                    income: 5
                                }
                            }
                        })

                }
                break;
            case 'house2':
                if (stats.stats.money >= 0 && stats.stats.power >= 0 && stats.stats.water >= 0 && nextToRoad(cords) && !occupied && tier >= 1) {
                    stats.stats.money -= 150
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push(
                        {
                            house2: {
                                cords: cords,
                                stats: {
                                    power: -7,
                                    water: -5,
                                    residents: 9,
                                    income: 7
                                }
                            }
                        }
                    )
                }
                break;
            case 'house3':
                if (stats.stats.money >= 0 && stats.stats.power >= 0 && stats.stats.water >= 0 && nextToRoad(cords) && !occupied && tier >= 2) {
                    stats.stats.money -= 250
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push(
                        {
                            house3: {
                                cords: cords,
                                stats: {
                                    power: -12,
                                    water: -8,
                                    residents: 28,
                                    income: 9
                                }
                            }
                        }
                    )
                }
                break;
            case 'house4':
                if (stats.stats.money >= 0 && stats.stats.power >= 0 && stats.stats.water >= 0 && nextToRoad(cords) && !occupied && tier >= 3) {
                    stats.stats.money -= 450
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push(
                        {
                            house4: {
                                cords: cords,
                                stats: {
                                    power: -35,
                                    water: -15,
                                    residents: 64,
                                    income: 15
                                }
                            }
                        }
                    )
                }
                break;
            case 'house5':
                if (stats.stats.money >= 0 && stats.stats.power >= 0 && stats.stats.water >= 0 && nextToRoad(cords) && !occupied && tier >= 4) {
                    stats.stats.money -= 1200
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push(
                        {
                            house5: {
                                cords: cords,
                                stats: {
                                    power: -50,
                                    water: -30,
                                    residents: 128,
                                    income: 35
                                }
                            }
                        }
                    )
                }
                break;
            case 'house6':
                if (stats.stats.money >= 0 && stats.stats.power >= 0 && stats.stats.water >= 0 && nextToRoad(cords) && !occupied && tier >= 5) {
                    stats.stats.money -= 2500
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push(
                        {
                            house6: {
                                cords: cords,
                                stats: {
                                    power: -85,
                                    water: -50,
                                    residents: 248,
                                    income: 600
                                }
                            }
                        }
                    )
                }
                break;
            case 'road':
                if (stats.stats.money >= 0 && !occupied) {
                    stats.stats.money -= 10
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push(
                        {
                            road: {
                                cords: cords,
                                stats: {
                                    income: -2
                                }
                            }
                        }
                    )
                }
                break
            case 'powerplant1':
                if (stats.stats.money >= 0 && nextToRoad(cords) && !occupied) {
                    stats.stats.money -= 2000
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push({
                        powerplant1: {
                            cords: cords,
                            stats: {
                                power: 130,
                                water: -2,
                                residents: 0,
                                income: -10
                            }
                        }
                    })
                }
                break;
            case 'powerplant2':
                if (stats.stats.money >= 0 && nextToRoad(cords) && !occupied && tier >= 4) {
                    stats.stats.money -= 30000
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push({
                        powerplant2: {
                            cords: cords,
                            stats: {
                                power: 650,
                                water: -6,
                                residents: 0,
                                income: -30
                            }
                        }
                    })
                }
                break;
            case 'waterTreatment1':
                if (stats.stats.money >= 0 && nextToRoad(cords) && !occupied) {
                    stats.stats.money -= 1000
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push({
                        waterTreatment1: {
                            cords: cords,
                            stats: {
                                power: -2,
                                water: 125,
                                residents: 0,
                                income: -5
                            }
                        }
                    })
                }
                break;
            case 'waterTreatment2':
                if (stats.stats.money >= 0 && nextToRoad(cords) && !occupied && tier >= 4) {
                    stats.stats.money -= 40000
                    ls.set("stats", JSON.stringify(stats))
                    newBuildings.push({
                        waterTreatment2: {
                            cords: cords,
                            stats: {
                                power: -15,
                                water: 265,
                                residents: 0,
                                income: -25
                            }
                        }
                    })
                }
                break;
            default:
                console.error('UNKNOWN BUILDING TYPE')
                break;
        }
        setBuildings([...newBuildings])
        ls.set("buildings", JSON.stringify(buildings))
    }

    function nextToRoad(cords) {
        let buds = JSON.parse(JSON.stringify(buildings))
        let out = false

        buds.forEach(b => {
            if (b.road !== undefined) {
                if (((cords[0]) === (b.road.cords[0] - 1) && cords[2] === b.road.cords[2]) ||
                    ((cords[0] === (b.road.cords[0] - 1) && (cords[2]) === (b.road.cords[2] - 1)) ||
                        (cords[0] === (b.road.cords[0] + 1) && (cords[2]) === (b.road.cords[2] + 1)) ||
                        (cords[0] === b.road.cords[0] && (cords[2]) === (b.road.cords[2] - 1)) ||
                        (cords[0] === b.road.cords[0] && cords[2] === b.road.cords[2]) ||
                        ((cords[0]) === (b.road.cords[0] + 1) && cords[2] === b.road.cords[2]) ||
                        ((cords[0]) === (b.road.cords[0] - 1) && (cords[2]) === (b.road.cords[2] + 1)) ||
                        ((cords[0]) === (b.road.cords[0] + 1) && (cords[2]) === (b.road.cords[2] - 1)))) {
                    out = true;
                    return out
                }
            }
        });
        return out
    }

    function Tile(props) {
        const mesh = useRef()

        const [hovered, setHover] = useState(false)

        return (

            <mesh
                {...props}
                position={props.pos}
                ref={mesh}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
                onClick={(event) => (placeBuilding(props.pos))}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeBufferGeometry attach="geometry" args={[1, 1]} />
                <meshLambertMaterial attach="material" color={hovered ? "red" : "darkgreen"} />
            </mesh>
        )
    }
}

function arraysEqual(a, b) {
    if (a === b) return true;
    if (a == null || b == null) return false;
    if (a.length !== b.length) return false;
    for (var i = 0; i < a.length; ++i) {
        if (a[i] !== b[i]) return false;
    }
    return true;
}

function getTierProgression(tier, residents){
    switch(tier){
        case 1:
            return (residents)/100*100;
        case 2:
            return (residents)/500*100;
        case 3:
            return (residents)/1000*100;
        case 4: 
            return (residents)/3000*100;
        case 5: 
            return (residents)/6000*100;
        case 6:
            return 100;
    }
}