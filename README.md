# 2D Metaverse 🌍

A modern, scalable 2D metaverse platform where users can create virtual spaces, interact with elements, and build immersive experiences.

## ✨ Features

- 🚀 **Real-time multiplayer spaces** with dynamic element placement
- 👤 **User management** with customizable avatars
- 🏗️ **Space creation** and management tools
- ⚡ **Admin panel** for content management
- 🎨 **Custom elements** and interactive objects
- 🗄️ **PostgreSQL database** with Prisma ORM
- 📱 **REST API** with comprehensive endpoints
- 🎯 **Type-safe** development with TypeScript

## 🚀 Quick Start

```bash
# Clone the repository
git clone <repository-url>
cd 2d-metaverse

# Install dependencies
npm install -g pnpm  # if not installed
pnpm install

# Set up environment variables
cp .env.example .env
# Edit .env with your Neon database URL

# Initialize database
cd packages/db
pnpm db:generate
pnpm db:push

# Start development
cd ../..
pnpm dev
```

**API Server:** http://localhost:3000  
**Web App:** http://localhost:3001

## 📚 Documentation

📋 **[PROJECT.md](./PROJECT.md)** - Complete setup guide, API documentation, and development workflow

📋 **[postman-collection.json](./postman-collection.json)** - Import into Postman for API testing

## 🏗️ Architecture

This is a **monorepo** powered by:

- **🏃‍♂️ Turborepo** - Build system and task orchestration
- **📦 pnpm** - Fast, efficient package manager
- **⚡ Express.js** - HTTP API server
- **🎯 Next.js** - Modern React framework
- **🗄️ Prisma + Neon** - Database ORM with PostgreSQL
- **📘 TypeScript** - Type safety across all packages

## 🔌 API Overview

### Authentication
- User registration and login
- Avatar selection and management

### Space Management  
- Create and manage virtual spaces
- Add/remove interactive elements
- Real-time space updates

### Admin Operations
- Element and avatar creation
- Map template management
- User administration

## 🛠️ Development Commands

```bash
# Install all dependencies
pnpm install

# Start development servers
pnpm dev

# Build for production
pnpm build

# Database operations
cd packages/db
pnpm db:generate    # Generate Prisma client
pnpm db:push       # Sync schema to database
pnpm db:studio     # Open database GUI
```

## 🚀 Deployment

See [PROJECT.md](./PROJECT.md) for detailed production deployment instructions.

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch: `git checkout -b feature/amazing-feature`
3. Commit your changes: `git commit -m 'Add amazing feature'`
4. Push to the branch: `git push origin feature/amazing-feature`
5. Open a Pull Request

## 📄 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

---

Built with ❤️ using modern web technologies
