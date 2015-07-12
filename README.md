# hdo-budget

Explore the Norwegian state budgets. WIP.

## USAGE

    $ npm install
    $ npm run dev

## Schema

See `src/js/BudgetSchema.js` for the GraphQL schema.

## Routes <=> GraphQL

```
/budgets
{
  budgets {
      id
      name
  }
}

/budgets/:budgetId
{
    budget(id: String}) {
        id
        name
        frames {
            id
            name
            revenue
            cost
        }
    }
}


/budgets/:budgetId/frames/:frameId
{
    budget(id: String}) {
        frame(id: String) {
            chapters {
              id
              name
              revenue
              cost
            }
        }
    }
}

/budgets/:budgetId/frames/:frameId/chapters/:chapterId
{
    budget(id: String}) {
        frame(id: String) {
            chapter(id: String) {
                posts {
                    name
                    description
                    amount
                }
            }
        }
    }
}


/budgets/:budgetId/frames/:frameId/chapters/:chapterId/posts/:postId (maybe)
{
    budget(id: String}) {
        frame(id: String) {
            chapter(id: String) {
                post(id: String) {
                    name
                    description
                    amount
                }
            }
        }
    }
}


/budgets/:budgetId/compare/:otherBudgetId
/budgets/:budgetId/compare/:otherBudgetId/frames/:frameId
/budgets/:budgetId/compare/:otherBudgetId/frames/:frameId
/budgets/:budgetId/compare/:otherBudgetId/frames/:frameId/chapters/:chapterId
```
