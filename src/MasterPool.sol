// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "solmate/tokens/ERC20.sol";

import {IMasterPool} from "./IMasterPool.sol";

// This is a mashup between solmate ERC4626 and uniswap v2
// https://github.com/transmissions11/solmate/blob/main/src/mixins/ERC4626.sol
// https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol
contract MasterPool is IMasterPool, ERC20 {
    /*//////////////////////////////////////////////////////////////
                            IMMUTABLES
    //////////////////////////////////////////////////////////////*/

    ERC20 public immutable asset0;
    ERC20 public immutable asset1;

    uint256 public reserve0;
    uint256 public reserve1;

    // name and symbol are of the pool itself ex: YieldDogLSD YDLSD
    constructor(
        ERC20 asset0_,
        ERC20 asset1_,
        string memory name_,
        string memory symbol_
    ) ERC20(name_, symbol_, 18) {
        asset0 = asset0_;
        asset1 = asset1_;
    }

    /*//////////////////////////////////////////////////////////////
                        ADD/REMOVE LIQUIDITY
    //////////////////////////////////////////////////////////////*/

    function addLiquidity(
        uint256 amount0,
        uint256 amount1,
        address receiver
    ) external returns (uint256 shares) {
        // quick check for amounts
        require(amount0 > 0, "amount0 is 0");
        require(amount1 > 0, "amount1 is 0");
        // both amount must be equal for hackthon
        require(amount0 == amount1, "amount0 and amount1 must be equal");
        // shares is same amount as single amount
        uint shares = amount0;
        // transfer the assets to the contract
        asset0.transferFrom(msg.sender, address(this), amount0);
        asset1.transferFrom(msg.sender, address(this), amount1);
        // call the inhereted mint function from erc20
        _mint(receiver, shares);
        // update reserves
        syncReserves();
        // emit the event
        emit AddLiquidity(msg.sender, receiver, amount0, amount1);
    }

    /*//////////////////////////////////////////////////////////////
                        ACCOUNTING LOGIC
    //////////////////////////////////////////////////////////////*/

    function totalReserves()
        public
        view
        returns (uint256 _reserve0, uint256 _reserve1)
    {
        _reserve0 = reserve0;
        _reserve1 = reserve1;
    }

    function syncReserves() public {
        reserve0 = asset0.balanceOf(address(this));
        reserve1 = asset1.balanceOf(address(this));
    }
}
