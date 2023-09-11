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
    ) external override returns (uint256 shares) {
        // quick check for amounts
        require(amount0 > 0, "amount0 is 0");
        require(amount1 > 0, "amount1 is 0");
        // both amount must be equal for hackthon
        require(amount0 == amount1, "amount0 and amount1 must be equal");
        // shares is same amount as single amount
        // todo: have a real shares calculation
        shares = amount0;
        // transfer the assets to the contract
        asset0.transferFrom(msg.sender, address(this), amount0);
        asset1.transferFrom(msg.sender, address(this), amount1);
        // call the inhereted mint function from erc20
        _mint(receiver, shares);
        // update reserves
        syncReserves();
        // emit the event
        emit AddLiquidity(msg.sender, receiver, amount0, amount1, shares);
    }

    function removeLiquidity(
        uint256 shares,
        address receiver,
        address owner
    ) external override returns (uint256 amount0, uint256 amount1) {
        // quick check for amounts
        require(shares > 0, "shares is 0");

        // if (msg.sender != owner) {
        //     uint256 allowed = allowance[owner][msg.sender]; // Saves gas for limited approvals.

        //     if (allowed != type(uint256).max) allowance[owner][msg.sender] = allowed - shares;
        // }

        // shares is same amount as single amount
        // todo: have a real shares calculation
        amount0 = shares;
        amount1 = shares;
        // transfer tokens
        asset0.transfer(receiver, amount0);
        asset1.transfer(receiver, amount1);
        // call the inhereted burn function from erc20
        _burn(owner, shares);
        // update reserves
        syncReserves();
        // emit the event
        emit RemoveLiquidity(
            msg.sender,
            receiver,
            owner,
            amount0,
            amount1,
            shares
        );
    }

    function swap(
        uint256 amount0In,
        uint256 amount1In,
        address to
    ) external virtual {
        // quick reserves check
        require(reserve0 > 0 || reserve1 > 0, "pool empty");

        // quick check for amounts
        if (amount0In > 0) {
            require(amount1In == 0, "can only have one input");
        } else if (amount1In > 0) {
            require(amount0In == 0, "can only have one input");
        } else {
            revert("no input");
        }

        // todo: have an actual calculation xy=k
        uint256 amount0Out = amount1In;
        uint256 amount1Out = amount0In;
        // do the swap
        if (amount0In > 0) {
            // transfer the assets to the contract
            asset0.transferFrom(msg.sender, address(this), amount0In);
            // send the other asset to the receiver
            asset1.transfer(to, amount1Out);
        } else {
            // transfer the assets to the contract
            asset1.transferFrom(msg.sender, address(this), amount1In);
            // send the other asset to the receiver
            asset0.transfer(to, amount0Out);
        }
        // update reserves
        syncReserves();
        // emit the event
        emit Swap(msg.sender, to, amount0In, amount1In, amount0Out, amount1Out);
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
