# ParkMini Backend Architecture

## Overview
ParkMini is a modern parking management system with a Next.js backend, featuring real-time parking space tracking, user authentication, and reservation management.

## Project Structure

\`\`\`
backend/
├── app/api/
│   ├── auth/
│   │   ├── login/route.ts
│   │   └── register/route.ts
│   ├── parking-spaces/route.ts
│   ├── reservations/route.ts
│   ├── payments/route.ts
│   └── users/route.ts
├── lib/
│   ├── db.ts (Database connection)
│   ├── auth.ts (Authentication utilities)
│   └── validators.ts (Input validation)
├── middleware.ts (Authentication middleware)
├── scripts/
│   └── database-schema.sql
└── docs/
    └── API_DOCUMENTATION.md
\`\`\`

## API Endpoints

### Authentication
- **POST** `/api/auth/login` - User login
  - Body: `{ email, password }`
  - Response: `{ success, user, token }`

- **POST** `/api/auth/register` - User registration
  - Body: `{ email, password, name, vehicleNumber }`
  - Response: `{ success, user }`

### Parking Spaces
- **GET** `/api/parking-spaces` - Get all parking spaces
  - Query: `?status=available&level=1`
  - Response: `{ spaces[], stats }`

### Reservations
- **POST** `/api/reservations` - Create reservation
  - Body: `{ spaceId, userId, duration, level }`
  - Response: `{ success, reservation }`

- **GET** `/api/reservations` - Get user reservations
  - Query: `?userId=user-123`
  - Response: `{ count, reservations[] }`

### Payments
- **POST** `/api/payments` - Process payment
  - Body: `{ reservationId, userId, amount, paymentMethod }`
  - Response: `{ success, payment }`

## Database Schema

### Users Table
- id (UUID)
- email (String, unique)
- password_hash (String)
- name (String)
- vehicle_number (String)
- phone (String)
- profile_image_url (String)
- created_at, updated_at (Timestamps)

### Parking Spaces Table
- id (String, PK)
- level (Int)
- position_x, position_y, position_z (Decimal)
- status (String: available, occupied, reserved)
- hourly_rate (Decimal)
- features (JSON: ['covered', 'ev-charging', 'handicap'])

### Reservations Table
- id (String, PK)
- space_id (FK to parking_spaces)
- user_id (FK to users)
- start_time, end_time (Timestamps)
- status (String: active, completed, cancelled)
- cost (Decimal)
- level (Int)

### Payments Table
- id (String, PK)
- reservation_id (FK to reservations)
- user_id (FK to users)
- amount (Decimal)
- status (String: pending, completed, failed)
- payment_method (String: card, wallet, upi)
- transaction_id (String)

### Parking History Table
- id (UUID)
- user_id (FK to users)
- space_id (FK to parking_spaces)
- entry_time, exit_time (Timestamps)
- duration_hours (Int)
- cost (Decimal)

## Integration Flow

### Frontend to Backend
1. User logs in → `POST /api/auth/login`
2. Frontend stores JWT token in localStorage
3. User browses parking spaces → `GET /api/parking-spaces`
4. User reserves space → `POST /api/reservations`
5. System processes payment → `POST /api/payments`
6. Frontend updates UI with reservation status

### Real-time Updates
- WebSocket connection for live parking space status
- Auto-refresh parking spaces every 5 seconds
- Reservation status updates in real-time

## Environment Variables

\`\`\`
DATABASE_URL=postgresql://user:password@localhost:5432/parkmini
JWT_SECRET=your-secret-key
STRIPE_SECRET_KEY=your-stripe-key
NODE_ENV=production
\`\`\`

## Authentication Flow

1. User enters credentials
2. Backend validates against database
3. JWT token generated (expires in 24 hours)
4. Token stored in frontend localStorage
5. All subsequent requests include Authorization header
6. Backend middleware validates token on protected routes

## Error Handling

All endpoints return standardized error responses:
\`\`\`json
{
  "error": "Error message",
  "status": 400
}
\`\`\`

Common status codes:
- 200: Success
- 201: Created
- 400: Bad request
- 401: Unauthorized
- 409: Conflict (space already reserved)
- 500: Server error

## Deployment

Deploy using Vercel:
1. Connect GitHub repository
2. Set environment variables
3. Deploy with `vercel deploy`
4. Database migrations run automatically

## Security Best Practices

- Always use HTTPS
- Validate all inputs server-side
- Use parameterized queries to prevent SQL injection
- Hash passwords using bcrypt
- Implement rate limiting on auth endpoints
- Use CORS for frontend-backend communication
