#!/bin/bash
set -e

# Script to run withdraw function tests
# This assumes the AVS is already running manually

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

print_status "Running Withdraw Function Tests"

# Check if .env.test exists, create it if not
if [ ! -f .env.test ]; then
  print_status "Creating .env.test file from .env.dev"
  cp .env.dev .env.test
fi

# Check if AVS is running
print_status "Checking if AVS is running..."
if curl --output /dev/null --silent --fail http://localhost:2206/up || curl --output /dev/null --silent --fail http://localhost:1323/up; then
  print_status "AVS is running - proceeding with tests"
else
  print_error "AVS is not running. Please start the AVS manually before running these tests."
  print_error "You can start it with: docker compose up -d"
  exit 1
fi

# Ensure the project is built
print_status "Building the project"
yarn build

# Set TEST_ENV to test to use .env.test configuration
export TEST_ENV=test

# Generate API key if AVS is available
print_status "Attempting to generate API key for tests"
if command -v docker &> /dev/null && docker compose ps aggregator &> /dev/null; then
  yarn run apikey-gen
else
  print_warning "Docker compose not available or aggregator not running via compose"
  print_warning "Make sure TEST_API_KEY is properly set in .env.test if using API key auth"
fi

# Run the withdraw tests
print_status "Running withdraw function tests"

# Run all withdraw tests
print_status "Running complete withdraw test suite"
yarn test --testPathPattern=withdraw.test.ts --verbose

print_status "All withdraw tests completed!"

# Optional: Run specific test groups
if [ "$1" = "--groups" ]; then
  print_status "Running tests by groups..."
  
  print_status "Running basic withdraw tests"
  yarn test --testPathPattern=withdraw.test.ts --testNamePattern="withdrawFunds Basic Tests" --verbose
  
  print_status "Running token withdraw tests"  
  yarn test --testPathPattern=withdraw.test.ts --testNamePattern="withdrawFunds Token Tests" --verbose
  
  print_status "Running edge case tests"
  yarn test --testPathPattern=withdraw.test.ts --testNamePattern="withdrawFunds Edge Cases" --verbose
  
  print_status "Running authentication tests"
  yarn test --testPathPattern=withdraw.test.ts --testNamePattern="withdrawFunds Authentication Tests" --verbose
  
  print_status "Running integration tests"
  yarn test --testPathPattern=withdraw.test.ts --testNamePattern="withdrawFunds Integration" --verbose
  
  print_status "Running response validation tests"
  yarn test --testPathPattern=withdraw.test.ts --testNamePattern="withdrawFunds Response Validation" --verbose
fi

print_status "Done!"
