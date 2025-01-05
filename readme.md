# Multi-Level Referral System API Documentation

## Overview
The **Multi-Level Referral System** is designed to manage user earnings from purchases and referrals. It supports direct and indirect earnings (Level 1 and Level 2 referrals) and provides APIs for user creation, earnings recording, and detailed earnings retrieval.

---

## API Endpoints

### 1. **Create a New User**
#### `POST /users`
**Description:** Creates a new user with an optional referral code.

#### Request Body:
```json
{
  "name": "Harsh",
  "email": "abc@example.com",
  "referralId": "ABC123" // Optional
}
```

#### Response:
```json
{
  "id": "123e4567-e89b-12d3-a456-426614174000",
  "name": "John",
  "email": "john@example.com",
}
```

#### Notes:
- If `referralId` is provided, the user will be associated with the referrer.
- A unique `referralId` is generated for the user.

---

### 2. **Record a Purchase**
#### `POST /earnings/purchase`
**Description:** Records a purchase and distributes earnings to eligible referrers.

#### Request Body:
```json
{
  "userId": "123e4567-e89b-12d3-a456-426614174000",
  "amount": 5000
}
```

#### Response:
```json
{
  "message": "Earnings recorded successfully."
}
```

#### Notes:
- Purchases below 1000 are not eligible for earnings distribution.
- Direct referrer earns 5%, and indirect referrer earns 1% of the purchase amount.

---

### 3. **Get Earnings by User ID**
#### `GET /earnings/:userId`
**Description:** Retrieves all earnings of a user, including self-earnings and referrals (Level 1 and Level 2).

#### Response:
```json
{
  "user": {
    "id": "123e4567-e89b-12d3-a456-426614174000",
    "name": "John",
    "email": "john@example.com"
  },
  "selfEarnings": [
    {
      "id": "earning1",
      "amount": 5000,
      "source": "self",
      "calculatedProfit": 0,
      "createdAt": "2023-01-01T00:00:00.000Z"
    }
  ],
  "referrals": [
    {
      "level": 1,
      "user": {
        "id": "234e4567-e89b-12d3-a456-426614174000",
        "name": "John",
        "email": "john@example.com"
      },
      "earnings": [
        {
          "id": "earning2",
          "amount": 5000,
          "source": "Level 1",
          "calculatedProfit": 250,
          "createdAt": "2023-01-01T00:00:00.000Z"
        }
      ],
      "referrals": [
        {
          "level": 2,
          "user": {
            "id": "345e4567-e89b-12d3-a456-426614174000",
            "name": "John2",
            "email": "John2@example.com"
          },
          "earnings": [
            {
              "id": "earning3",
              "amount": 5000,
              "source": "Level 2",
              "calculatedProfit": 50,
              "createdAt": "2023-01-01T00:00:00.000Z"
            }
          ]
        }
      ]
    }
  ]
}
```

#### Notes:
- `selfEarnings` lists earnings from the user’s own purchases.
- `referrals` lists earnings from Level 1 and Level 2 referrals, with hierarchical nesting.

---

## Error Responses
### Common Errors:
1. **User Not Found**
   - **Status:** 404
   - **Response:**
     ```json
     {
       "message": "User not found."
     }
     ```

2. **Invalid Request Data**
   - **Status:** 400
   - **Response:**
     ```json
     {
       "message": "Invalid input."
     }
     ```

3. **Server Error**
   - **Status:** 500
   - **Response:**
     ```json
     {
       "message": "An error occurred."
     }
     ```

---

## Environment Variables
Ensure the following variables are set in the `.env` file:
```env
DB_HOST=localhost
DB_NAME=multi_referral_system
DB_USER=db_user
DB_PASSWORD=db_password
DB_PORT=5432
JWT_SECRET=jwt_secret
```

---

## Setup Instructions
1. Clone the repository:
   ```bash
   git clone https://github.com/HARSH048/Multi-Referral-System.git
   ```
2. Install dependencies:
   ```bash
   npm install
   ```
3. Create a `.env` file and configure environment variables.
4. Start the server:
   ```bash
   npm start
   ```

---

## Additional Notes
- Use **Postman** or **Swagger** for testing API endpoints.
- Ensure the database is running and correctly configured before starting the server.
- For production, consider using a reverse proxy (e.g., Nginx) and enabling HTTPS.

---

