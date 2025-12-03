**E2E Budget**

This repository contains the end-to-end test suite for my 50/30/20 Budget App, a financial tool that automatically distributes user income into:
 - 50% — Bills
 - 30% — Fun
 - 20% — Savings & Investing

As users enter their incomes and expenses, the app updates in real-time, displaying the remaining budgets for each category.

The goal of this suite is to demonstrate my approach to scalable, maintainable, and professional E2E automation 
using Playwright and TypeScript, while allowing individuals to manage their personal finances. 


**DISCLAIMER:**
  Currently, this test suite is configured to run against my local environment.
  As a result, the tests cannot be run externally.

**Prerequisites:**
- Node.js (v18+)
- npm
- TypeScript


**Installation and Setup**
1. Clone project: ``git clone https://github.com/Tacoholic/E2EBudget``
  
2. Enter folder: ``cd E2EBudget``

3. Install Dependencies:
   ``npm install``

4. Install Playwright:
   ``npm init playwright@latest``

5. Running tests:
   ``npx playwright test`` ||
   ``npx playwright --ui``
