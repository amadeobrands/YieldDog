// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMasterPool {
    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

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

    function addLiquidity(
        uint256 amount0,
        uint256 amount1,
        address receiver
    ) external returns (uint256 shares);

    function removeLiquidity(
        uint256 shares,
        address receiver,
        address owner
    ) external returns (uint256 amount0, uint256 amount1);
}
