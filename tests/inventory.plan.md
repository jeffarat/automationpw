# Inventory Page Test Plan

## Application Overview

The Swag Labs Inventory page is the main product display page where authenticated users can browse available products, filter and sort items, view product details, add items to their shopping cart, and proceed to checkout. This test plan covers all key user interactions and edge cases including product browsing, filtering, sorting, adding/removing items from cart, viewing product details, and navigation between pages.

## Test Scenarios

### 1. Product Display and Filtering

**Seed:** `tests/seed.spec.ts`

#### 1.1. Display all products on inventory page

**File:** `tests/inventory/display_products.spec.ts`

**Steps:**
  1. Navigate to the inventory page (login if necessary using standard_user/secret_sauce)
  2. Verify that all 6 products are displayed on the page
  3. Verify each product shows: product name, description, price, and add to cart button
  4. Verify products displayed are: Sauce Labs Backpack, Sauce Labs Bike Light, Sauce Labs Bolt T-Shirt, Sauce Labs Fleece Jacket, Sauce Labs Onesie, Test.allTheThings() T-Shirt (Red)

**Expected Results:**
  - All 6 products are visible on the page
  - Each product displays correct name, description, price, and action button
  - Page layout is clean and organized in a grid format

#### 1.2. Sort products by name A to Z

**File:** `tests/inventory/sort_name_asc.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Verify the sort dropdown is visible and defaults to 'Name (A to Z)'
  3. Verify products are sorted alphabetically from A to Z

**Expected Results:**
  - Sort dropdown is visible and accessible
  - Products are displayed in correct alphabetical order starting with 'Sauce Labs'

#### 1.3. Sort products by name Z to A

**File:** `tests/inventory/sort_name_desc.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click the sort dropdown and select 'Name (Z to A)'
  3. Verify products are re-ordered in reverse alphabetical order

**Expected Results:**
  - Products are displayed in reverse alphabetical order
  - Page updates dynamically without page reload

#### 1.4. Sort products by price low to high

**File:** `tests/inventory/sort_price_low_high.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click the sort dropdown and select 'Price (low to high)'
  3. Verify products are sorted by price from lowest to highest

**Expected Results:**
  - Products are displayed in correct price order: $7.99, $9.99, $15.99, $15.99, $29.99, $49.99

#### 1.5. Sort products by price high to low

**File:** `tests/inventory/sort_price_high_low.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click the sort dropdown and select 'Price (high to low)'
  3. Verify products are sorted by price from highest to lowest

**Expected Results:**
  - Products are displayed in reverse price order starting with $49.99 to $7.99

#### 1.6. Verify product prices are displayed correctly

**File:** `tests/inventory/verify_prices.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Note the prices displayed for each product
  3. Verify each product has a valid price format (e.g., $XX.XX)

**Expected Results:**
  - All products show prices in correct format
  - Prices are consistent across sorts and page reloads

### 2. Add to Cart Functionality

**Seed:** `tests/seed.spec.ts`

#### 2.1. Add single product to cart

**File:** `tests/inventory/add_single_product.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click 'Add to cart' button on the Sauce Labs Backpack
  3. Verify the cart badge updates to show '1'
  4. Verify the button changes to 'Remove'

**Expected Results:**
  - Cart icon updates with item count of 1
  - 'Add to cart' button becomes 'Remove' button
  - Page remains on inventory page

#### 2.2. Add multiple different products to cart

**File:** `tests/inventory/add_multiple_products.spec.ts`

**Steps:**
  1. Navigate to inventory page with empty cart
  2. Add Sauce Labs Backpack to cart
  3. Add Sauce Labs Bike Light to cart
  4. Add Sauce Labs Bolt T-Shirt to cart
  5. Verify cart badge now shows '3'

**Expected Results:**
  - Cart badge correctly shows '3' after adding three products
  - All 'Add to cart' buttons for selected items become 'Remove' buttons
  - Other products still show 'Add to cart' button

#### 2.3. Add same product twice (verify quantity handling)

**File:** `tests/inventory/add_same_product_twice.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Add Sauce Labs Backpack to cart
  3. Verify the button changes to 'Remove'
  4. Attempt to click 'Add to cart' again (should now show 'Remove')
  5. Navigate to cart to verify quantity

**Expected Results:**
  - First click changes button to 'Remove'
  - Cart badge shows '1' (not allowing duplicates on inventory page)
  - When viewing cart, product quantity shows correct amount

#### 2.4. Remove product from cart on inventory page

**File:** `tests/inventory/remove_from_inventory.spec.ts`

**Steps:**
  1. Navigate to inventory page with Sauce Labs Backpack in cart
  2. Verify 'Remove' button is displayed for the product
  3. Click 'Remove' button
  4. Verify cart badge updates or disappears
  5. Verify button reverts to 'Add to cart'

**Expected Results:**
  - Cart badge decreases by 1 or disappears if it was the only item
  - 'Remove' button changes back to 'Add to cart'
  - Product is no longer in cart

#### 2.5. Add to cart then remove from cart

**File:** `tests/inventory/add_remove_cycle.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Add Sauce Labs Onesie to cart (verify button changes to Remove)
  3. Remove Sauce Labs Onesie from cart (verify button changes back to Add to cart)
  4. Add it back to cart

**Expected Results:**
  - Button toggles correctly between 'Add to cart' and 'Remove'
  - Cart state persists correctly throughout the cycle
  - No errors or glitches occur

### 3. Product Details and Navigation

**Seed:** `tests/seed.spec.ts`

#### 3.1. Click on product name to view product details

**File:** `tests/inventory/view_product_details.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click on the product name 'Sauce Labs Backpack'
  3. Verify page navigates to product detail page for that product

**Expected Results:**
  - Product detail page loads with URL containing product ID
  - Product name, description, price, and image are displayed
  - Back to products button is available

#### 3.2. Click on product image to view product details

**File:** `tests/inventory/click_product_image.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click on the product image for Sauce Labs Bike Light
  3. Verify page navigates to product detail page

**Expected Results:**
  - Product detail page loads correctly for the clicked product
  - Product ID in URL matches the clicked product

#### 3.3. Navigate back from product details to inventory

**File:** `tests/inventory/back_from_details.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click on a product to view details
  3. Click 'Back to products' button
  4. Verify page returns to inventory with all products displayed

**Expected Results:**
  - Back button returns to inventory page
  - All products are still visible
  - Cart state is preserved

#### 3.4. View product description and specifications

**File:** `tests/inventory/view_product_info.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. For each product, note the description text displayed
  3. Click on a product to view full details
  4. Compare descriptions between inventory and detail pages

**Expected Results:**
  - Descriptions are visible and match between pages
  - All product information is accessible and readable

### 4. Cart Integration

**Seed:** `tests/seed.spec.ts`

#### 4.1. Cart badge displays correct count

**File:** `tests/inventory/cart_badge_count.spec.ts`

**Steps:**
  1. Navigate to inventory page with empty cart
  2. Add 2 products to cart
  3. Verify cart badge shows '2'
  4. Add 1 more product
  5. Verify cart badge shows '3'

**Expected Results:**
  - Cart badge accurately reflects total items added
  - Badge updates immediately after each add/remove action

#### 4.2. Click cart icon to navigate to cart page

**File:** `tests/inventory/click_cart_icon.spec.ts`

**Steps:**
  1. Navigate to inventory page with items in cart
  2. Click the shopping cart icon/badge
  3. Verify page navigates to cart page
  4. Verify added items are displayed in cart

**Expected Results:**
  - Cart page loads successfully
  - All items added on inventory page appear in cart
  - Item quantities are preserved

#### 4.3. Cart persists after sorting

**File:** `tests/inventory/cart_persists_sorting.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Add Sauce Labs Backpack to cart
  3. Change sort order to 'Price (high to low)'
  4. Verify cart still shows '1'
  5. Navigate to cart to confirm item is still there

**Expected Results:**
  - Cart badge remains unchanged after sorting
  - Item remains in cart when sort order changes
  - No items are lost during sort operation

#### 4.4. Cart persists after filtering/navigation

**File:** `tests/inventory/cart_persists_navigation.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Add multiple products to cart (e.g., 3 items)
  3. Click on a product to view details
  4. Click back to products
  5. Verify cart badge still shows correct count

**Expected Results:**
  - Cart count is preserved during navigation
  - All items remain in cart after viewing product details and returning

### 5. Navigation and Menu

**Seed:** `tests/seed.spec.ts`

#### 5.1. Open side menu from inventory page

**File:** `tests/inventory/open_menu.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Click the 'Open Menu' button
  3. Verify menu opens and shows options: All Items, About, Logout, Reset App State

**Expected Results:**
  - Menu panel slides in from the left
  - All menu items are visible and clickable
  - Menu does not obstruct product viewing

#### 5.2. Close side menu

**File:** `tests/inventory/close_menu.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Open the side menu
  3. Click 'Close Menu' button or press Escape
  4. Verify menu closes

**Expected Results:**
  - Menu slides back and is no longer visible
  - Page returns to normal inventory view

#### 5.3. Click 'All Items' in menu (already on inventory)

**File:** `tests/inventory/menu_all_items.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Open the menu
  3. Click 'All Items'
  4. Verify page remains on or reloads inventory with all products

**Expected Results:**
  - Page shows all products
  - No products are hidden or filtered

#### 5.4. Navigate to About from menu

**File:** `tests/inventory/menu_about.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Open the menu
  3. Click 'About'
  4. Verify page navigates to Sauce Labs website

**Expected Results:**
  - Page navigates to external Sauce Labs About page
  - Link opens correctly

#### 5.5. Reset app state from menu

**File:** `tests/inventory/menu_reset_state.spec.ts`

**Steps:**
  1. Navigate to inventory page with items in cart
  2. Open the menu
  3. Click 'Reset App State'
  4. Verify cart is cleared and all 'Remove' buttons become 'Add to cart'

**Expected Results:**
  - Cart badge disappears or shows '0'
  - All products show 'Add to cart' button again
  - No cart items remain

### 6. Edge Cases and Error Handling

**Seed:** `tests/seed.spec.ts`

#### 6.1. Attempt to add excessive items to cart

**File:** `tests/inventory/add_many_items.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Add all 6 products to cart one by one
  3. Verify each addition is successful
  4. Verify cart badge shows '6'

**Expected Results:**
  - All items can be added without error
  - Cart accurately tracks all 6 items
  - No duplicate items are created

#### 6.2. Handle rapid add/remove clicks

**File:** `tests/inventory/rapid_clicks.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Rapidly click 'Add to cart' and 'Remove' multiple times on same product
  3. Wait for page to stabilize
  4. Verify final state is consistent

**Expected Results:**
  - Page handles rapid clicks without errors
  - Final button state is correct (either Add or Remove)
  - Cart count is accurate

#### 6.3. Verify product data integrity

**File:** `tests/inventory/data_integrity.spec.ts`

**Steps:**
  1. Navigate to inventory page
  2. Take note of all visible product prices
  3. Reload page (F5)
  4. Verify prices and product information remain unchanged

**Expected Results:**
  - All product prices match after page reload
  - No data is lost or corrupted
  - Product list remains consistent
