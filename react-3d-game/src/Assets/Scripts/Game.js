import React, { useRef, useState, useEffect, Suspense } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei"
import { Road, House1, House2, House3, House4, House5, House6, Powerplant1, Powerplant2, WaterTreatment1, WaterTreatment2 } from "./Buildings";
import style from "../Styles/uiStyle.module.css"
import ls from 'local-storage'
import { delStorage } from "./Storage";
import Progress from "./Progress";
import mouse from "./mouse";
import h1 from "../Sprites/h1.png"
import h2 from "../Sprites/h2.png"
import h3 from "../Sprites/h3.png"
import h4 from "../Sprites/h4.png"
import h5 from "../Sprites/h5.png"
import h6 from "../Sprites/h6.png"
import pp1 from "../Sprites/pp1.png"
import pp2 from "../Sprites/pp2.png"
import wt1 from "../Sprites/wt1.png"
import wt2 from "../Sprites/wt2.png"
import r from "../Sprites/r.png"
import x from "../Sprites/x.png"

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

    const [btn1Window, setBtn1Window] = useState(["none"]);
    const [btn2Window, setBtn2Window] = useState(["none"]);
    const [btn3Window, setBtn3Window] = useState(["none"]);
    const [btn4Window, setBtn4Window] = useState(["none"]);
    const [btn5Window, setBtn5Window] = useState(["none"]);
    const [btn6Window, setBtn6Window] = useState(["none"]);
    const [btn7Window, setBtn7Window] = useState(["none"]);
    const [btn8Window, setBtn8Window] = useState(["none"]);
    const [btn9Window, setBtn9Window] = useState(["none"]);
    const [btn10Window, setBtn10Window] = useState(["none"]);
    const [btn11Window, setBtn11Window] = useState(["none"]);
    const [btn12Window, setBtn12Window] = useState(["none"]);

    const [feedback, setFeedback] = useState(null)
    

    const Cursor = () => {
        const { clientX, clientY } = mouse();

        return (
            <div
                style={{
                    position: "fixed",
                    top: -60,
                    bottom: 0,
                    left: -60,
                    right: 0,
                    zIndex: 9999,
                    pointerEvents: "none"
                }}
            >
                <div
                    style={{
                        position: "absolute",
                        left: clientX,
                        top: clientY,
                        transform: "translate(15%, 30%)",
                        border: "none",
                        outline: "none"
                    }}
                >
                    {uiSprites[getMouseIcon(pickedBuilding)]}
                </div>
            </div>
        );
    };

    let uiSprites = [
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="H1" src={h1} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="H2" src={h2} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="H3" src={h3} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="H4" src={h4} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="H5" src={h5} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="H6" src={h6} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="PP1" src={pp1} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="PP2" src={pp2} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="WT1" src={wt1} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="WW2" src={wt2} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="R" src={r} />,
        <img style={{ backgroundColor: "transparent", width: 50, height: 50 }} alt="X" src={x} />
    ]

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

        <div className="canvas" style={{ width: "100vw", height: "100vh" }} >
            <Canvas shadows camera={{ fov: 70, position: [0, 10, 0]}}>
                <OrbitControls makeDefault enablePan={true} enableZoom={false} enableRotate={false}></OrbitControls>
                <Stars></Stars>
                <directionalLight shadow-camera-left={-20}
        shadow-camera-right={20}
        shadow-camera-top={20}
        shadow-camera-bottom={-20} intensity={1.6} castShadow position={[15,30,15]}/>
                <ambientLight intensity={0.2}></ambientLight>
                <Suspense>
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
                </Suspense>
            </Canvas>
        </div>


        <div className={style.adv} style={{ height: advancementsTab }} onMouseEnter={() => (setPickedBuilding(""))} >
            <div className={style.advRow} style={{ backgroundColor: tier >= 1 ? "green" : "transparent", borderRight: tier === 1 ? "solid 10px #0b5c00" : "none" }}>
                <div>Tier 1</div><div className={style.advCol}>
                    <div>{uiSprites[0]}</div><div>{uiSprites[10]}</div>
                </div>
            </div>
            <div className={style.advRow} style={{ backgroundColor: tier >= 2 ? "green" : "transparent", borderRight: tier === 2 ? "solid 10px #0b5c00" : "none" }}>
                <div>Tier 2</div><div>{uiSprites[1]}</div>
            </div>
            <div className={style.advRow} style={{ backgroundColor: tier >= 3 ? "green" : "transparent", borderRight: tier === 3 ? "solid 10px #0b5c00" : "none" }}>
                <div>Tier 3</div><div>{uiSprites[2]}</div>
            </div>
            <div className={style.advRow} style={{ backgroundColor: tier >= 4 ? "green" : "transparent", borderRight: tier === 4 ? "solid 10px #0b5c00" : "none" }}>
                <div>Tier 4</div><div className={style.advCol}><div>{uiSprites[3]}</div><div>{uiSprites[7]}</div><div>{uiSprites[9]}</div></div>
            </div>
            <div className={style.advRow} style={{ backgroundColor: tier >= 5 ? "green" : "transparent", borderRight: tier === 5 ? "solid 10px #0b5c00" : "none" }}>
                <div>Tier 5</div><div>{uiSprites[4]}</div>
            </div>
            <div className={style.advRow} style={{ backgroundColor: tier >= 6 ? "green" : "transparent", borderRight: tier === 6 ? "solid 10px #0b5c00" : "none" }}>
                <div>Tier 6</div><div>{uiSprites[5]}</div>
            </div>
        </div>
        <div className={style.confirmDel} style={{ display: confirmDel }}>
            <span>Confirm, that you want to erase all of your progress?</span>
            <div><button onClick={() => (delStorage())} className={style.btnY}>Yes</button><button onClick={() => setComfirmDel("none")} className={style.btnN}>No</button></div>
        </div>
        <div className={style.exitBtn}><button onClick={() => (setComfirmDel("flex"))} id="b">&#8634;</button><label for="b">Restart?</label></div>
        <div className={style.techBut} onClick={() => (advancementsTab === "0vh" ? setAdvancementsTab("78vh") : setAdvancementsTab("0vh"))}><div style={{ width: getTierProgression(tier, stats.stats.residents) + "%", fontWeight: 900 }} onClick={() => (advancementsTab === "0vh" ? setAdvancementsTab("78vh") : setAdvancementsTab("0vh"))}>Tier: {tier}</div></div>
        <div className={style.statsBar} onClick={() => (setPickedBuilding(""))}>
            <div><div style={{ color: stats.stats.money > 0 ? "green" : "red" }}><span>Money </span>{stats.stats.money}</div><div className={style.progres}></div></div>
            <div style={{ color: stats.stats.income > 0 ? "green" : "red" }}><span>Income </span>{stats.stats.income}</div>
            <div><span>Residents </span>{stats.stats.residents}</div>
            <div style={{ color: stats.stats.power > 0 ? "green" : "red" }}><span>Electricity reserves </span>{stats.stats.power}</div>
            <div style={{ color: stats.stats.water > 0 ? "green" : "red" }}><span>Water reserves </span>{stats.stats.water}</div>
        </div>
        <div className={style.bottomBar} onClick={(e) => (e.target.className !== "ignoreDiv" ? null : setPickedBuilding(""))}>
            <div>
                <span>Residential</span>
                <div>
                    <button onMouseEnter={() => (setBtn1Window("flex"))} onMouseLeave={() => (setBtn1Window("none"))} onClick={() => (setPickedBuilding("house1"))}>{uiSprites[0]}</button>
                    <button onMouseEnter={() => (setBtn2Window("flex"))} onMouseLeave={() => (setBtn2Window("none"))} style={tier > 1 ? { display: "inline" } : { display: "none" }} onClick={() => (setPickedBuilding("house2"))}>{uiSprites[1]}</button>
                    <button onMouseEnter={() => (setBtn3Window("flex"))} onMouseLeave={() => (setBtn3Window("none"))} style={tier > 2 ? { display: "inline" } : { display: "none" }} onClick={() => (setPickedBuilding("house3"))}>{uiSprites[2]}</button>
                    <button onMouseEnter={() => (setBtn4Window("flex"))} onMouseLeave={() => (setBtn4Window("none"))} style={tier > 3 ? { display: "inline" } : { display: "none" }} onClick={() => (setPickedBuilding("house4"))}>{uiSprites[3]}</button>
                    <button onMouseEnter={() => (setBtn5Window("flex"))} onMouseLeave={() => (setBtn5Window("none"))} style={tier > 4 ? { display: "inline" } : { display: "none" }} onClick={() => (setPickedBuilding("house5"))}>{uiSprites[4]}</button>
                    <button onMouseEnter={() => (setBtn6Window("flex"))} onMouseLeave={() => (setBtn6Window("none"))} style={tier > 5 ? { display: "inline" } : { display: "none" }} onClick={() => (setPickedBuilding("house6"))}>{uiSprites[5]}</button>
                </div>
            </div>
            <div>
                <span>Industial</span>
                <div>
                    <button onMouseEnter={() => (setBtn7Window("flex"))} onMouseLeave={() => (setBtn7Window("none"))} onClick={() => (setPickedBuilding("powerplant1"))}>{uiSprites[6]}</button>
                    <button onMouseEnter={() => (setBtn8Window("flex"))} onMouseLeave={() => (setBtn8Window("none"))} style={tier > 3 ? { display: "inline" } : { display: "none" }} onClick={() => (setPickedBuilding("powerplant2"))}>{uiSprites[7]}</button>
                    <button onMouseEnter={() => (setBtn9Window("flex"))} onMouseLeave={() => (setBtn9Window("none"))} onClick={() => (setPickedBuilding("waterTreatment1"))}>{uiSprites[8]}</button>
                    <button onMouseEnter={() => (setBtn10Window("flex"))} onMouseLeave={() => (setBtn10Window("none"))} style={tier > 3 ? { display: "inline" } : { display: "none" }} onClick={() => (setPickedBuilding("waterTreatment2"))}>{uiSprites[9]}</button>
                </div>
            </div>
            <div>
                <span>Road</span>
                <div>
                    <button onMouseEnter={() => (setBtn11Window("flex"))} onMouseLeave={() => (setBtn11Window("none"))} onClick={() => (setPickedBuilding("road"))}>{uiSprites[10]}</button>
                </div>
            </div>
            <div>
                <span>Remove</span>
                <div>
                    <button onMouseEnter={() => (setBtn12Window("flex"))} onMouseLeave={() => (setBtn12Window("none"))} onClick={() => (setPickedBuilding("remove"))}>{uiSprites[11]}</button>
                </div>
            </div>
        </div>
        <div>
            <div style={{ display: btn1Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Small House</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>10</span>
                    </div>
                    <div>
                        <span>Residents</span><span>4</span>
                    </div>
                    <div>
                        <span>Power</span><span>-5</span>
                    </div>
                    <div>
                        <span>Water</span><span>-2</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'green' }}>5</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn2Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Medium House</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>150</span>
                    </div>
                    <div>
                        <span>Residents</span><span>9</span>
                    </div>
                    <div>
                        <span>Power</span><span>-9</span>
                    </div>
                    <div>
                        <span>Water</span><span>-7</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'green' }}>7</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn3Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Tenement</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>250</span>
                    </div>
                    <div>
                        <span>Residents</span><span>28</span>
                    </div>
                    <div>
                        <span>Power</span><span>-12</span>
                    </div>
                    <div>
                        <span>Water</span><span>-8</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'green' }}>9</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn4Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Block of flats</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>450</span>
                    </div>
                    <div>
                        <span>Residents</span><span>64</span>
                    </div>
                    <div>
                        <span>Power</span><span>-35</span>
                    </div>
                    <div>
                        <span>Water</span><span>-15</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'green' }}>15</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn5Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Apartment</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>1200</span>
                    </div>
                    <div>
                        <span>Residents</span><span>128</span>
                    </div>
                    <div>
                        <span>Power</span><span>-50</span>
                    </div>
                    <div>
                        <span>Water</span><span>-30</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'green' }}>35</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn6Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Skyscraper</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>2500</span>
                    </div>
                    <div>
                        <span>Residents</span><span>248</span>
                    </div>
                    <div>
                        <span>Power</span><span>-85</span>
                    </div>
                    <div>
                        <span>Water</span><span>-50</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'green' }}>600</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn7Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Small Powerplat</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>2000</span>
                    </div>
                    <div>
                        <span>Residents</span><span>-</span>
                    </div>
                    <div>
                        <span>Power</span><span>130</span>
                    </div>
                    <div>
                        <span>Water</span><span>-2</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'red' }}>-10</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn8Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Big Powerplant</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>30000</span>
                    </div>
                    <div>
                        <span>Residents</span><span>-</span>
                    </div>
                    <div>
                        <span>Power</span><span>650</span>
                    </div>
                    <div>
                        <span>Water</span><span>-6</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'red' }}>-30</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn9Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Small Water Treatment Plant</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>1000</span>
                    </div>
                    <div>
                        <span>Residents</span><span>-</span>
                    </div>
                    <div>
                        <span>Power</span><span>-2</span>
                    </div>
                    <div>
                        <span>Water</span><span>125</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'red' }}>-5</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn10Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Big Water Treatment Plant</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>40000</span>
                    </div>
                    <div>
                        <span>Residents</span><span>-</span>
                    </div>
                    <div>
                        <span>Power</span><span>-15</span>
                    </div>
                    <div>
                        <span>Water</span><span>565</span>
                    </div>
                    <div>
                        <span>Income</span><span style={{ color: 'red' }}>-25</span>
                    </div>
                </div>
            </div>
            <div style={{ display: btn11Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Urban Road</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>10</span>
                    </div>
                    <div>
                        Allows you to place buildings next to it.
                    </div>
                </div>
            </div>
            <div style={{ display: btn12Window }} className={style.decriptionWindow}>
                <div className={style.decriptionWindowLabel}>Remove</div>
                <div className={style.decriptionWindowContent}>
                    <span>Statistic:</span>
                    <div>
                        <span>Cost</span><span>-</span>
                    </div>
                    <div>
                        Allows you to remove placed buildings.
                    </div>
                </div>
            </div>
        </div>
        <Feedback errorType={feedback}/>
        <Cursor />
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
                if (stats.stats.money >= 0) {
                    if (stats.stats.power >= 0) {
                        if (stats.stats.water >= 0) {
                            if (nextToRoad(cords)) {
                                if (!occupied) {
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
                                        setFeedback(null)  
                                } else {
                                    setFeedback("occupied")
                                }
                            } else {
                                setFeedback("road")
                            }
                        } else {
                            setFeedback("water")
                        }
                    } else {
                        setFeedback("power")
                    }
                } else {
                    setFeedback("money")
                }


                break;
            case 'house2':
                if (stats.stats.money >= 0) {
                    if (stats.stats.power >= 0) {
                        if (stats.stats.water >= 0) {
                            if (nextToRoad(cords)) {
                                if (!occupied && tier > 1) {
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
                                    setFeedback(null)
                                } else {
                                    setFeedback("occupied")
                                }
                            } else {
                                setFeedback("road")
                            }
                        } else {
                            setFeedback("water")
                        }
                    } else {
                        setFeedback("power")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'house3':
                if (stats.stats.money >= 0) {
                    if (stats.stats.power >= 0) {
                        if (stats.stats.water >= 0) {
                            if (nextToRoad(cords)) {
                                if (!occupied && tier > 2) {
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
                                    setFeedback(null)
                                } else {
                                    setFeedback("occupied")
                                }
                            } else {
                                setFeedback("road")
                            }
                        } else {
                            setFeedback("water")
                        }
                    } else {
                        setFeedback("power")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'house4':
                if (stats.stats.money >= 0) {
                    if (stats.stats.power >= 0) {
                        if (stats.stats.water >= 0) {
                            if (nextToRoad(cords)) {
                                if (!occupied && tier > 3) {
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
                                    setFeedback(null)
                                } else {
                                    setFeedback("occupied")
                                }
                            } else {
                                setFeedback("road")
                            }
                        } else {
                            setFeedback("water")
                        }
                    } else {
                        setFeedback("power")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'house5':
                if (stats.stats.money >= 0) {
                    if (stats.stats.power >= 0) {
                        if (stats.stats.water >= 0) {
                            if (nextToRoad(cords)) {
                                if (!occupied && tier > 4) {
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
                                    setFeedback(null)
                                } else {
                                    setFeedback("occupied")
                                }
                            } else {
                                setFeedback("road")
                            }
                        } else {
                            setFeedback("water")
                        }
                    } else {
                        setFeedback("power")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'house6':
                if (stats.stats.money >= 0) {
                    if (stats.stats.power >= 0) {
                        if (stats.stats.water >= 0) {
                            if (nextToRoad(cords)) {
                                if (!occupied && tier > 5) {
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
                                    setFeedback(null)
                                } else {
                                    setFeedback("occupied")
                                }
                            } else {
                                setFeedback("road")
                            }
                        } else {
                            setFeedback("water")
                        }
                    } else {
                        setFeedback("power")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'road':
                if (stats.stats.money >= 0) {
                    if (!occupied) {
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
                        setFeedback(null)
                    } else {
                        setFeedback("occupied")
                    }
                } else {
                    setFeedback("money")
                }
                break
            case 'powerplant1':
                if (stats.stats.money >= 0) {
                    if (nextToRoad(cords)) {
                        if (!occupied) {
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
                            setFeedback(null)
                        } else {
                            setFeedback("occupied")
                        }
                    } else {
                        setFeedback("road")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'powerplant2':
                if (stats.stats.money >= 0) {
                    if (nextToRoad(cords)) {
                        if (!occupied && tier >= 4) {
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
                            setFeedback(null)
                        } else {
                            setFeedback("occupied")
                        }
                    } else {
                        setFeedback("road")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'waterTreatment1':
                if (stats.stats.money >= 0) {
                    if (nextToRoad(cords)) {
                        if (!occupied) {
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
                            setFeedback(null)
                        } else {
                            setFeedback("occupied")
                        }
                    } else {
                        setFeedback("road")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'waterTreatment2':
                if (stats.stats.money >= 0) {
                    if (nextToRoad(cords)) {
                        if (!occupied && tier >= 4) {
                            stats.stats.money -= 40000
                            ls.set("stats", JSON.stringify(stats))
                            newBuildings.push({
                                waterTreatment2: {
                                    cords: cords,
                                    stats: {
                                        power: -15,
                                        water: 565,
                                        residents: 0,
                                        income: -25
                                    }
                                }
                            })
                            setFeedback(null)
                        } else {
                            setFeedback("occupied")
                        }
                    } else {
                        setFeedback("road")
                    }
                } else {
                    setFeedback("money")
                }
                break;
            case 'remove':
                for (let i = 0; i < newBuildings.length; i++) {
                    if (newBuildings[i].house1 !== undefined) {
                        if (arraysEqual(newBuildings[i].house1.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }
                    if (newBuildings[i].house2 !== undefined) {
                        if (arraysEqual(newBuildings[i].house2.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].house3 !== undefined) {
                        if (arraysEqual(newBuildings[i].house3.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].house4 !== undefined) {
                        if (arraysEqual(newBuildings[i].house4.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].house5 !== undefined) {
                        if (arraysEqual(newBuildings[i].house5.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].house6 !== undefined) {
                        if (arraysEqual(newBuildings[i].house6.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].powerplant1 !== undefined) {
                        if (arraysEqual(newBuildings[i].powerplant1.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].powerplant2 !== undefined) {
                        if (arraysEqual(newBuildings[i].powerplant2.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].waterTreatment1 !== undefined) {
                        if (arraysEqual(newBuildings[i].waterTreatment1.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].waterTreatment2 !== undefined) {
                        if (arraysEqual(newBuildings[i].waterTreatment2.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

                    if (newBuildings[i].road !== undefined && occupied) {
                        if (arraysEqual(newBuildings[i].road.cords, cords)) {
                            newBuildings.splice(i, 1)
                            break;
                        }
                    }

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
                receiveShadow
            >
                <planeBufferGeometry attach="geometry" args={[1, 1]} />
                <meshStandardMaterial attach="material" color={hovered ? "red" : "darkgreen"} />
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

function getTierProgression(tier, residents) {
    switch (tier) {
        case 1:
            return (residents) / 100 * 100;
        case 2:
            return (residents - 100) / 400 * 100;
        case 3:
            return (residents - 500) / 500 * 100;
        case 4:
            return (residents - 1000) / 2000 * 100;
        case 5:
            return (residents - 3000) / 3000 * 100;
        case 6:
            return 100;
        default: return 0
    }
}

function getMouseIcon(pickedBuilding) {
    switch (pickedBuilding) {
        case "house1": return 0
        case "house2": return 1
        case "house3": return 2
        case "house4": return 3
        case "house5": return 4
        case "house6": return 5
        case "powerplant1": return 6
        case "powerplant2": return 7
        case "waterTreatment1": return 8
        case "waterTreatment2": return 9
        case "road": return 10
        case "remove": return 11
        default: return null
    }
}

function Feedback(props) {
    switch (props.errorType) {
        case "money":
            return <div style={{animationPlayState:"revert"}} className={style.feedbackWindow}>
                You don't have enought money for it.
            </div>
        case "power":
            return <div style={{animationTimeline:"revert"}} className={style.feedbackWindow}>
                You don't have enought power reserves for it.
            </div>
        case "water":
            return <div style={{animationTimeline:"revert"}} className={style.feedbackWindow}>
                You don't have enought water reserves for it.
            </div>
        case "road":
            return <div style={{animationTimeline:"revert"}} className={style.feedbackWindow}>
                All buildings must be placed next to a road.
            </div>
        case "occupied":
            return <div style={{animationPlayState:"revert"}} className={style.feedbackWindow}>
                This location is already occupied.
            </div>
        default:
            return null;
    }
}