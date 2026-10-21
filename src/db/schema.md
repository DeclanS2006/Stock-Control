   # Database Schema

```mermaid
   erDiagram
     PRODUCTS ||--o{ STOCK_MOVEMENTS : has
     PRODUCTS {
       int id PK
       text sku UK
       text name
       text category
       int price_pence
       int reorder_level
     }
     STOCK_MOVEMENTS {
       int id PK
       int product_id FK
       int quantity_change
       text type
       text note
       text created_at
     }
```

   Current stock for a product is the sum of its `quantity_change` values.