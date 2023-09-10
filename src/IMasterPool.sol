// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {ERC20} from "solmate/tokens/ERC20.sol";

// This is a mashup between solmate ERC4626 and uniswap v2
// https://github.com/transmissions11/solmate/blob/main/src/mixins/ERC4626.sol
// https://github.com/Uniswap/v2-core/blob/master/contracts/UniswapV2Pair.sol
interface IMasterPool {
    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    // caller: adress from which the tokens will be taken from
    // owner: address to which the shares will be minted
    event AddLiquidity(
        address indexed caller,
        address indexed owner,
        uint256 amount0,
        uint256 amount1
    );

    // caller: caller of the function (can be anyone)
    // receiver: address to which the tokens will be sent to
    // owner: address from which the shares will be burned
    event RemoveLiquidity(
        address indexed caller,
        address indexed receiver,
        address indexed owner,
        uint256 amount0,
        uint256 amount1
    );

    // caller: address from which the tokens will be taken from
    // owner: address from which the other tokens will be sent to
    event Swap(
        address indexed caller,
        address indexed owner,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out
    );
}
