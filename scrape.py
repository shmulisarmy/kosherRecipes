import requests
from bs4 import BeautifulSoup

# Define the product name and URL
product_name = "blueberries"
url = f"https://www.instacart.com/store/costco/s?k={product_name}"

# Send an HTTP GET request to the URL
headers = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/91.0.4472.124 Safari/537.36"
}
response = requests.get(url, headers=headers)


# print(f'{response = }')


# Parse the page content with BeautifulSoup
soup = BeautifulSoup(response.text, 'html.parser')

# print(f'{soup = }')
# Define selectors for product name, price, and container
product_selector = "[aria-label=Product]"
name_element_class = "e-1pnf8tv"
price_element_class = "e-1x7s36o"

# Find and extract product details
products = soup.select("div", {"aria-label": "Product"})
for product in products:
    print(f'{product = }')
    
    name_element = product.select_one(f".{name_element_class}")
    price_element = product.select_one(f".{price_element_class}")
    
    if name_element and price_element:
        name = name_element.text.strip()
        price = price_element.text.strip()
        print({"name": name, "price": price})

