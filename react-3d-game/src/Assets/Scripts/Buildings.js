export function House1(props) {
    let height = 0.3
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

export function House2(props) {
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

export function House3(props) {
    let height = 1
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.8, height, 0.8]} />
            <meshLambertMaterial attach="material" color="gray" />
        </mesh>
    )
}

export function House4(props) {
    let height = 2
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.8, height, 0.8]} />
            <meshLambertMaterial attach="material" color="gray" />
        </mesh>
    )
}

export function House5(props) {
    let height = 3
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.8, height, 0.8]} />
            <meshLambertMaterial attach="material" color="gray" />
        </mesh>
    )
}

export function House6(props) {
    let height = 5
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.8, height, 0.8]} />
            <meshLambertMaterial attach="material" color="gray" />
        </mesh>
    )
}

export function Road(props) {
    let height = 0.05
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[1, height, 1]} />
            <meshLambertMaterial attach="material" color="#2e2e2e" />
        </mesh>
    )
}

export function Powerplant1(props) {
    let height = 0.3
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.4, height, 0.8]} />
            <meshLambertMaterial attach="material" color="orange" />
        </mesh>
    )
}

export function Powerplant2(props) {
    let height = 0.5
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.6, height, 0.8]} />
            <meshLambertMaterial attach="material" color="orange" />
        </mesh>
    )
}

export function WaterTreatment1(props){
    let height = 0.7
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.3, height, 0.3]} />
            <meshLambertMaterial attach="material" color="darkblue" />
        </mesh>
    )
}

export function WaterTreatment2(props){
    let height = 1.2
    return (
        <mesh
            {...props}
            position={[props.pos[0], height / 2, props.pos[2]]}
        >
            <boxBufferGeometry attach="geometry" args={[0.8, height, 0.8]} />
            <meshLambertMaterial attach="material" color="darkblue" />
        </mesh>
    )
}