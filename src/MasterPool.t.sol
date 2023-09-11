// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";
import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";

import {MasterPool} from "./MasterPool.sol";

import {MockERC20} from "./MockERC20.sol";

import "forge-std/console.sol";

contract MasterPoolTest is Test {
    // caller: tokens IN from
    // receiver: shares OUT to
    event AddLiquidity(
        address indexed caller,
        address indexed receiver,
        uint256 amount0,
        uint256 amount1,
        uint256 shares
    );

    // caller: caller of the function (can be anyone)
    // receiver: tokens OUT to
    // owner: shares IN from
    event RemoveLiquidity(
        address indexed caller,
        address indexed receiver,
        address indexed owner,
        uint256 amount0,
        uint256 amount1,
        uint256 shares
    );

    // caller: tokens X IN from
    // receiver: tokens Y OUT to
    event Swap(
        address indexed caller,
        address indexed receiver,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out
    );

    // Pool to be tested
    MasterPool internal _pool;
    // All the usefull tokens
    // MockERC20 internal _wsteth;
    // MockERC20 internal _reth;
    // MockERC20 internal _sfrxeth;
    // Pools we gonna build on top of
    MockERC20 internal _balLSD;
    MockERC20 internal _crvLSD;

    // eth mainnet wsteth
    IERC20 internal _wsteth =
        IERC20(0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0);
    // eth mainnet reth
    IERC20 internal _reth = IERC20(0xae78736Cd615f374D3085123A210448E74Fc6393);
    // eth mainnet sfrxeth
    IERC20 internal _sfrxeth =
        IERC20(0xac3E018457B222d93114458476f3E3416Abbe38F);

    function setUp() public {
        // _wsteth = new MockERC20("Wrapped Staked Ether", "WSTETH", 18);
        // _reth = new MockERC20("Rocket Pool ETH", "RETH", 18);
        // _sfrxeth = new MockERC20("Staked FRAX ETH", "SFRXETH", 18);

        _balLSD = new MockERC20("Balancer LSD", "BAL-LSD", 18);
        _crvLSD = new MockERC20("Curve LSD", "CRV-LSD", 18);

        _pool = new MasterPool(
            IERC20(address(_balLSD)),
            IERC20(address(_crvLSD)),
            "YieldDogLSD",
            "YDLSD"
        );

        // minting some _pool tokens for testing
        _balLSD.mint(address(this), 100e18);
        _crvLSD.mint(address(this), 100e18);
    }

    function testInit() public {
        assertEq(_pool.name(), "YieldDogLSD");
        assertEq(_pool.symbol(), "YDLSD");
        assertEq(_pool.decimals(), 18);
    }

    function testAddliquidity() public {
        uint256 amount0 = 0;
        uint256 amount1 = 0;
        uint256 depositAmount = 1e18;
        // approving the _pools tokens first
        _balLSD.approve(address(_pool), depositAmount);
        _crvLSD.approve(address(_pool), depositAmount);

        // check current liquidity
        (amount0, amount1) = _pool.totalReserves();
        assertEq(amount0, 0);
        assertEq(amount1, 0);
        // check current shares
        assertEq(_pool.balanceOf(address(this)), 0);

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
        vm.expectEmit(true, true, false, true, address(_pool));
        // We emit the event we expect to see.
        emit AddLiquidity(
            address(this),
            address(this),
            depositAmount, // amount0
            depositAmount, // amount1
            depositAmount // shares
        );
        // adding liquidity
        uint256 shares = _pool.addLiquidity(
            depositAmount,
            depositAmount,
            address(this)
        );
        // check returned shares
        assertEq(shares, depositAmount);

        // check new liquidity
        (amount0, amount1) = _pool.totalReserves();
        assertEq(amount0, depositAmount);
        assertEq(amount1, depositAmount);
        // check new shares
        assertEq(_pool.balanceOf(address(this)), depositAmount);

        // accounting functions tests
        assertEq(_pool.totalAssets(), depositAmount * 6);
        assertEq(_pool.sharesToAssets(shares), depositAmount * 6);
        uint256[] memory _assets = _pool.sharesToUnderlyingAssets(shares);
        assertEq(_assets[0], (depositAmount * 3) / 2); // 25% _wsteth
        assertEq(_assets[1], (depositAmount * 3) / 2); // 25% _reth
        assertEq(_assets[2], depositAmount * 3); // 50% _sfrxeth
    }

    function testRemoveliquidity() public {
        uint256 amount0 = 0;
        uint256 amount1 = 0;
        uint256 depositAmount = 1e18;
        // approving the _pools tokens first
        _balLSD.approve(address(_pool), depositAmount);
        _crvLSD.approve(address(_pool), depositAmount);
        // adding liquidity
        uint256 shares = _pool.addLiquidity(
            depositAmount,
            depositAmount,
            address(this)
        );

        vm.expectEmit(true, true, false, true, address(_pool));
        // We emit the event we expect to see.
        emit RemoveLiquidity(
            address(this),
            address(this),
            address(this),
            depositAmount, // amount0
            depositAmount, // amount1
            depositAmount // shares
        );
        // removing liquidity
        (amount0, amount1) = _pool.removeLiquidity(
            shares,
            address(this),
            address(this)
        );
        // check returned tokens
        assertEq(amount0, depositAmount);
        assertEq(amount1, depositAmount);

        // check new liquidity
        (amount0, amount1) = _pool.totalReserves();
        assertEq(amount0, 0);
        assertEq(amount1, 0);
        // check new shares
        assertEq(_pool.balanceOf(address(this)), 0);
    }

    function testSwap() public {
        uint256 depositAmount = 10e18;
        uint256 swapAmount = 1e18;
        // approving the _pools tokens first
        _balLSD.approve(address(_pool), depositAmount);
        _crvLSD.approve(address(_pool), depositAmount);
        // adding liquidity
        _pool.addLiquidity(depositAmount, depositAmount, address(this));

        // check my current balance
        assertEq(_balLSD.balanceOf(address(this)), 90e18);
        assertEq(_crvLSD.balanceOf(address(this)), 90e18);

        // approve before swap
        _balLSD.approve(address(_pool), swapAmount);
        // event debugging
        vm.expectEmit(true, true, false, true, address(_pool));
        // We emit the event we expect to see.
        emit Swap(
            address(this),
            address(this),
            swapAmount, // amount0In
            0, // amount1In
            0, // amount0Out
            swapAmount // amount1Out
        );

        _pool.swap(swapAmount, 0, address(this));

        // check my current balance
        assertEq(_balLSD.balanceOf(address(this)), 89e18);
        assertEq(_crvLSD.balanceOf(address(this)), 91e18);
    }
}
