// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";

import {MasterPool} from "./MasterPool.sol";

import {MockERC20} from "./MockERC20.sol";

import "forge-std/console.sol";

contract MasterPoolTest is Test {
    // Event to be emitted when adding liquidity
    event Deposit(
        address indexed caller,
        address indexed owner,
        uint256 amount0,
        uint256 amount1
    );
    // Event to be emitted when removing liquidity
    event Withdraw(
        address indexed caller,
        address indexed receiver,
        address indexed owner,
        uint256 amount0,
        uint256 amount1
    );
    // Event to be emitted when swapping
    event Swap(
        address indexed caller,
        address indexed receiver,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out
    );

    // Pool to be tested
    MasterPool pool;
    // All the usefull tokens
    MockERC20 wsteth;
    MockERC20 reth;
    MockERC20 sfrxeth;
    // Pools we gonna build on top of
    MockERC20 balLSD;
    MockERC20 crvLSD;

    function setUp() public {
        wsteth = new MockERC20("Wrapped Staked Ether", "WSTETH", 18);
        reth = new MockERC20("Rocket Pool ETH", "RETH", 18);
        sfrxeth = new MockERC20("Staked FRAX ETH", "SFRXETH", 18);

        balLSD = new MockERC20("Balancer LSD", "BAL-LSD", 18);
        crvLSD = new MockERC20("Curve LSD", "CRV-LSD", 18);

        pool = new MasterPool(balLSD, crvLSD, "YieldDogLSD", "YDLSD");
    }

    function testInit() public {
        assertEq(pool.name(), "YieldDogLSD");
        assertEq(pool.symbol(), "YDLSD");
        assertEq(pool.decimals(), 18);
    }
}
