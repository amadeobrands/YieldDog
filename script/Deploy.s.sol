// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";
// import {WETH} from "solmate/tokens/WETH.sol";

import {MockERC20} from "../src/MockERC20.sol";
import {Gateway} from "../src/Gateway.sol";
import {MasterPool} from "../src/MasterPool.sol";

import {BaseScript} from "./Base.s.sol";

import "forge-std/console.sol";

/// @dev See the Solidity Scripting tutorial: https://book.getfoundry.sh/tutorials/solidity-scripting
contract Deploy is BaseScript {
    MockERC20 internal _balLSD;
    MockERC20 internal _crvLSD;

    function run()
        public
        broadcast
        returns (Gateway _gateway, MasterPool _pool)
    {
        _balLSD = new MockERC20("Balancer LSD", "BAL-LSD", 18);
        _crvLSD = new MockERC20("Curve LSD", "CRV-LSD", 18);

        _pool = new MasterPool(
            IERC20(address(_balLSD)),
            IERC20(address(_crvLSD)),
            "YieldDogLSD",
            "YDLSD"
        );
        _gateway = new Gateway(
            IERC20(address(_balLSD)),
            IERC20(address(_crvLSD)),
            _pool
        );

        _balLSD.mint(address(_gateway), 100e18);
        _crvLSD.mint(address(_gateway), 100e18);
        _gateway.approveTokens();
    }
}
