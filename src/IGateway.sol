// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

interface IGateway {
    /*//////////////////////////////////////////////////////////////
                                EVENTS
    //////////////////////////////////////////////////////////////*/

    event Deposit(address indexed caller, uint256 assets, uint256 shares);

    event Withdraw(address indexed caller, uint256 assets, uint256 shares);
}
