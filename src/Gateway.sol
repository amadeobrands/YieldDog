// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";
import {IMasterPool} from "./IMasterPool.sol";

import {IGateway} from "./IGateway.sol";

contract Gateway is IGateway {
    /*//////////////////////////////////////////////////////////////
                            IMMUTABLES
    //////////////////////////////////////////////////////////////*/

    IERC20 public balLSD;
    IERC20 public crvLSD;
    IMasterPool public ydLSD;

    constructor(IERC20 balLSD_, IERC20 crvLSD_, IMasterPool ydLSD_) {
        balLSD = balLSD_;
        crvLSD = crvLSD_;
        ydLSD = ydLSD_;
    }

    function approveTokens() public {
        balLSD.approve(address(ydLSD), type(uint256).max);
        crvLSD.approve(address(ydLSD), type(uint256).max);
    }

    /*//////////////////////////////////////////////////////////////
                        DEPOSIT/WITHDRAW
    //////////////////////////////////////////////////////////////*/

    function deposit() public payable returns (uint256 shares) {
        // quick sanity check
        require(msg.value > 0, "msg.value is 0");

        shares = ydLSD.addLiquidity(msg.value, msg.value, msg.sender);

        emit Deposit(msg.sender, msg.value, shares);
    }

    receive() external payable {
        deposit();
    }

    function redeem(uint256 shares) public returns (uint256 amount) {
        // quick sanity check
        require(shares > 0, "shares is 0");

        (amount, ) = ydLSD.removeLiquidity(shares, msg.sender, msg.sender);

        payable(msg.sender).transfer(amount);

        emit Withdraw(msg.sender, amount, shares);
    }
}
