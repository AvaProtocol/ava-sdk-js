/**
 * This script generates the SDK reference documentation based on the methods array defined at the beginning of the file.
 * For a generated example, please refer to https://avaprotocol.org/docs/ethereum/develop/js-sdk
 * 
 * Usage:
 * node ./scripts/generate-docs.js
 */

const fs = require("fs");

const OUTPUT_FILENAME = "SDK_References.md";

const methods = [
  {
    name: "authWithAPIKey",
    description: "Authenticate with an API key.",
    params: [
      { name: "address", type: "string", description: "The user's address." },
      {
        name: "apiKey",
        type: "string",
        description: "The API key for authentication.",
      },
      {
        name: "expiredAtEpoch",
        type: "number",
        description: "The expiration epoch for the key.",
      },
    ],
    returns: {
      type: "Promise<GetKeyResponse>",
      description: "The authentication key response.",
    },
  },
  {
    name: "authWithSignature",
    description: "Authenticate using a signature.",
    params: [
      { name: "address", type: "string", description: "The user's address." },
      {
        name: "signature",
        type: "string",
        description: "The signature for authentication.",
      },
      {
        name: "expiredAtEpoch",
        type: "number",
        description: "The expiration epoch for the signature.",
      },
    ],
    returns: {
      type: "Promise<GetKeyResponse>",
      description: "The authentication key response.",
    },
  },
  {
    name: "listSmartWallets",
    description: "Retrieve a list of smart wallets.",
    params: [
      {
        name: "options",
        type: "RequestOptions",
        description: "Request options, including authentication.",
      },
    ],
    returns: {
      type: "Promise<SmartWallet[]>",
      description: "A list of smart wallets associated with the user.",
    },
  },
  {
    name: "createWallet",
    description: "Create a new smart wallet.",
    params: [
      {
        name: "salt",
        type: "string",
        description: "The salt value for wallet creation.",
      },
      {
        name: "factoryAddress",
        type: "string",
        description: "The factory address (optional).",
      },
      {
        name: "options",
        type: "RequestOptions",
        description: "Request options, including authentication.",
      },
    ],
    returns: {
      type: "Promise<SmartWallet>",
      description: "Details of the created wallet.",
    },
  },
  {
    name: "createTask",
    description: "Create a new task for automation.",
    params: [
      {
        name: "payload",
        type: "any",
        description: "The task payload including trigger, nodes, and edges.",
      },
      {
        name: "options",
        type: "RequestOptions",
        description: "Request options, including authentication.",
      },
    ],
    returns: {
      type: "Promise<string>",
      description: "The ID of the created task.",
    },
  },
  {
    name: "listTasks",
    description: "Retrieve a list of tasks associated with a smart wallet.",
    params: [
      {
        name: "address",
        type: "string",
        description: "The smart wallet address.",
      },
      {
        name: "options",
        type: "RequestOptions",
        description: "Request options, including authentication.",
      },
    ],
    returns: {
      type: "Promise<Task[]>",
      description: "A list of tasks for the specified wallet.",
    },
  },
  {
    name: "getTask",
    description: "Retrieve details of a specific task.",
    params: [
      {
        name: "id",
        type: "string",
        description: "The ID of the task to retrieve.",
      },
      {
        name: "options",
        type: "RequestOptions",
        description: "Request options, including authentication.",
      },
    ],
    returns: {
      type: "Promise<TaskType>",
      description: "Details of the specified task.",
    },
  },
  {
    name: "cancelTask",
    description: "Cancel an existing task.",
    params: [
      {
        name: "id",
        type: "string",
        description: "The ID of the task to cancel.",
      },
      {
        name: "options",
        type: "RequestOptions",
        description: "Request options, including authentication.",
      },
    ],
    returns: {
      type: "Promise<boolean>",
      description:
        "True if the task was successfully canceled, otherwise false.",
    },
  },
  {
    name: "deleteTask",
    description: "Delete an existing task.",
    params: [
      {
        name: "id",
        type: "string",
        description: "The ID of the task to delete.",
      },
      {
        name: "options",
        type: "RequestOptions",
        description: "Request options, including authentication.",
      },
    ],
    returns: {
      type: "Promise<boolean>",
      description:
        "True if the task was successfully deleted, otherwise false.",
    },
  },
];

const generateMarkdown = (methods) => {
  let md = "# SDK API Documentation\n\n";

  methods.forEach((method) => {
    md += `## ${method.name}\n\n`;
    md += `${method.description}\n\n`;
    md += "### Parameters\n\n";
    if (method.params.length > 0) {
      md += "| Name | Type | Description |\n";
      md += "|------|------|-------------|\n";
      method.params.forEach((param) => {
        md += `| ${param.name} | ${param.type} | ${param.description} |\n`;
      });
    } else {
      md += "This method has no parameters.\n";
    }
    md += "\n### Returns\n\n";
    md += `**${method.returns.type}** - ${method.returns.description}\n\n`;
  });

  return md;
};

const markdown = generateMarkdown(methods);

fs.writeFileSync(OUTPUT_FILENAME, markdown);

console.log(`Documentation generated: ${OUTPUT_FILENAME}`);
