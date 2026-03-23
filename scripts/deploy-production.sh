#!/bin/bash

# Production Deployment Script
# This script handles deployment and data migration for production

set -e  # Exit on error

echo "🚀 Starting production deployment..."

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Step 1: Load .env file and check environment
echo -e "\n${YELLOW}Step 1: Loading environment variables...${NC}"

# Check if .env file exists
if [ -f .env ]; then
    echo "Loading .env file..."
    # Export all variables from .env
    set -a
    source .env
    set +a
    echo -e "${GREEN}✓ .env file loaded${NC}"
else
    echo -e "${YELLOW}⚠ No .env file found, using system environment variables${NC}"
fi

# Check if DATABASE_URL is set
if [ -z "$DATABASE_URL" ]; then
    echo -e "${RED}ERROR: DATABASE_URL is not set!${NC}"
    echo "Please create a .env file with DATABASE_URL or set it as environment variable:"
    echo "export DATABASE_URL='your-production-database-url'"
    exit 1
fi
echo -e "${GREEN}✓ Environment variables OK${NC}"

# Step 2: Install dependencies
echo -e "\n${YELLOW}Step 2: Installing dependencies...${NC}"
npm ci --production=false
echo -e "${GREEN}✓ Dependencies installed${NC}"

# Step 3: Generate Prisma Client
echo -e "\n${YELLOW}Step 3: Generating Prisma Client...${NC}"
npx prisma generate
echo -e "${GREEN}✓ Prisma Client generated${NC}"

# Step 4: Push database schema
echo -e "\n${YELLOW}Step 4: Updating database schema...${NC}"
npx prisma db push --accept-data-loss
echo -e "${GREEN}✓ Database schema updated${NC}"

# Step 5: Run media migration (only if needed)
echo -e "\n${YELLOW}Step 5: Checking if media migration is needed...${NC}"
MEDIA_COUNT=$(npx prisma db execute --stdin <<SQL
SELECT COUNT(*) as count FROM media;
SQL
)

if [ "$MEDIA_COUNT" = "0" ]; then
    echo "No media found, running migration..."
    npx tsx scripts/migrate-media.ts
    echo -e "${GREEN}✓ Media migration completed${NC}"
else
    echo -e "${GREEN}✓ Media already migrated (found $MEDIA_COUNT records)${NC}"
fi

# Step 6: Build application
echo -e "\n${YELLOW}Step 6: Building application...${NC}"
npm run build
echo -e "${GREEN}✓ Application built successfully${NC}"

echo -e "\n${GREEN}✨ Deployment complete!${NC}"
echo ""
echo "Next steps:"
echo "1. Start the application: npm start"
echo "2. Or deploy the built files to your hosting platform"
