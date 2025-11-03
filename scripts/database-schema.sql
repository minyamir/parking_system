-- Users Table
CREATE TABLE users (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  name VARCHAR(255) NOT NULL,
  vehicle_number VARCHAR(20) NOT NULL,
  phone VARCHAR(20),
  profile_image_url VARCHAR(500),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parking Spaces Table
CREATE TABLE parking_spaces (
  id VARCHAR(10) PRIMARY KEY,
  level INT NOT NULL,
  position_x DECIMAL(10, 2),
  position_y DECIMAL(10, 2),
  position_z DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'available',
  hourly_rate DECIMAL(10, 2) DEFAULT 25.00,
  features JSONB DEFAULT '[]',
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Reservations Table
CREATE TABLE reservations (
  id VARCHAR(50) PRIMARY KEY,
  space_id VARCHAR(10) NOT NULL REFERENCES parking_spaces(id),
  user_id UUID NOT NULL REFERENCES users(id),
  start_time TIMESTAMP NOT NULL,
  end_time TIMESTAMP NOT NULL,
  status VARCHAR(20) DEFAULT 'active',
  cost DECIMAL(10, 2),
  level INT,
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Payments Table
CREATE TABLE payments (
  id VARCHAR(50) PRIMARY KEY,
  reservation_id VARCHAR(50) NOT NULL REFERENCES reservations(id),
  user_id UUID NOT NULL REFERENCES users(id),
  amount DECIMAL(10, 2),
  status VARCHAR(20) DEFAULT 'pending',
  payment_method VARCHAR(50),
  transaction_id VARCHAR(100),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
  updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Parking History Table
CREATE TABLE parking_history (
  id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
  user_id UUID NOT NULL REFERENCES users(id),
  space_id VARCHAR(10) NOT NULL REFERENCES parking_spaces(id),
  entry_time TIMESTAMP NOT NULL,
  exit_time TIMESTAMP,
  duration_hours INT,
  cost DECIMAL(10, 2),
  status VARCHAR(20),
  created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- Indexes for performance
CREATE INDEX idx_reservations_user_id ON reservations(user_id);
CREATE INDEX idx_reservations_space_id ON reservations(space_id);
CREATE INDEX idx_reservations_status ON reservations(status);
CREATE INDEX idx_payments_reservation_id ON payments(reservation_id);
CREATE INDEX idx_parking_history_user_id ON parking_history(user_id);
