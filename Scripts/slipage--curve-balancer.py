import pandas as pd
import matplotlib.pyplot as plt
import requests

# Mock function to simulate fetching data from Curve and Balancer
# In a real-world scenario, you'd replace these with API calls or smart contract interactions
def fetch_curve_data():
    return {'eth_price': 3000, 'wsteth_price': 2998, 'volume': 1000}

def fetch_balancer_data():
    return {'eth_price': 3002, 'wsteth_price': 3000, 'volume': 900}

# Fetch data
curve_data = fetch_curve_data()
balancer_data = fetch_balancer_data()

# Create DataFrame
df = pd.DataFrame({
    'Platform': ['Curve', 'Balancer'],
    'ETH Price (USD)': [curve_data['eth_price'], balancer_data['eth_price']],
    'wstETH Price (USD)': [curve_data['wsteth_price'], balancer_data['wsteth_price']],
    'Volume (ETH)': [curve_data['volume'], balancer_data['volume']]
})

# Create visual representation using matplotlib
plt.figure(figsize=(12, 6))

plt.subplot(1, 3, 1)
plt.bar(df['Platform'], df['ETH Price (USD)'])
plt.title('ETH Price (USD)')
plt.xlabel('Platform')
plt.ylabel('Price (USD)')

plt.subplot(1, 3, 2)
plt.bar(df['Platform'], df['wstETH Price (USD)'])
plt.title('wstETH Price (USD)')
plt.xlabel('Platform')
plt.ylabel('Price (USD)')

plt.subplot(1, 3, 3)
plt.bar(df['Platform'], df['Volume (ETH)'])
plt.title('Volume (ETH)')
plt.xlabel('Platform')
plt.ylabel('Volume (ETH)')

plt.tight_layout()
plt.show()
