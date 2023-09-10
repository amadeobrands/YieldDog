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
        uint256 amount0 = 0;
        uint256 amount1 = 0;
        uint256 depositAmount = 1e18;
        // approving the pools tokens first
        balLSD.approve(address(pool), depositAmount);
        crvLSD.approve(address(pool), depositAmount);

        // check current liquidity
        (amount0, amount1) = pool.totalReserves();
        assertEq(amount0, 0);
        assertEq(amount1, 0);
        // check current shares
        assertEq(pool.balanceOf(address(this)), 0);

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
        emit AddLiquidity(
            address(this),
            address(this),
            depositAmount, // amount0
            depositAmount, // amount1
            depositAmount // shares
        );
        // adding liquidity
        uint256 shares = pool.addLiquidity(
            depositAmount,
            depositAmount,
            address(this)
        );
        // check returned shares
        assertEq(shares, depositAmount);

        // check new liquidity
        (amount0, amount1) = pool.totalReserves();
        assertEq(amount0, depositAmount);
        assertEq(amount1, depositAmount);
        // check new shares
        assertEq(pool.balanceOf(address(this)), depositAmount);
    }

    function testRemoveliquidity() public {
        uint256 amount0 = 0;
        uint256 amount1 = 0;
        uint256 depositAmount = 1e18;
        // approving the pools tokens first
        balLSD.approve(address(pool), depositAmount);
        crvLSD.approve(address(pool), depositAmount);
        // adding liquidity
        uint256 shares = pool.addLiquidity(
            depositAmount,
            depositAmount,
            address(this)
        );

        vm.expectEmit(true, true, false, true, address(pool));
        // We emit the event we expect to see.
        emit RemoveLiquidity(
            address(this),
            address(this),
            depositAmount, // amount0
            depositAmount, // amount1
            depositAmount // shares
        );
        // removing liquidity
        (amount0, amount1) = pool.removeLiquidity(shares, address(this));
        // check returned tokens
        assertEq(amount0, depositAmount);
        assertEq(amount1, depositAmount);

        // check new liquidity
        (amount0, amount1) = pool.totalReserves();
        assertEq(amount0, 0);
        assertEq(amount1, 0);
        // check new shares
        assertEq(pool.balanceOf(address(this)), 0);
    }

    function testSwap() public {
        uint256 depositAmount = 10e18;
        uint256 swapAmount = 1e18;
        // approving the pools tokens first
        balLSD.approve(address(pool), depositAmount);
        crvLSD.approve(address(pool), depositAmount);
        // adding liquidity
        pool.addLiquidity(depositAmount, depositAmount, address(this));

        // check my current balance
        assertEq(balLSD.balanceOf(address(this)), 90e18);
        assertEq(crvLSD.balanceOf(address(this)), 90e18);

        // approve before swap
        balLSD.approve(address(pool), swapAmount);
        // event debugging
        vm.expectEmit(true, true, false, true, address(pool));
        // We emit the event we expect to see.
        emit Swap(
            address(this),
            address(this),
            swapAmount, // amount0In
            0, // amount1In
            0, // amount0Out
            swapAmount // amount1Out
        );

        pool.swap(swapAmount, 0, address(this));

        // check my current balance
        assertEq(balLSD.balanceOf(address(this)), 89e18);
        assertEq(crvLSD.balanceOf(address(this)), 91e18);
    }
}
