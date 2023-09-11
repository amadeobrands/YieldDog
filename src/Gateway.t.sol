// SPDX-License-Identifier: MIT
pragma solidity 0.8.17;

import {Test} from "forge-std/Test.sol";
import "forge-std/console.sol";

import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";
import {WETH} from "solmate/tokens/WETH.sol";
import {MockERC20} from "./MockERC20.sol";

import {IGateway} from "./IGateway.sol";
import {Gateway} from "./Gateway.sol";
import {MasterPool} from "./MasterPool.sol";

contract GatewayTest is IGateway, Test {
    Gateway internal _gateway;
    MasterPool internal _pool;

    // // eth mainnet weth
    // IWETH internal _weth =
    //     IWETH(payable(0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2));
    // // eth mainnet wsteth
    // IERC20 internal _wsteth =
    //     IERC20(0x7f39C581F595B53c5cb19bD0b3f8dA6c935E2Ca0);
    // // eth mainnet reth
    // IERC20 internal _reth = IERC20(0xae78736Cd615f374D3085123A210448E74Fc6393);
    // // eth mainnet sfrxeth
    // IERC20 internal _sfrxeth =
    //     IERC20(0xac3E018457B222d93114458476f3E3416Abbe38F);
    // // eth mainnet balLSD
    // IERC20 internal _balLSD =
    //     IERC20(0x42ED016F826165C2e5976fe5bC3df540C5aD0Af7);
    // // eth mainnet crvLSD
    // IERC20 internal _crvLSD =
    //     IERC20(0x2570f1bD5D2735314FC102eb12Fc1aFe9e6E7193);

    WETH internal _weth;
    MockERC20 internal _balLSD;
    MockERC20 internal _crvLSD;

    function setUp() public {
        _weth = new WETH();
        _balLSD = new MockERC20("Balancer LSD", "BAL-LSD", 18);
        _crvLSD = new MockERC20("Curve LSD", "CRV-LSD", 18);

        _pool = new MasterPool(_balLSD, _crvLSD, "YieldDogLSD", "YDLSD");
        _gateway = new Gateway();

        // minting some tokens for testing
        vm.deal(address(this), 100 ether);
        _weth.deposit{value: 50 ether}();
        _balLSD.mint(address(this), 100e18);
        _crvLSD.mint(address(this), 100e18);
    }

    function testDeposit() public {
        uint256 depositAmount = 10 ether;
        // checks that pool shares are 0
        assertEq(_pool.balanceOf(address(this)), 0);
        // prepare for event
        vm.expectEmit(true, false, false, true, address(_gateway));
        // We emit the event we expect to see.
        emit Deposit(address(this), depositAmount, depositAmount);
        // deposit
        _gateway.deposit{value: depositAmount}();
        // check new pool shares, right now shares are 1:1
        assertEq(_pool.balanceOf(address(this)), depositAmount);
    }
}
