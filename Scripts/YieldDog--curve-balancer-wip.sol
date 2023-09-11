pragma solidity ^0.8.0;

contract AMMCurve {
    uint256 public curveLPTokens;
    uint256 public balancerLPTokens;
    uint256 public fee = 3;  // in basis points, i.e., 0.03%

    constructor(uint256 _curveLPTokens, uint256 _balancerLPTokens) {
        curveLPTokens = _curveLPTokens;
        balancerLPTokens = _balancerLPTokens;
    }

    function swap(uint256 swapAmount) public returns (uint256) {
        uint256 feeAmount = (swapAmount * fee) / 10000;  // Calculate the fee
        uint256 tokenBReceived = ((swapAmount - feeAmount) * balancerLPTokens) / (curveLPTokens + swapAmount - feeAmount);
        
        curveLPTokens += swapAmount;
        balancerLPTokens -= tokenBReceived;
        
        return tokenBReceived;
    }

    function addLiquidity(uint256 curveLPAdded, uint256 balancerLPAdded) public {
        curveLPTokens += curveLPAdded;
        balancerLPTokens += balancerLPAdded;
    }

    function removeLiquidity(uint256 curveLPRemoved, uint256 balancerLPRemoved) public {
        curveLPTokens -= curveLPRemoved;
        balancerLPTokens -= balancerLPRemoved;
    }
}
