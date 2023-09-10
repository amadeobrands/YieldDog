// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IMasterPool} from "./IMasterPool.sol";
import {ERC20} from "solmate/tokens/ERC20.sol";

contract MasterPool is IMasterPool, ERC20 {
    /*//////////////////////////////////////////////////////////////
                            IMMUTABLES
    //////////////////////////////////////////////////////////////*/

    ERC20 public immutable asset0;
    ERC20 public immutable asset1;

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
}
