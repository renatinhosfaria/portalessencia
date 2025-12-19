#!/bin/bash
# =============================================================================
# Manual Deploy Script
# Portal Digital Colégio Essência Feliz
# =============================================================================
# Usage: ./deploy.sh
# Run this on the VPS to manually deploy/update the application
# =============================================================================

set -e

# Colors
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m'

cd /opt/essencia

echo -e "${BLUE}[1/4]${NC} Pulling latest images..."
docker compose -f docker-compose.prod.yml pull

echo -e "${BLUE}[2/4]${NC} Starting/updating services..."
docker compose -f docker-compose.prod.yml up -d

echo -e "${BLUE}[3/4]${NC} Cleaning up old images..."
docker image prune -f

echo -e "${BLUE}[4/4]${NC} Checking service status..."
docker compose -f docker-compose.prod.yml ps

echo ""
echo -e "${GREEN}Deploy complete!${NC}"
echo ""
echo "View logs: docker compose -f docker-compose.prod.yml logs -f"
echo "Stop all:  docker compose -f docker-compose.prod.yml down"
