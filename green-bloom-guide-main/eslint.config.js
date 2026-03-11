/**
 * PlantWise - ESLint Configuration
 * 
 * Consistent code quality and style enforcement for the PlantWise team
 * Includes React, TypeScript, and accessibility rules
 * 
 * @author PlantWise Team
 * @since 1.0.0
 */

import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { 
    // Ignore build outputs and dependencies
    ignores: ["dist", "node_modules", "coverage", "*.config.js", "*.config.ts"] 
  },
  {
    // Base configuration for TypeScript files
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      // React Hooks rules - prevent common mistakes
      ...reactHooks.configs.recommended.rules,
      
      // React Fast Refresh - ensure HMR works correctly
      "react-refresh/only-export-components": ["warn", { 
        allowConstantExport: true 
      }],
      
      // TypeScript rules - relaxed for development flexibility
      "@typescript-eslint/no-unused-vars": ["warn", { 
        argsIgnorePattern: "^_",
        varsIgnorePattern: "^_" 
      }],
      "@typescript-eslint/no-explicit-any": "warn",
      
      // General code quality
      "no-console": ["warn", { allow: ["warn", "error"] }],
      "prefer-const": "error",
      "no-var": "error",
    },
  },
  {
    // Configuration for test files
    files: ["**/*.test.{ts,tsx}", "**/*.spec.{ts,tsx}"],
    rules: {
      // Allow console logs in tests
      "no-console": "off",
      // Allow any types in test mocks
      "@typescript-eslint/no-explicit-any": "off",
    },
  }
);
