/**
 * Real-world workflow templates for comprehensive testing
 * 
 * These templates are based on actual client usage patterns and help validate
 * that the SDK works correctly with real-world scenarios.
 * 
 * Each template includes:
 * 1. Individual component testing (runTrigger, runNodeImmediately)
 * 2. Workflow simulation testing
 * 3. Full deployment and execution testing
 */

// Note: Test files don't have default exports, they are Jest test suites
// Import the test files directly to run them, don't export them

/**
 * Template categories for easy organization
 */
export const TemplateCategories = {
  ALERTS: 'alerts',
  DEFI: 'defi', 
  MONITORING: 'monitoring',
  NOTIFICATIONS: 'notifications',
} as const;

/**
 * Template metadata for documentation and testing
 */
export const TemplateMetadata = {
  'telegram-alert-on-transfer': {
    name: 'Telegram Alert on Transfer',
    description: 'Monitors ERC20 token transfers and sends Telegram notifications',
    category: TemplateCategories.ALERTS,
    triggers: ['EventTrigger'],
    nodes: ['CustomCode', 'RestAPI'],
    realWorldUsage: true,
    inputFields: {
      trigger: ['tokens', 'address', 'chainId', 'subType'],
      nodes: []
    },
    complexity: 'medium',
    testTypes: ['individual', 'simulation', 'deployment']
  }
} as const;

/**
 * Helper function to get template metadata
 */
export function getTemplateMetadata(templateName: keyof typeof TemplateMetadata) {
  return TemplateMetadata[templateName];
}

/**
 * Helper function to list all available templates
 */
export function listTemplates() {
  return Object.keys(TemplateMetadata);
}

/**
 * Helper function to get templates by category
 */
export function getTemplatesByCategory(category: typeof TemplateCategories[keyof typeof TemplateCategories]) {
  return Object.entries(TemplateMetadata)
    .filter(([_, metadata]) => metadata.category === category)
    .map(([name, _]) => name);
} 