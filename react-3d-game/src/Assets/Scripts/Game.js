import React, { useRef, useState } from "react";
import { Canvas } from "react-three-fiber";
import { OrbitControls, Stars } from "@react-three/drei"
import { PointLight } from "three";

export default function Game() {
    let newTiles = []
    const [buildings, setBuildings] = useState([])

    generateMap();

    console.log(buildings);
    return <div style={{ width: "100vw", height: "100vh" }}>
        <Canvas>
            <Stars></Stars>
            <directionalLight intensity={1} position={[0, 2, 2]} castShadow />
            <OrbitControls />
            {newTiles.map((props) => (<Tile pos={props.position} num={props.tileId} />))}
            {buildings.map((props) => (props.house_1 === null ? <House_1 pos={props.house_1.cords} /> : null))}
            {buildings.map((props) => (<House_2 pos={props.house_2.cords} />))}
        </Canvas>
    </div>
    //
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

    function placeBuilding(type, cords) {
        console.log(cords);
        let newBuildings = buildings
        switch (type) {
            case 'house_1':
                newBuildings.push(
                    {
                        house_1: {
                            cords: cords,
                            stats: {
                                power: -5,
                                water: -2,
                                residents: 4,
                                income: 10
                            }
                        }
                    })
                break;
            case 'house_2':
                newBuildings.push(
                    {
                        house_2: {
                            cords: cords,
                            stats: {
                                power: -7,
                                water: -5,
                                residents: 9,
                                income: 30
                            }
                        }
                    }
                )
                break;
            default:
                console.warn('UNKNOWN BUILDING TYPE')
                break;
        }
        setBuildings([...newBuildings])
    }

    function Tile(props) {
        const mesh = useRef()

        const [hovered, setHover] = useState(false)
        const [active, setActive] = useState(false)

        return (

            <mesh
                {...props}
                position={props.pos}
                ref={mesh}
                onPointerOver={(event) => setHover(true)}
                onPointerOut={(event) => setHover(false)}
                onClick={(event) => (placeBuilding("house_2", props.pos))}
                rotation={[-Math.PI / 2, 0, 0]}
            >
                <planeBufferGeometry attach="geometry" args={[1, 1]} />
                <meshLambertMaterial attach="material" color={hovered ? "red" : "green"} />
            </mesh>
        )
    }

    function House_1(props) {
        let height = 0.3
        return (
            <mesh
                {...props}
                position={[props.pos[0], height / 2, props.pos[2]]}
            >
                <boxBufferGeometry attach="geometry" args={[0.5, height, 0.5]} />
                <meshLambertMaterial attach="material" color="gray" />
            </mesh>
        )
    }

    function House_2(props) {
        let height = 0.5
        return (
            <mesh
                {...props}
                position={[props.pos[0], height / 2, props.pos[2]]}
            >
                <boxBufferGeometry attach="geometry" args={[0.7, height, 0.7]} />
                <meshLambertMaterial attach="material" color="gray" />
            </mesh>
        )
    }
}