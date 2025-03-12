#!/bin/bash
set -e

# Script to run tests with Docker container
# This script replicates the GitHub Actions workflow in .github/workflows/dev-test-on-pr.yml

# Colors for output
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
RED='\033[0;31m'
NC='\033[0m' # No Color

# Function to print status messages
print_status() {
  echo -e "${GREEN}==>${NC} $1"
}

print_warning() {
  echo -e "${YELLOW}==>${NC} $1"
}

print_error() {
  echo -e "${RED}==>${NC} $1"
}

# Check if .env.test exists, create it if not
if [ ! -f .env.test ]; then
  print_status "Creating .env.test file from .env.example"
  cp .env.example .env.test
fi

# Set CHAIN_ID and CHAIN_ENDPOINT if not already set in .env.test
if ! grep -q "CHAIN_ID=" .env.test; then
  print_status "Adding CHAIN_ID to .env.test"
  echo "CHAIN_ID=11155111" >> .env.test
fi

if ! grep -q "CHAIN_ENDPOINT=" .env.test; then
  print_warning "Adding placeholder CHAIN_ENDPOINT to .env.test"
  echo "CHAIN_ENDPOINT=https://sepolia.infura.io/v3/your-infura-key" >> .env.test
  print_warning "Please update CHAIN_ENDPOINT in .env.test with a valid endpoint"
fi

# Step 1: Check if TEST_PRIVATE_KEY is set in the environment
if [ -z "$TEST_PRIVATE_KEY" ]; then
  # Step 2: If not set, check the .env.test file
  if ! grep -q "TEST_PRIVATE_KEY=[a-zA-Z0-9]" .env.test; then
    print_error "TEST_PRIVATE_KEY is not set in the environment or .env.test"
    print_error "Please add a valid private key to the environment or .env.test"
    exit 1
  else
    # Load the .env.test file
    export $(grep -v '^#' .env.test | xargs)
  fi
fi

# Ensure config directory exists
mkdir -p config

# Step 3: Pull the latest Docker images
print_status "Pulling the latest Docker images"
docker pull avaprotocol/avs-dev:latest

# Start the Docker container
print_status "Starting Docker container"
docker compose up -d

# Wait for the container to be ready
print_status "Waiting for the container to be ready"
until curl --output /dev/null --silent --fail http://localhost:1323/up; do
  printf '.'
  sleep 5
done
echo ""

# Generate API key and update .env.test
print_status "Generating API key"
API_KEY=$(docker compose exec aggregator /ava create-api-key --role=admin --subject=apikey)
echo "Generated API key: $API_KEY"
print_status "Updating TEST_API_KEY in .env.test"
# Use sed with compatibility for both Linux and macOS
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS version
  sed -i '' "s/^TEST_API_KEY=.*/TEST_API_KEY=$API_KEY/" .env.test
else
  # Linux version
  sed -i "s/^TEST_API_KEY=.*/TEST_API_KEY=$API_KEY/" .env.test
fi

# Set ENDPOINT in .env.test
print_status "Setting ENDPOINT in .env.test"
if [[ "$OSTYPE" == "darwin"* ]]; then
  # macOS version
  sed -i '' "s/^ENDPOINT=.*/ENDPOINT=localhost:2206/" .env.test
else
  # Linux version
  sed -i "s/^ENDPOINT=.*/ENDPOINT=localhost:2206/" .env.test
fi

# Build the project
print_status "Building the project"
yarn build

# Run tests
if [ "$1" == "" ]; then
  print_status "Running all tests"
  yarn test
else
  print_status "Running specific test: $1"
  yarn test "$1"
fi

# Cleanup
print_status "Cleaning up"
docker compose down

print_status "Done!"
