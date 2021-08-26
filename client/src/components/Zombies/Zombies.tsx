import {Button, Input, notification} from "antd";
import {ethers} from "ethers";
import React, {FC, useEffect, useState} from "react";
import {ZOMBIE_FEEDING_ABI} from "../../contracts/ABIs/ZombieFeeding_ABI";
import {master_abi} from "../../contracts/ABIs/MasterChef";

type PropsType = {}

const Zombies: FC<PropsType> = (props) => {
    const [text, setText] = useState('');
    const zombieContractAddress = '0x83d914D340d5DFF374272bf68a0c501dED07ffa4'
    const provider = new ethers.providers.Web3Provider(window.ethereum);
    const signer = provider.getSigner()
    const ZombieFeedingContractSig = new ethers.Contract(zombieContractAddress, ZOMBIE_FEEDING_ABI, signer)

    const handleBet = async () => {
        await ZombieFeedingContractSig.placeABet({
            value: ethers.utils.parseEther(text),
        })
    }
    const handlePlay = async () => {
        try{
            const gamers = await ZombieFeedingContractSig.play()
            console.log(gamers)
        }catch (e) {
            if(e.message === 'MetaMask Tx Signature: User denied transaction signature.'){
                notification.error({
                    key: 'updatable',
                    message: 'Transaction canceled'
                })
            }else{
                notification.error({
                    key: 'updatable',
                    message: 'Please wait, you can play once in 2 minutes'
                })
            }
        }
    }

    return (
        <div>
            <Input onChange={(e) => setText(e.target.value)} value={text} placeholder='Enter amount' type={'number'}/>
            <Button type='primary' onClick={handleBet}>Set Bet</Button>
            <Button type='primary' onClick={handlePlay}>Play</Button>
        </div>
    )
}

export default Zombies