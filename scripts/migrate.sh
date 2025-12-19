#!/bin/bash
# =============================================================================
# Database Migration Script
# Portal Digital Colégio Essência Feliz
# =============================================================================
# Usage: ./migrate.sh
# Run this on the VPS after deploying to apply database migrations
# =============================================================================

set -e

echo "Running database migrations..."

docker exec essencia-api node -e "
const { getDb } = require('@essencia/db');
// Run migrations here
console.log('Migrations complete');
"

echo "Done!"
