// SPDX-License-Identifier: MIT
pragma solidity ^0.8.0;

import {IERC20} from "@openzeppelin/token/ERC20/IERC20.sol";

import {IGateway} from "./IGateway.sol";

contract Gateway is IGateway {
    /*//////////////////////////////////////////////////////////////
                            IMMUTABLES
    //////////////////////////////////////////////////////////////*/

    IERC20 public balLSD;
    IERC20 public crvLSD;
    IERC20 public ydLSD;
    IERC20 public weth;

    constructor() {}

    /*//////////////////////////////////////////////////////////////
                        DEPOSIT/WITHDRAW
    //////////////////////////////////////////////////////////////*/

    function deposit() public payable virtual {
        // _mint(msg.sender, msg.value);

        emit Deposit(msg.sender, msg.value, msg.value);
    }

    receive() external payable virtual {
        deposit();
    }

    // function withdraw(uint256 amount) public virtual {
    //     _burn(msg.sender, amount);

    //     emit Withdrawal(msg.sender, amount);

    //     msg.sender.safeTransferETH(amount);
    // }

    /*//////////////////////////////////////////////////////////////
                        ACCOUNTING LOGIC
    //////////////////////////////////////////////////////////////*/
}
