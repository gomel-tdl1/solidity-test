//SPDX-License-Identifier: Unlicense
pragma solidity ^0.8.0;

import "hardhat/console.sol";
import "@chainlink/contracts/src/v0.8/interfaces/FeedRegistryInterface.sol";
import "@chainlink/contracts/src/v0.8/Denominations.sol";

contract Lottery {

    FeedRegistryInterface internal registry;

    /**
     * Network: Ethereum Kovan
     * Feed Registry: 0xAa7F6f7f507457a1EE157fE97F6c7DB2BEec5cD0
     */
    constructor(address _registry) {
        registry = FeedRegistryInterface(_registry);
    }

    mapping(address => uint256) public gamerToAmount;
    address[] public gamersAddresses;
    uint256 randNonce = 0;

    uint64 lastCooldown = uint64(block.timestamp);
    uint256 cooldownTime = 1 minutes;

    modifier afterCooldown() {
        require(uint64(block.timestamp) >= lastCooldown);
        _;
        lastCooldown = uint64(block.timestamp + cooldownTime);
    }

    function getPriceETHToToken(address _quote) public view returns(int) {
        (
            uint80 roundID,
            int price,
            uint startedAt,
            uint timeStamp,
            uint80 answeredInRound
        ) = registry.latestRoundData(Denominations.ETH, _quote);
        return price;
    }

    function placeABet() external payable {
        require(msg.value > 0);
        if (gamerToAmount[msg.sender] == 0) gamersAddresses.push(msg.sender);
        gamerToAmount[msg.sender] += msg.value;
    }

    struct Gamer {
        address payable gamerAddress;
        uint256[2] winDiapazon;
    }

    function play() external afterCooldown {
        Gamer[] memory gamers = new Gamer[](gamersAddresses.length);
        // calculation the winning percentage depending on the amount of invested funds
        for (uint256 i = 0; i < gamersAddresses.length; i++) {
            uint256 percent = (gamerToAmount[gamersAddresses[i]] * 100) /
                address(this).balance;
            uint256 winStartValue;
            if (i == 0) winStartValue = 0;
            else winStartValue = gamers[i - 1].winDiapazon[1] + 1;
            gamers[i] = Gamer(
                payable(gamersAddresses[i]),
                [winStartValue, winStartValue + percent]
            );
        }

        uint256 random = uint256(
            keccak256(abi.encodePacked(block.timestamp, msg.sender, randNonce))
        ) % 100;
        randNonce++;
        Gamer memory winner;
        for (uint256 i = 0; i < gamers.length; i++) {
          console.log(gamers[i].winDiapazon[0], gamers[i].winDiapazon[1], random, gamers[i].winDiapazon[0] <= random && gamers[i].winDiapazon[1] >= random);
            if (
                gamers[i].winDiapazon[0] <= random &&
                gamers[i].winDiapazon[1] >= random
            ) {
                winner = gamers[i];
                break;
            }
        }
        console.log(
            winner.gamerAddress,
            winner.winDiapazon[0],
            winner.winDiapazon[1]
        );
        winner.gamerAddress.transfer(address(this).balance);
    }
}
