export default function Progress(residents){
    console.log(`residents`, residents);
    if(residents<=100){
        return 1
    }else if(residents<=500){
        return 2
    }else if(residents<=1000){
        return 3
    }else if(residents<=3000){
        return 4
    }else if(residents<=6000){
        return 5
    }else if(residents>=6000){
        return 6
    }else return 0
}