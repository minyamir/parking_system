# Database Schema for ParkHub

## Users Table
\`\`\`prisma
model User {
  id            String    @id @default(cuid())
  email         String    @unique
  password      String    // hashed
  name          String
  phone         String?
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  vehicle       Vehicle?
  reservations  Reservation[]
  payments      Payment[]
}
\`\`\`

## Vehicles Table
\`\`\`prisma
model Vehicle {
  id            String    @id @default(cuid())
  userId        String    @unique
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  make          String    // Toyota
  model         String    // Camry
  plate         String    @unique
  color         String    // Blue
  year          Int
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
\`\`\`

## Parking Spaces Table
\`\`\`prisma
model ParkingSpace {
  id            String    @id @default(cuid())
  level         Int       // 1, 2, 3
  number        String    // A1, B5, etc
  type          String    // 'standard', 'handicap', 'compact', 'premium'
  status        String    @default("available")  // 'available', 'occupied', 'reserved', 'maintenance'
  hourlyRate    Float     // $5.00
  
  locationX     Float     // 3D position
  locationY     Float
  locationZ     Float
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
  
  reservations  Reservation[]
}
\`\`\`

## Reservations Table
\`\`\`prisma
model Reservation {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  spaceId       String
  space         ParkingSpace @relation(fields: [spaceId], references: [id])
  
  startTime     DateTime
  endTime       DateTime
  totalCost     Float
  status        String    @default("active")  // 'active', 'completed', 'cancelled'
  
  payment       Payment?
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
\`\`\`

## Payments Table
\`\`\`prisma
model Payment {
  id            String    @id @default(cuid())
  userId        String
  user          User      @relation(fields: [userId], references: [id], onDelete: Cascade)
  
  reservationId String    @unique
  reservation   Reservation @relation(fields: [reservationId], references: [id], onDelete: Cascade)
  
  amount        Float
  currency      String    @default("USD")
  method        String    // 'stripe', 'paypal', 'credit_card'
  status        String    @default("pending")  // 'pending', 'paid', 'failed', 'refunded'
  stripeId      String?   // Stripe payment ID
  
  createdAt     DateTime  @default(now())
  updatedAt     DateTime  @updatedAt
}
\`\`\`

## Indexes for Performance
\`\`\`prisma
@@index([userId])
@@index([spaceId])
@@index([reservationId])
@@unique([level, number])  // Ensure unique parking spaces
