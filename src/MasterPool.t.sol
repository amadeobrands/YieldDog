// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";

import {MasterPool} from "./MasterPool.sol";
import {IMasterPool} from "./IMasterPool.sol";

import {MockERC20} from "./MockERC20.sol";

import "forge-std/console.sol";

contract MasterPoolTest is IMasterPool, Test {
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

        // minting some pool tokens for testing
        balLSD.mint(address(this), 100e18);
        crvLSD.mint(address(this), 100e18);
    }

    function testInit() public {
        assertEq(pool.name(), "YieldDogLSD");
        assertEq(pool.symbol(), "YDLSD");
        assertEq(pool.decimals(), 18);
    }

    function testAddliquidity() public {
        uint256 depositAmount = 1e18;
        // approving the pools tokens first
        balLSD.approve(address(pool), depositAmount);
        crvLSD.approve(address(pool), depositAmount);

        // check current liquidity
        (uint256 amount0, uint256 amount1) = pool.totalReserves();
        assertEq(amount0, 0);
        assertEq(amount1, 0);

        // check event
        // Now checking the event
        // First time working with expectEmit so I'll be commenting a lot
        // https://book.getfoundry.sh/cheatcodes/expect-emit?highlight=expectEmitted#examples
        // function expectEmit(
        //     bool checkTopic1,
        //     bool checkTopic2,
        //     bool checkTopic3,
        //     bool checkData,
        //     address emitter
        // ) external;
        vm.expectEmit(true, true, false, true, address(pool));
        // We emit the event we expect to see.
        emit AddLiquidity(address(this), address(this), 100, 100);
        // adding liquidity
        pool.addLiquidity(100, 100, address(this));
    }
}
