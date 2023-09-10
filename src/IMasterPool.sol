// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IMasterPool {
    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event Deposit(
        address indexed caller,
        address indexed owner,
        uint256 amount0,
        uint256 amount1
    );

    event Withdraw(
        address indexed caller,
        address indexed receiver,
        address indexed owner,
        uint256 amount0,
        uint256 amount1
    );

    event Swap(
        address indexed caller,
        address indexed receiver,
        uint amount0In,
        uint amount1In,
        uint amount0Out,
        uint amount1Out
    );
}
