// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMasterPool {
    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    // caller: tokens IN from
    // receiver: share OUT to
    event AddLiquidity(
        address indexed caller,
        address indexed receiver,
        uint256 amount0,
        uint256 amount1,
        uint256 shares
    );

    // caller: shares IN from
    // receiver: tokens OUT to
    event RemoveLiquidity(
        address indexed caller,
        address indexed receiver,
        uint256 amount0,
        uint256 amount1,
        uint256 shares
    );

    // caller: token X IN from
    // receiver: token Y OUT to
    event Swap(
        address indexed caller,
        address indexed receiver,
        uint256 amount0In,
        uint256 amount1In,
        uint256 amount0Out,
        uint256 amount1Out
    );
}
