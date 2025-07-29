/**
 * Ethereum ABI (Application Binary Interface) type definitions
 * These types provide better type safety for contract ABI handling
 */

export interface AbiInput {
  internalType?: string;
  name: string;
  type: string;
  components?: AbiInput[]; // For struct types
  indexed?: boolean; // For event inputs
}

export interface AbiOutput {
  internalType?: string;
  name: string;
  type: string;
  components?: AbiOutput[]; // For struct types
}

export interface AbiFunctionElement {
  inputs: AbiInput[];
  name: string;
  outputs: AbiOutput[];
  stateMutability: string;
  type: "function" | "constructor" | "receive" | "fallback";
  constant?: boolean; // Legacy field for older ABIs
  payable?: boolean; // Legacy field for older ABIs
}

export interface AbiEventElement {
  inputs: AbiInput[];
  name: string;
  type: "event";
  anonymous?: boolean;
}

export type AbiElement = AbiFunctionElement | AbiEventElement;

/**
 * Type alias for contract ABI arrays
 * Use this instead of Array<Record<string, unknown>> for better type safety
 */
export type ContractAbi = AbiElement[];

/**
 * Type guard to check if an object is a valid ABI function element
 */
export function isAbiFunctionElement(obj: unknown): obj is AbiFunctionElement {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const element = obj as Partial<AbiFunctionElement>;
  return (
    Array.isArray(element.inputs) &&
    typeof element.name === 'string' &&
    Array.isArray(element.outputs) &&
    typeof element.stateMutability === 'string' &&
    typeof element.type === 'string' &&
    ['function', 'constructor', 'receive', 'fallback'].includes(element.type)
  );
}

/**
 * Type guard to check if an object is a valid ABI event element
 */
export function isAbiEventElement(obj: unknown): obj is AbiEventElement {
  if (typeof obj !== 'object' || obj === null) return false;
  
  const element = obj as Partial<AbiEventElement>;
  return (
    Array.isArray(element.inputs) &&
    typeof element.name === 'string' &&
    element.type === 'event'
  );
}

/**
 * Type guard to check if an object is a valid ABI element
 */
export function isAbiElement(obj: unknown): obj is AbiElement {
  return isAbiFunctionElement(obj) || isAbiEventElement(obj);
}

/**
 * Type guard to check if an array is a valid contract ABI
 */
export function isContractAbi(obj: unknown): obj is ContractAbi {
  return Array.isArray(obj) && obj.every(isAbiElement);
} 