# Backend Setup Guide for ParkHub

## Technology Stack
- **Framework**: Node.js + Express.js (or NestJS for enterprise)
- **Database**: PostgreSQL with Prisma ORM
- **Cache**: Redis for real-time parking updates
- **Queue**: Bull for payment processing
- **Authentication**: JWT + RefreshToken
- **File Storage**: AWS S3 or local storage

## Project Structure
\`\`\`
backend/
├── src/
│   ├── config/
│   │   ├── database.ts
│   │   ├── redis.ts
│   │   └── env.ts
│   ├── routes/
│   │   ├── auth.ts
│   │   ├── parking-spaces.ts
│   │   ├── reservations.ts
│   │   ├── payments.ts
│   │   └── users.ts
│   ├── controllers/
│   │   ├── auth.controller.ts
│   │   ├── parking.controller.ts
│   │   ├── reservation.controller.ts
│   │   └── payment.controller.ts
│   ├── services/
│   │   ├── auth.service.ts
│   │   ├── parking.service.ts
│   │   ├── reservation.service.ts
│   │   └── payment.service.ts
│   ├── middleware/
│   │   ├── auth.middleware.ts
│   │   └── error.middleware.ts
│   ├── models/
│   │   ├── User.ts
│   │   ├── ParkingSpace.ts
│   │   ├── Reservation.ts
│   │   └── Payment.ts
│   └── utils/
│       ├── jwt.ts
│       ├── validators.ts
│       └── error-handler.ts
├── prisma/
│   └── schema.prisma
└── app.ts
\`\`\`

## Database Schema (Prisma)

See: BACKEND_DATABASE_SCHEMA.md

## API Endpoints

### Authentication
- `POST /api/auth/register` - Register new user
- `POST /api/auth/login` - Login user
- `POST /api/auth/refresh` - Refresh JWT token
- `GET /api/auth/profile` - Get user profile
- `PUT /api/auth/profile` - Update user profile

### Parking Spaces
- `GET /api/parking-spaces` - Get all spaces
- `GET /api/parking-spaces/level/:level` - Get spaces by level
- `GET /api/parking-spaces/:id` - Get specific space
- `GET /api/parking-spaces/stats` - Get occupancy stats
- `PUT /api/parking-spaces/:id` - Update space status

### Reservations
- `GET /api/reservations` - Get user reservations
- `GET /api/reservations/:id` - Get reservation details
- `POST /api/reservations` - Create reservation
- `PUT /api/reservations/:id` - Update reservation
- `DELETE /api/reservations/:id` - Cancel reservation

### Payments
- `POST /api/payments/reserve` - Reserve parking (initiate payment)
- `POST /api/payments/confirm` - Confirm payment
- `GET /api/payments/history` - Payment history

## Environment Variables
\`\`\`
DATABASE_URL=postgresql://user:password@localhost:5432/parkhub
REDIS_URL=redis://localhost:6379
JWT_SECRET=your_jwt_secret_key
JWT_REFRESH_SECRET=your_refresh_secret_key
JWT_EXPIRE=15m
STRIPE_SECRET_KEY=sk_test_...
STRIPE_PUBLIC_KEY=pk_test_...
NODE_ENV=development
PORT=3001
CORS_ORIGIN=http://localhost:3000
\`\`\`

## Installation & Running

1. Install dependencies:
   \`\`\`bash
   npm install
   \`\`\`

2. Setup database:
   \`\`\`bash
   npx prisma migrate dev --name init
   \`\`\`

3. Seed data:
   \`\`\`bash
   npm run seed
   \`\`\`

4. Start server:
   \`\`\`bash
   npm run dev
   \`\`\`

The backend will run on `http://localhost:3001`
