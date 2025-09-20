# Car Reservation System

A full-stack car reservation system built with **NestJS** (backend) and **Angular** (frontend), featuring user authentication, car management, and reservation functionality.

## 🚀 Features

### Backend (NestJS)

- **Authentication & Authorization**: JWT-based authentication with role-based access control
- **User Management**: User registration, login, and profile management
- **Car Management**: CRUD operations for car inventory with filtering capabilities
- **Reservation System**: Car reservation and release functionality
- **Database**: MongoDB with Mongoose ODM
- **Security**: Password hashing with bcrypt, CORS enabled
- **Validation**: Class-validator for request validation
- **Internationalization**: i18n support

### Frontend (Angular)

- **Modern UI**: Built with Angular 18 and Tailwind CSS
- **Responsive Design**: Mobile-first approach with modern UX
- **Authentication**: Login and registration forms with guards
- **Car Browsing**: Search and filter cars by various criteria
- **Reservation Management**: View and manage car reservations
- **Admin Panel**: Administrative interface for car management
- **SSR Support**: Server-side rendering capabilities

## 🛠️ Tech Stack

### Backend

- **Framework**: NestJS 11.x
- **Database**: MongoDB with Mongoose
- **Authentication**: JWT with Passport
- **Validation**: class-validator, class-transformer
- **Security**: bcrypt for password hashing
- **Runtime**: Node.js 24 (Alpine)

### Frontend

- **Framework**: Angular 18.x
- **Styling**: Tailwind CSS 4.x
- **HTTP Client**: Angular HttpClient with interceptors
- **State Management**: Angular services
- **Build Tool**: Angular CLI
- **SSR**: Angular Universal

### Development Tools

- **Package Manager**: pnpm
- **Linting**: ESLint with Prettier
- **Testing**: Jest (backend), Karma (frontend)
- **Containerization**: Docker & Docker Compose

## 🚀 Getting Started

### Prerequisites

- Node.js 18+
- pnpm (recommended) or npm
- MongoDB (local or cloud)
- Docker & Docker Compose (optional)

### Environment Setup

1. **Clone the repository**

   ```bash
   git clone https://github.com/Mirian97/car-reservation-system.git
   cd car-reservation-system
   ```

2. **Backend Setup**

   ```bash
   cd server
   pnpm install
   ```

3. **Frontend Setup**

   ```bash
   cd ../web
   pnpm install
   ```

4. **Environment Variables**

   Create a `.env` file in the `server` directory:

   ```env
   # Se estiver rodando no Docker Compose, use:
   MONGODB_URI=mongodb://mongodb:27017/car-reservation

   # Se estiver rodando localmente (sem Docker), use:
   # MONGODB_URI=mongodb://localhost:27017/car-reservation

   JWT_SECRET=your-jwt-secret-key
   PORT=3000
   ```

### Running the Application

#### Option 1: Docker Compose (Recommended)

```bash
# From the project root
cd server
docker-compose up -d
```

This will start:

- MongoDB on port 27017
- NestJS API on port 3005

#### Option 2: Manual Setup

**Backend:**

```bash
cd server
pnpm run start:dev
```

**Frontend:**

```bash
cd web
pnpm start
```

**Database:**
Make sure MongoDB is running locally or update the `MONGODB_URI` in your environment variables.

### Accessing the Application

- **Frontend**: http://localhost:4200
- **Backend API**: http://localhost:3005
- **MongoDB**: localhost:27017

## 📚 API Documentation

### Authentication Endpoints

- `POST /auth/login` - User login
- `POST /auth/register` - User registration
- `PUT /auth/profile` - Update user profile

### Car Management

- `GET /cars` - Get all available cars
- `GET /cars/search` - Search cars with filters
- `POST /cars` - Create new car (Admin only)
- `PUT /cars/:id` - Update car (Admin only)
- `DELETE /cars/:id` - Delete car (Admin only)

### Reservations

- `GET /reservations` - Get all reservations
- `GET /reservations/user/:userId` - Get user's reservations
- `POST /reservations` - Create new reservation
- `PUT /reservations/:id` - Update reservation
- `DELETE /reservations/:id` - Cancel reservation

## 🎯 Key Features Explained

### User Roles

- **User**: Can browse cars, make reservations, view their profile
- **Admin**: Full access to car management and all reservations

### Car Filtering

Cars can be filtered by:

- Name (text search)
- Type (Sedan, SUV, Coupé, etc.)
- Engine size
- Vehicle size (passenger capacity)

### Reservation Logic

- Users can only have one active reservation at a time
- Cars can only be reserved by one user at a time
- Reservations can be cancelled, which releases the car

### Security Features

- JWT tokens for authentication
- Password hashing with bcrypt
- Role-based access control
- Input validation and sanitization
- CORS protection

## 🚀 Deployment

### Production Build

**Backend:**

```bash
cd server
pnpm run build
pnpm run start:prod
```

**Frontend:**

```bash
cd web
pnpm run build
```

## 📝 Sample Data

The project includes sample car data in `assets/carros.json` with various car types including:

- Sedans (Compact, Medium, Large)
- SUVs and Crossovers
- Pickup trucks
- Utility vehicles
- Sports cars (Coupé)

**Built with ❤️ using NestJS and Angular**
