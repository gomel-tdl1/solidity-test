export const ZOMBIE_FEEDING_ABI = [
    {
        "inputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "name": "gamerToAmount",
        "outputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [
            {
                "internalType": "uint256",
                "name": "",
                "type": "uint256"
            }
        ],
        "name": "gamersAddresses",
        "outputs": [
            {
                "internalType": "address",
                "name": "",
                "type": "address"
            }
        ],
        "stateMutability": "view",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "placeABet",
        "outputs": [],
        "stateMutability": "payable",
        "type": "function"
    },
    {
        "inputs": [],
        "name": "play",
        "outputs": [
            {
                "components": [
                    {
                        "internalType": "address payable",
                        "name": "gamerAddress",
                        "type": "address"
                    },
                    {
                        "internalType": "uint256[2]",
                        "name": "winDiapazon",
                        "type": "uint256[2]"
                    }
                ],
                "internalType": "struct Lottery.Gamer[]",
                "name": "",
                "type": "tuple[]"
            }
        ],
        "stateMutability": "nonpayable",
        "type": "function"
    }
]