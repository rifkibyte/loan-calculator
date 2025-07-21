Ini adalah Schedule saya buatkan agar bisa di import dan reusabble

Misal
<Input ...

<Enum ...

<Year ..

<Percent

<Button ..


~/workspace/side-hustle/loan-calculator/src on  main! ⌚ 17:57:22
$ treeclean
.
├── app
│   ├── (calculators)
│   │   ├── car-loan
│   │   │   ├── budget
│   │   │   │   └── page.tsx
│   │   │   ├── complete
│   │   │   │   └── page.tsx
│   │   │   └── simple
│   │   │       └── page.tsx
│   │   ├── credit
│   │   │   └── annuity
│   │   │       └── page.tsx
│   │   ├── mortgage
│   │   │   ├── budget
│   │   │   │   └── page.tsx
│   │   │   ├── complete
│   │   │   │   └── page.tsx
│   │   │   ├── fixed
│   │   │   │   └── page.tsx
│   │   │   ├── house-price
│   │   │   │   └── page.tsx
│   │   │   ├── income
│   │   │   │   └── page.tsx
│   │   │   └── islamic-mortgage
│   │   │       └── page.tsx
│   │   ├── other-credit
│   │   │   ├── multi-purpose-loan
│   │   │   │   └── page.tsx
│   │   │   └── people-business-credit
│   │   │       └── page.tsx
│   │   └── personal-loan
│   │       ├── amount
│   │       │   └── page.tsx
│   │       └── budget
│   │           └── page.tsx
│   ├── favicon.ico
│   ├── globals.css
│   ├── layout.tsx
│   └── page.tsx
├── components
│   └── ui
│       ├── form
│       │   ├── Button.tsx
│       │   ├── CurrencyInput.tsx
│       │   ├── Input.tsx
│       │   ├── PercentInput.tsx
│       │   ├── YearInput.tsx
│       │   └── index.ts
│       └── result
│           ├── ExportButton.tsx
│           ├── ResultCard.tsx
│           ├── ResultGrid.tsx
│           ├── ResultRow.tsx
│           ├── ResultSection.tsx
│           ├── ResultTabs.tsx
│           └── index.ts
├── features
│   ├── car-loan
│   │   ├── budget
│   │   │   ├── CarLoanBudgetForm.tsx
│   │   │   ├── CarLoanBudgetResult.tsx
│   │   │   ├── CarLoanBudgetSchedule.tsx
│   │   │   └── index.ts
│   │   ├── complete
│   │   │   ├── CarLoanForm.tsx
│   │   │   ├── CarLoanResult.tsx
│   │   │   ├── CarLoanSchedule.tsx
│   │   │   └── index.ts
│   │   └── simple
│   │       ├── CarLoanSimpleForm.tsx
│   │       ├── CarLoanSimpleResult.tsx
│   │       ├── CarLoanSimpleSchedule.tsx
│   │       └── index.ts
│   ├── common
│   │   ├── Footer.tsx
│   │   ├── Header.tsx
│   │   ├── LoanResultDisplay.tsx
│   │   └── index.ts
│   ├── credit
│   │   └── annuity
│   │       ├── CreditAnnuityForm.tsx
│   │       ├── CreditAnnuityResult.tsx
│   │       ├── CreditAnnuitySchedule.tsx
│   │       └── index.ts
│   ├── mortgage
│   │   ├── budget
│   │   │   ├── MortgageBudgetForm.tsx
│   │   │   ├── MortgageBudgetResult.tsx
│   │   │   ├── MortgageBudgetSchedule.tsx
│   │   │   └── index.ts
│   │   ├── complete
│   │   │   ├── MortgageCompleteForm.tsx
│   │   │   ├── MortgageCompleteResult.tsx
│   │   │   ├── MortgageCompleteSchedule.tsx
│   │   │   └── index.ts
│   │   ├── fixed
│   │   │   ├── MortgageFixedForm.tsx
│   │   │   ├── MortgageFixedResult.tsx
│   │   │   ├── MortgageFixedSchedule.tsx
│   │   │   └── index.ts
│   │   ├── house-price
│   │   │   ├── MortgageHousePriceForm.tsx
│   │   │   ├── MortgageHousePriceResult.tsx
│   │   │   ├── MortgageHousePriceSchedule.tsx
│   │   │   └── index.ts
│   │   ├── income
│   │   │   ├── MortgageIncomeForm.tsx
│   │   │   ├── MortgageIncomeResult.tsx
│   │   │   ├── MortgageIncomeSchedule.tsx
│   │   │   └── index.ts
│   │   └── islamic-mortgage
│   │       ├── IslamicMortgageForm.tsx
│   │       ├── IslamicMortgageResult.tsx
│   │       ├── IslamicMortgageSchedule.tsx
│   │       └── index.ts
│   ├── other-credit
│   │   ├── multi-purpose-loan
│   │   │   ├── MultiPurposeLoanForm.tsx
│   │   │   ├── MultiPurposeLoanResult.tsx
│   │   │   ├── MultiPurposeLoanSchedule.tsx
│   │   │   └── index.ts
│   │   └── people-business-credit
│   │       ├── PeopleBusinessCreditForm.tsx
│   │       ├── PeopleBusinessCreditResult.tsx
│   │       ├── PeopleBusinessCreditSchedule.tsx
│   │       └── index.ts
│   └── personal-loan
│       ├── amount
│       │   ├── PersonalLoanAmountForm.tsx
│       │   ├── PersonalLoanAmountResult.tsx
│       │   ├── PersonalLoanAmountSchedule.tsx
│       │   └── index.ts
│       └── budget
│           ├── PersonalLoanForm.tsx
│           ├── PersonalLoanResult.tsx
│           ├── PersonalLoanSchedule.tsx
│           └── index.ts
├── types
│   ├── car-loan.ts
│   ├── common.ts
│   ├── credit-annuity.ts
│   ├── islamic-mortgage.ts
│   ├── mortgage-budget.ts
│   ├── mortgage-fixed.ts
│   ├── mortgage-house-price.ts
│   ├── mortgage-income.ts
│   ├── mortgage.ts
│   ├── multi-purpose-loan.ts
│   ├── peoples-business-credit.ts
│   ├── personal-loan-amount.ts
│   └── personal-loan.ts
└── utils
    ├── calculators
    │   ├── car-loan
    │   │   ├── budgetCalculator.ts
    │   │   ├── completeCalculator.ts
    │   │   └── simpleCalculator.ts
    │   ├── credit
    │   │   └── annuityCalculator.ts
    │   ├── mortgage
    │   │   ├── budgetCalculator.ts
    │   │   ├── fixedCalculator.ts
    │   │   ├── housePriceCalculator.ts
    │   │   ├── incomeCalculator.ts
    │   │   ├── islamicMortgageCalculator.ts
    │   │   └── mortgageCalculator.ts
    │   ├── other-credit
    │   │   ├── multiPurposeLoanCalculator.ts
    │   │   └── peopleBusinessCreditCalculator.ts
    │   └── personal-loan
    │       ├── personalLoanAmountCalculator.ts
    │       └── personalLoanCalculator.ts
    ├── formatters.ts
    └── index.ts

55 directories, 120 files


