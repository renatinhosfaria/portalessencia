#!/bin/bash
# =============================================================================
# Setup Script - VPS Contabo
# Portal Digital Colégio Essência Feliz
# =============================================================================
# Usage: 
#   1. Copy this script to your VPS: scp scripts/setup-vps.sh root@YOUR_IP:/root/
#   2. Connect via SSH: ssh root@YOUR_IP
#   3. Run: chmod +x setup-vps.sh && ./setup-vps.sh
# =============================================================================

set -e

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

print_step() {
    echo -e "\n${BLUE}[STEP]${NC} $1"
}

print_success() {
    echo -e "${GREEN}[OK]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

# =============================================================================
# Check if running as root
# =============================================================================
if [ "$EUID" -ne 0 ]; then
    print_error "Please run as root"
    exit 1
fi

echo -e "${GREEN}"
echo "=============================================="
echo "  Portal Essência Feliz - VPS Setup Script"
echo "=============================================="
echo -e "${NC}"

# =============================================================================
# Step 1: Update System
# =============================================================================
print_step "Updating system packages..."
apt update && apt upgrade -y
print_success "System updated"

# =============================================================================
# Step 2: Install Docker
# =============================================================================
print_step "Installing Docker..."
if command -v docker &> /dev/null; then
    print_warning "Docker already installed, skipping..."
else
    curl -fsSL https://get.docker.com | sh
    systemctl enable docker
    systemctl start docker
    print_success "Docker installed"
fi

# Verify Docker
docker --version

# =============================================================================
# Step 3: Install Docker Compose Plugin
# =============================================================================
print_step "Installing Docker Compose Plugin..."
apt install -y docker-compose-plugin
docker compose version
print_success "Docker Compose Plugin installed"

# =============================================================================
# Step 4: Configure UFW Firewall
# =============================================================================
print_step "Configuring UFW Firewall..."
apt install -y ufw

# Allow SSH first (important!)
ufw allow 22/tcp

# Allow HTTP and HTTPS
ufw allow 80/tcp
ufw allow 443/tcp

# Enable UFW
echo "y" | ufw enable

print_success "Firewall configured (ports 22, 80, 443)"
ufw status

# =============================================================================
# Step 5: Install Fail2Ban
# =============================================================================
print_step "Installing Fail2Ban..."
apt install -y fail2ban
systemctl enable fail2ban
systemctl start fail2ban
print_success "Fail2Ban installed and running"

# =============================================================================
# Step 6: Create Application Directory
# =============================================================================
print_step "Creating application directory..."
mkdir -p /opt/essencia
cd /opt/essencia
print_success "Directory /opt/essencia created"

# =============================================================================
# Step 7: Create .env template
# =============================================================================
print_step "Creating .env template..."

if [ -f "/opt/essencia/.env" ]; then
    print_warning ".env file already exists, backing up to .env.backup"
    cp /opt/essencia/.env /opt/essencia/.env.backup
fi

cat > /opt/essencia/.env << 'EOF'
# =============================================================================
# Production Environment Variables
# Portal Digital Colégio Essência Feliz
# =============================================================================
# IMPORTANT: Replace all placeholder values before starting the application!
# =============================================================================

# Database
DATABASE_URL=postgresql://essencia:CHANGE_THIS_PASSWORD@postgres:5432/essencia_db
POSTGRES_USER=essencia
POSTGRES_PASSWORD=CHANGE_THIS_PASSWORD
POSTGRES_DB=essencia_db

# Redis
REDIS_URL=redis://redis:6379

# Session
SESSION_TTL_HOURS=24

# Cookie Domain (leave empty for IP access, set your domain when ready)
COOKIE_DOMAIN=

# API Internal URL (Docker network)
API_INTERNAL_URL=http://api:3002
EOF

print_success ".env template created at /opt/essencia/.env"

# =============================================================================
# Step 8: Generate secure password suggestion
# =============================================================================
print_step "Generating secure password suggestion..."
SUGGESTED_PASSWORD=$(openssl rand -base64 24 | tr -dc 'a-zA-Z0-9' | head -c 24)
echo ""
echo -e "${YELLOW}=============================================="
echo "  SUGGESTED SECURE PASSWORD FOR DATABASE:"
echo "  $SUGGESTED_PASSWORD"
echo "=============================================="
echo -e "${NC}"

# =============================================================================
# Summary
# =============================================================================
echo ""
echo -e "${GREEN}=============================================="
echo "  SETUP COMPLETE!"
echo "=============================================="
echo -e "${NC}"
echo ""
echo "Next steps:"
echo ""
echo "1. Edit the .env file with your secure password:"
echo "   nano /opt/essencia/.env"
echo ""
echo "2. Replace CHANGE_THIS_PASSWORD with the suggested password above"
echo "   (or your own secure password)"
echo ""
echo "3. Configure GitHub Secrets in your repository:"
echo "   - VPS_HOST: $(hostname -I | awk '{print $1}')"
echo "   - VPS_USER: root"
echo "   - VPS_SSH_KEY: Your private SSH key"
echo "   - POSTGRES_PASSWORD: Same as in .env"
echo ""
echo "4. Push to main branch to trigger deployment, or run manually:"
echo "   cd /opt/essencia"
echo "   docker compose -f docker-compose.prod.yml pull"
echo "   docker compose -f docker-compose.prod.yml up -d"
echo ""
echo -e "${GREEN}Server IP: $(hostname -I | awk '{print $1}')${NC}"
echo ""
