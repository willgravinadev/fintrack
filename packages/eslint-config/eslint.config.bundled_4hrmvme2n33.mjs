// dist/chunk-KLT7SCSF.js
var GLOB_SRC_EXT = "?([cm])[jt]s?(x)";
var GLOB_JS = "**/*.?([cm])js";
var GLOB_JSX = "**/*.?([cm])jsx";
var GLOB_TS = "**/*.?([cm])ts";
var GLOB_TSX = "**/*.?([cm])tsx";
var GLOB_E2E = `**/e2e/**/*.{test,spec}.${GLOB_SRC_EXT}`;
var GLOB_TEST = `**/tests/**/*.{test,spec}.${GLOB_SRC_EXT}`;
var GLOB_EXCLUDE = [
  "**/node_modules",
  "**/dist",
  "**/package-lock.json",
  "**/yarn.lock",
  "**/pnpm-lock.yaml",
  "**/bun.lockb",
  "**/output",
  "**/coverage",
  "**/temp",
  "**/.temp",
  "**/tmp",
  "**/.tmp",
  "**/.history",
  "**/.next",
  "**/.vercel",
  "**/.changeset",
  "**/.cache",
  "**/CHANGELOG*.md",
  "**/LICENSE*"
];

// dist/chunk-EVFEIXMB.js
import { default as default2 } from "@eslint/js";
import { default as default3 } from "@eslint-react/eslint-plugin";
import { default as default4 } from "@next/eslint-plugin-next";
import { default as default5 } from "@typescript-eslint/eslint-plugin";
import { default as default6 } from "@typescript-eslint/parser";
import { default as default7 } from "eslint-config-prettier";
import { default as default8 } from "eslint-plugin-eslint-comments";
import * as importPlugin from "eslint-plugin-import";
import { default as default9 } from "eslint-plugin-jsx-a11y";
import { default as default10 } from "eslint-plugin-playwright";
import { default as default11 } from "eslint-plugin-prettier";
import { default as default12 } from "eslint-plugin-react-hooks";
import { default as default13 } from "eslint-plugin-simple-import-sort";
import * as sonarjsPlugin from "eslint-plugin-sonarjs";
import { default as default14 } from "eslint-plugin-testing-library";
import * as turboPlugin from "eslint-plugin-turbo";
import { default as default15 } from "eslint-plugin-unicorn";
import { default as default16 } from "eslint-plugin-unused-imports";

// dist/chunk-Q6HUU7B3.js
var typescript = (options) => [
  {
    name: "fintrack:typescript",
    plugins: {
      "@typescript-eslint": default5
    },
    files: [GLOB_TS, GLOB_TSX],
    languageOptions: {
      parser: default6,
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        project: options?.project,
        tsconfigRootDir: options?.tsconfigRootDir,
        sourceType: "module"
      }
    },
    rules: {
      ...default5.configs["recommended-type-checked"].rules,
      ...default5.configs["strict-type-checked"].rules,
      ...default5.configs["stylistic-type-checked"].rules,
      ...default5.configs["eslint-recommended"].overrides[0].rules,
      "@typescript-eslint/array-type": ["error", { default: "array-simple" }],
      "@typescript-eslint/no-invalid-this": "error",
      "@typescript-eslint/no-shadow": "error",
      "@typescript-eslint/no-redundant-type-constituents": "off",
      "@typescript-eslint/consistent-type-imports": [
        "error",
        {
          prefer: "type-imports",
          fixStyle: "inline-type-imports"
        }
      ],
      "@typescript-eslint/restrict-template-expressions": ["error", { allowNumber: true }],
      "@typescript-eslint/no-confusing-void-expression": [
        "error",
        {
          ignoreArrowShorthand: true,
          ignoreVoidOperator: true,
          ignoreVoidReturningFunctions: true
        }
      ],
      "@typescript-eslint/no-namespace": "off",
      "@typescript-eslint/no-unsafe-call": "off",
      "@typescript-eslint/no-unsafe-assignment": "off",
      "@typescript-eslint/no-unsafe-member-access": "off",
      "@typescript-eslint/consistent-type-definitions": "off",
      "@typescript-eslint/no-non-null-assertion": "off",
      // Turn off due to poor performance
      "@typescript-eslint/no-misused-promises": "off",
      "@typescript-eslint/no-floating-promises": "off"
    }
  }
];

// dist/chunk-O2NANPD6.js
var unicorn = [
  {
    name: "fintrack:unicorn",
    plugins: {
      unicorn: default15
    },
    rules: {
      ...default15.configs.recommended.rules,
      "unicorn/no-await-expression-member": "off",
      "unicorn/no-null": "off",
      "unicorn/prefer-export-from": ["error", { ignoreUsedVariables: true }],
      "unicorn/prevent-abbreviations": "off",
      "unicorn/prefer-string-raw": "off",
      "unicorn/prefer-spread": "off"
    }
  }
];

// dist/chunk-UODRYSEQ.js
var next = [
  {
    name: "fintrack:next",
    plugins: {
      "@next/next": default4
    },
    rules: {
      ...default4.configs.recommended.rules,
      ...default4.configs["core-web-vitals"].rules,
      "@next/next/no-html-link-for-pages": "off"
    }
  }
];

// dist/chunk-REH37NPU.js
var playwright = [
  {
    name: "fintrack:playwright",
    ...default10.configs["flat/recommended"],
    files: [GLOB_E2E]
  }
];

// dist/chunk-PRFWJ5RZ.js
var prettier = [
  {
    name: "fintrack:prettier",
    plugins: {
      prettier: default11
    },
    rules: {
      // Avoid conflicts
      ...default7.rules,
      "prettier/prettier": ["error", { endOfLine: "auto" }],
      "arrow-body-style": "off",
      "prefer-arrow-callback": "off"
    }
  }
];

// dist/chunk-TUEZHSNL.js
var react = (options) => {
  const reactPluginAll = default3.configs.all;
  return [
    {
      name: "fintrack:react",
      plugins: {
        ...reactPluginAll.plugins,
        "react-hooks": default12,
        "jsx-a11y": default9
      },
      files: [GLOB_JS, GLOB_JSX, GLOB_TS, GLOB_TSX],
      languageOptions: {
        parser: default6,
        parserOptions: {
          ecmaFeatures: {
            jsx: true
          },
          project: options?.project,
          sourceType: "module"
        }
      },
      rules: {
        ...reactPluginAll.rules,
        ...default12.configs.recommended.rules,
        ...default9.configs.strict.rules,
        // @eslint-react
        "@eslint-react/no-leaked-conditional-rendering": "error",
        "@eslint-react/avoid-shorthand-boolean": "off",
        "@eslint-react/avoid-shorthand-fragment": "off",
        "@eslint-react/prefer-destructuring-assignment": "off",
        "@eslint-react/no-array-index-key": "off",
        "@eslint-react/no-complex-conditional-rendering": "off",
        // @eslint-react/hooks-extra
        "@eslint-react/hooks-extra/no-direct-set-state-in-use-effect": "off",
        // @eslint-react/dom
        "@eslint-react/dom/no-dangerously-set-innerhtml": "off",
        // @eslint-react/naming-convention
        "@eslint-react/naming-convention/filename": [
          "error",
          {
            rule: "kebab-case"
          }
        ],
        // jsx-a11y
        "jsx-a11y/alt-text": [
          "error",
          {
            elements: ["img"],
            img: ["Image"]
          }
        ],
        "jsx-a11y/lang": "error",
        "jsx-a11y/no-aria-hidden-on-focusable": "error",
        "jsx-a11y/no-noninteractive-element-to-interactive-role": [
          "error",
          {
            ul: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
            ol: ["listbox", "menu", "menubar", "radiogroup", "tablist", "tree", "treegrid"],
            li: ["menuitem", "option", "row", "tab", "treeitem"],
            table: ["grid"],
            td: ["gridcell"]
          }
        ]
      },
      settings: {
        "jsx-a11y": {
          components: {
            Button: "button",
            Image: "img",
            Input: "input",
            Textarea: "textarea",
            Link: "a"
          }
        },
        ...reactPluginAll.settings
      }
    }
  ];
};

// dist/chunk-VNUVUQIT.js
var sonarjs = [
  {
    name: "fintrack:sonarjs",
    plugins: {
      sonarjs: sonarjsPlugin
    },
    rules: {
      ...sonarjsPlugin.configs.recommended.rules,
      "sonarjs/no-duplicate-string": "off",
      "sonarjs/no-nested-functions": "off",
      "sonarjs/pseudo-random": "off"
    }
  }
];

// dist/chunk-GDXO4V6T.js
var testingLibrary = [
  {
    name: "fintrack:testing-library",
    plugins: {
      "testing-library": default14
    },
    rules: {
      ...default14.configs.react.rules
    },
    files: [GLOB_TEST]
  }
];

// dist/chunk-MY3RDBWQ.js
var turbo = [
  {
    name: "fintrack:turbo",
    plugins: {
      turbo: turboPlugin
    },
    rules: {
      ...turboPlugin.configs.recommended.rules
    }
  }
];

// dist/chunk-46O63CV3.js
var comments = [
  {
    name: "gravinawill:comments",
    plugins: {
      "eslint-comments": default8
    },
    rules: {
      ...default8.configs.recommended.rules,
      "eslint-comments/require-description": "error"
    }
  }
];

// dist/chunk-QOJ3KGUY.js
var ignores = [
  {
    ignores: GLOB_EXCLUDE
  }
];

// dist/chunk-ABUKXQOC.js
var importSort = [
  {
    name: "fintrack:import-sort",
    plugins: {
      "simple-import-sort": default13
    },
    rules: {
      "import/first": "error",
      "import/newline-after-import": "error",
      "import/no-duplicates": "error",
      "simple-import-sort/imports": [
        "error",
        {
          groups: [
            // Type imports
            [
              "^.*\\u0000$",
              "^node:.*\\u0000$",
              "^@?\\w.*\\u0000$",
              "^\\.\\..*\\u0000$",
              "^\\..*\\u0000$"
            ],
            // Side effect imports (e.g., `import 'some-module'`)
            ["^\\u0000"],
            // Internal packages
            ["^@fintrack/(.*)$"],
            // Node.js builtins prefixed with `node:`
            ["^node:"],
            // Things that start with a letter (or digit or underscore), or `@` followed by a letter
            ["^@?\\w"],
            // Absolute imports (e.g., `import something from 'src/utils'`)
            ["^[^.]"],
            // Parent directory relative imports (e.g., `import something from '../utils'`)
            ["^\\.\\."],
            // Current directory relative imports (e.g., `import something from './utils'`)
            ["^\\."]
          ]
        }
      ],
      "simple-import-sort/exports": "error"
    }
  }
];

// dist/chunk-ADQ3B5UC.js
var imports = [
  {
    name: "fintrack:imports",
    plugins: {
      import: importPlugin
    },
    rules: {
      "import/no-amd": "error",
      "import/no-commonjs": "error",
      "import/first": "error",
      "import/no-duplicates": "error",
      "import/no-mutable-exports": "error",
      "import/no-named-default": "error",
      "import/no-self-import": "error",
      "import/no-webpack-loader-syntax": "error",
      "import/newline-after-import": ["error", { count: 1 }]
    }
  }
];

// dist/chunk-NZUNWCTF.js
import globals from "globals";
var javascript = [
  {
    name: "fintrack:javascript",
    languageOptions: {
      ecmaVersion: 2022,
      globals: {
        ...globals.browser,
        ...globals.node,
        ...globals.es2022,
        document: "readonly",
        navigator: "readonly",
        window: "readonly"
      },
      parserOptions: {
        ecmaFeatures: {
          jsx: true
        },
        ecmaVersion: 2022,
        sourceType: "module"
      }
    },
    linterOptions: {
      reportUnusedDisableDirectives: true
    },
    plugins: {
      "unused-imports": default16
    },
    rules: {
      ...default2.configs.recommended.rules,
      "unused-imports/no-unused-imports": "error",
      "unused-imports/no-unused-vars": [
        "error",
        {
          vars: "all",
          varsIgnorePattern: "^_",
          args: "after-used",
          argsIgnorePattern: "^_"
        }
      ]
    }
  }
];

// dist/index.js
import { isPackageExists } from "local-pkg";
var hasTypeScript = isPackageExists("typescript");
var fintrack = async (options = {}, ...userConfigs) => {
  const {
    typescript: enableTypeScript = hasTypeScript,
    react: enableReact = false,
    turbo: enableTurbo = false,
    next: enableNext = false,
    playwright: enablePlaywright = false,
    testingLibrary: enableTestingLibrary = false,
    gitignore: enableGitignore = true
  } = options;
  const configs = [];
  if (enableGitignore) {
    configs.push((await import("eslint-config-flat-gitignore")).default());
  }
  configs.push(
    ...ignores,
    ...javascript,
    ...unicorn,
    ...comments,
    ...importSort,
    ...sonarjs,
    ...imports,
    ...prettier
  );
  if (enableTypeScript) {
    configs.push(...typescript(options));
  }
  if (enableReact) {
    configs.push(...react(options));
  }
  if (enableTurbo) {
    configs.push(...turbo);
  }
  if (enableNext) {
    configs.push(...next);
  }
  if (enablePlaywright) {
    configs.push(...playwright);
  }
  if (enableTestingLibrary) {
    configs.push(...testingLibrary);
  }
  configs.push(...userConfigs);
  return configs;
};
var index_default = fintrack;

// eslint.config.mjs
var eslint_config_default = index_default({
  project: "./tsconfig.json",
  tsconfigRootDir: import.meta.dirname,
  react: true,
  next: true,
  playwright: true,
  testingLibrary: true,
  turbo: true,
  typescript: true
});
export {
  eslint_config_default as default
};
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGlzdC9jaHVuay1LTFQ3U0NTRi5qcyIsICJkaXN0L2NodW5rLUVWRkVJWE1CLmpzIiwgImRpc3QvY2h1bmstUTZIVVU3QjMuanMiLCAiZGlzdC9jaHVuay1PMk5BTlBENi5qcyIsICJkaXN0L2NodW5rLVVPRFJZU0VRLmpzIiwgImRpc3QvY2h1bmstUkVIMzdOUFUuanMiLCAiZGlzdC9jaHVuay1QUkZXSjVSWi5qcyIsICJkaXN0L2NodW5rLVRVRVpIU05MLmpzIiwgImRpc3QvY2h1bmstVk5VVlVRSVQuanMiLCAiZGlzdC9jaHVuay1HRFhPNFY2VC5qcyIsICJkaXN0L2NodW5rLU1ZM1JEQldRLmpzIiwgImRpc3QvY2h1bmstNDZPNjNDVjMuanMiLCAiZGlzdC9jaHVuay1RT0ozS0dVWS5qcyIsICJkaXN0L2NodW5rLUFCVUtYUU9DLmpzIiwgImRpc3QvY2h1bmstQURRM0I1VUMuanMiLCAiZGlzdC9jaHVuay1OWlVOV0NURi5qcyIsICJkaXN0L2luZGV4LmpzIiwgImVzbGludC5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstS0xUN1NDU0YuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUtMVDdTQ1NGLmpzXCI7Ly8gc3JjL2dsb2JzLnRzXG52YXIgR0xPQl9TUkNfRVhUID0gXCI/KFtjbV0pW2p0XXM/KHgpXCI7XG52YXIgR0xPQl9KUyA9IFwiKiovKi4/KFtjbV0panNcIjtcbnZhciBHTE9CX0pTWCA9IFwiKiovKi4/KFtjbV0panN4XCI7XG52YXIgR0xPQl9UUyA9IFwiKiovKi4/KFtjbV0pdHNcIjtcbnZhciBHTE9CX1RTWCA9IFwiKiovKi4/KFtjbV0pdHN4XCI7XG52YXIgR0xPQl9FMkUgPSBgKiovZTJlLyoqLyoue3Rlc3Qsc3BlY30uJHtHTE9CX1NSQ19FWFR9YDtcbnZhciBHTE9CX1RFU1QgPSBgKiovdGVzdHMvKiovKi57dGVzdCxzcGVjfS4ke0dMT0JfU1JDX0VYVH1gO1xudmFyIEdMT0JfRVhDTFVERSA9IFtcbiAgXCIqKi9ub2RlX21vZHVsZXNcIixcbiAgXCIqKi9kaXN0XCIsXG4gIFwiKiovcGFja2FnZS1sb2NrLmpzb25cIixcbiAgXCIqKi95YXJuLmxvY2tcIixcbiAgXCIqKi9wbnBtLWxvY2sueWFtbFwiLFxuICBcIioqL2J1bi5sb2NrYlwiLFxuICBcIioqL291dHB1dFwiLFxuICBcIioqL2NvdmVyYWdlXCIsXG4gIFwiKiovdGVtcFwiLFxuICBcIioqLy50ZW1wXCIsXG4gIFwiKiovdG1wXCIsXG4gIFwiKiovLnRtcFwiLFxuICBcIioqLy5oaXN0b3J5XCIsXG4gIFwiKiovLm5leHRcIixcbiAgXCIqKi8udmVyY2VsXCIsXG4gIFwiKiovLmNoYW5nZXNldFwiLFxuICBcIioqLy5jYWNoZVwiLFxuICBcIioqL0NIQU5HRUxPRyoubWRcIixcbiAgXCIqKi9MSUNFTlNFKlwiXG5dO1xuXG5leHBvcnQge1xuICBHTE9CX0pTLFxuICBHTE9CX0pTWCxcbiAgR0xPQl9UUyxcbiAgR0xPQl9UU1gsXG4gIEdMT0JfRTJFLFxuICBHTE9CX1RFU1QsXG4gIEdMT0JfRVhDTFVERVxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstRVZGRUlYTUIuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUVWRkVJWE1CLmpzXCI7Ly8gc3JjL3BsdWdpbnMudHNcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDIgfSBmcm9tIFwiQGVzbGludC9qc1wiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0MyB9IGZyb20gXCJAZXNsaW50LXJlYWN0L2VzbGludC1wbHVnaW5cIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDQgfSBmcm9tIFwiQG5leHQvZXNsaW50LXBsdWdpbi1uZXh0XCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQ1IH0gZnJvbSBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQ2IH0gZnJvbSBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDcgfSBmcm9tIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0OCB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLWVzbGludC1jb21tZW50c1wiO1xuaW1wb3J0ICogYXMgaW1wb3J0UGx1Z2luIGZyb20gXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0OSB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxMCB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXBsYXl3cmlnaHRcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDExIH0gZnJvbSBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDEyIH0gZnJvbSBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDEzIH0gZnJvbSBcImVzbGludC1wbHVnaW4tc2ltcGxlLWltcG9ydC1zb3J0XCI7XG5pbXBvcnQgKiBhcyBzb25hcmpzUGx1Z2luIGZyb20gXCJlc2xpbnQtcGx1Z2luLXNvbmFyanNcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDE0IH0gZnJvbSBcImVzbGludC1wbHVnaW4tdGVzdGluZy1saWJyYXJ5XCI7XG5pbXBvcnQgKiBhcyB0dXJib1BsdWdpbiBmcm9tIFwiZXNsaW50LXBsdWdpbi10dXJib1wiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0MTUgfSBmcm9tIFwiZXNsaW50LXBsdWdpbi11bmljb3JuXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxNiB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXVudXNlZC1pbXBvcnRzXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQyIGFzIGRlZmF1bHQsXG4gIGRlZmF1bHQzIGFzIGRlZmF1bHQyLFxuICBkZWZhdWx0NCBhcyBkZWZhdWx0MyxcbiAgZGVmYXVsdDUgYXMgZGVmYXVsdDQsXG4gIGRlZmF1bHQ2IGFzIGRlZmF1bHQ1LFxuICBkZWZhdWx0NyBhcyBkZWZhdWx0NixcbiAgZGVmYXVsdDggYXMgZGVmYXVsdDcsXG4gIGltcG9ydFBsdWdpbixcbiAgZGVmYXVsdDkgYXMgZGVmYXVsdDgsXG4gIGRlZmF1bHQxMCBhcyBkZWZhdWx0OSxcbiAgZGVmYXVsdDExIGFzIGRlZmF1bHQxMCxcbiAgZGVmYXVsdDEyIGFzIGRlZmF1bHQxMSxcbiAgZGVmYXVsdDEzIGFzIGRlZmF1bHQxMixcbiAgc29uYXJqc1BsdWdpbixcbiAgZGVmYXVsdDE0IGFzIGRlZmF1bHQxMyxcbiAgdHVyYm9QbHVnaW4sXG4gIGRlZmF1bHQxNSBhcyBkZWZhdWx0MTQsXG4gIGRlZmF1bHQxNiBhcyBkZWZhdWx0MTVcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVE2SFVVN0IzLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1RNkhVVTdCMy5qc1wiO2ltcG9ydCB7XG4gIEdMT0JfVFMsXG4gIEdMT0JfVFNYXG59IGZyb20gXCIuL2NodW5rLUtMVDdTQ1NGLmpzXCI7XG5pbXBvcnQge1xuICBkZWZhdWx0NCBhcyBkZWZhdWx0MixcbiAgZGVmYXVsdDUgYXMgZGVmYXVsdDNcbn0gZnJvbSBcIi4vY2h1bmstRVZGRUlYTUIuanNcIjtcblxuLy8gc3JjL2NvbmZpZ3MvdHlwZXNjcmlwdC50c1xudmFyIHR5cGVzY3JpcHQgPSAob3B0aW9ucykgPT4gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazp0eXBlc2NyaXB0XCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnRcIjogZGVmYXVsdDJcbiAgICB9LFxuICAgIGZpbGVzOiBbR0xPQl9UUywgR0xPQl9UU1hdLFxuICAgIGxhbmd1YWdlT3B0aW9uczoge1xuICAgICAgcGFyc2VyOiBkZWZhdWx0MyxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHtcbiAgICAgICAgZWNtYUZlYXR1cmVzOiB7XG4gICAgICAgICAganN4OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnM/LnByb2plY3QsXG4gICAgICAgIHRzY29uZmlnUm9vdERpcjogb3B0aW9ucz8udHNjb25maWdSb290RGlyLFxuICAgICAgICBzb3VyY2VUeXBlOiBcIm1vZHVsZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlnc1tcInJlY29tbWVuZGVkLXR5cGUtY2hlY2tlZFwiXS5ydWxlcyxcbiAgICAgIC4uLmRlZmF1bHQyLmNvbmZpZ3NbXCJzdHJpY3QtdHlwZS1jaGVja2VkXCJdLnJ1bGVzLFxuICAgICAgLi4uZGVmYXVsdDIuY29uZmlnc1tcInN0eWxpc3RpYy10eXBlLWNoZWNrZWRcIl0ucnVsZXMsXG4gICAgICAuLi5kZWZhdWx0Mi5jb25maWdzW1wiZXNsaW50LXJlY29tbWVuZGVkXCJdLm92ZXJyaWRlc1swXS5ydWxlcyxcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2FycmF5LXR5cGVcIjogW1wiZXJyb3JcIiwgeyBkZWZhdWx0OiBcImFycmF5LXNpbXBsZVwiIH1dLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8taW52YWxpZC10aGlzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLXNoYWRvd1wiOiBcImVycm9yXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby1yZWR1bmRhbnQtdHlwZS1jb25zdGl0dWVudHNcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2NvbnNpc3RlbnQtdHlwZS1pbXBvcnRzXCI6IFtcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICB7XG4gICAgICAgICAgcHJlZmVyOiBcInR5cGUtaW1wb3J0c1wiLFxuICAgICAgICAgIGZpeFN0eWxlOiBcImlubGluZS10eXBlLWltcG9ydHNcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcmVzdHJpY3QtdGVtcGxhdGUtZXhwcmVzc2lvbnNcIjogW1wiZXJyb3JcIiwgeyBhbGxvd051bWJlcjogdHJ1ZSB9XSxcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLWNvbmZ1c2luZy12b2lkLWV4cHJlc3Npb25cIjogW1xuICAgICAgICBcImVycm9yXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBpZ25vcmVBcnJvd1Nob3J0aGFuZDogdHJ1ZSxcbiAgICAgICAgICBpZ25vcmVWb2lkT3BlcmF0b3I6IHRydWUsXG4gICAgICAgICAgaWdub3JlVm9pZFJldHVybmluZ0Z1bmN0aW9uczogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXCI6IFwib2ZmXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtY2FsbFwiOiBcIm9mZlwiLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXCI6IFwib2ZmXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9jb25zaXN0ZW50LXR5cGUtZGVmaW5pdGlvbnNcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblwiOiBcIm9mZlwiLFxuICAgICAgLy8gVHVybiBvZmYgZHVlIHRvIHBvb3IgcGVyZm9ybWFuY2VcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLW1pc3VzZWQtcHJvbWlzZXNcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzXCI6IFwib2ZmXCJcbiAgICB9XG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIHR5cGVzY3JpcHRcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLU8yTkFOUEQ2LmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1PMk5BTlBENi5qc1wiO2ltcG9ydCB7XG4gIGRlZmF1bHQxNCBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy91bmljb3JuLnRzXG52YXIgdW5pY29ybiA9IFtcbiAge1xuICAgIG5hbWU6IFwiZmludHJhY2s6dW5pY29yblwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHVuaWNvcm46IGRlZmF1bHQyXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwidW5pY29ybi9uby1hd2FpdC1leHByZXNzaW9uLW1lbWJlclwiOiBcIm9mZlwiLFxuICAgICAgXCJ1bmljb3JuL25vLW51bGxcIjogXCJvZmZcIixcbiAgICAgIFwidW5pY29ybi9wcmVmZXItZXhwb3J0LWZyb21cIjogW1wiZXJyb3JcIiwgeyBpZ25vcmVVc2VkVmFyaWFibGVzOiB0cnVlIH1dLFxuICAgICAgXCJ1bmljb3JuL3ByZXZlbnQtYWJicmV2aWF0aW9uc1wiOiBcIm9mZlwiLFxuICAgICAgXCJ1bmljb3JuL3ByZWZlci1zdHJpbmctcmF3XCI6IFwib2ZmXCIsXG4gICAgICBcInVuaWNvcm4vcHJlZmVyLXNwcmVhZFwiOiBcIm9mZlwiXG4gICAgfVxuICB9XG5dO1xuXG5leHBvcnQge1xuICB1bmljb3JuXG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1VT0RSWVNFUS5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstVU9EUllTRVEuanNcIjtpbXBvcnQge1xuICBkZWZhdWx0MyBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9uZXh0LnRzXG52YXIgbmV4dCA9IFtcbiAge1xuICAgIG5hbWU6IFwiZmludHJhY2s6bmV4dFwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwiQG5leHQvbmV4dFwiOiBkZWZhdWx0MlxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLmRlZmF1bHQyLmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXMsXG4gICAgICAuLi5kZWZhdWx0Mi5jb25maWdzW1wiY29yZS13ZWItdml0YWxzXCJdLnJ1bGVzLFxuICAgICAgXCJAbmV4dC9uZXh0L25vLWh0bWwtbGluay1mb3ItcGFnZXNcIjogXCJvZmZcIlxuICAgIH1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgbmV4dFxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstUkVIMzdOUFUuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVJFSDM3TlBVLmpzXCI7aW1wb3J0IHtcbiAgR0xPQl9FMkVcbn0gZnJvbSBcIi4vY2h1bmstS0xUN1NDU0YuanNcIjtcbmltcG9ydCB7XG4gIGRlZmF1bHQ5IGFzIGRlZmF1bHQyXG59IGZyb20gXCIuL2NodW5rLUVWRkVJWE1CLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL3BsYXl3cmlnaHQudHNcbnZhciBwbGF5d3JpZ2h0ID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazpwbGF5d3JpZ2h0XCIsXG4gICAgLi4uZGVmYXVsdDIuY29uZmlnc1tcImZsYXQvcmVjb21tZW5kZWRcIl0sXG4gICAgZmlsZXM6IFtHTE9CX0UyRV1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgcGxheXdyaWdodFxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstUFJGV0o1UlouanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVBSRldKNVJaLmpzXCI7aW1wb3J0IHtcbiAgZGVmYXVsdDEwIGFzIGRlZmF1bHQzLFxuICBkZWZhdWx0NiBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9wcmV0dGllci50c1xudmFyIHByZXR0aWVyID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazpwcmV0dGllclwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHByZXR0aWVyOiBkZWZhdWx0M1xuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC8vIEF2b2lkIGNvbmZsaWN0c1xuICAgICAgLi4uZGVmYXVsdDIucnVsZXMsXG4gICAgICBcInByZXR0aWVyL3ByZXR0aWVyXCI6IFtcImVycm9yXCIsIHsgZW5kT2ZMaW5lOiBcImF1dG9cIiB9XSxcbiAgICAgIFwiYXJyb3ctYm9keS1zdHlsZVwiOiBcIm9mZlwiLFxuICAgICAgXCJwcmVmZXItYXJyb3ctY2FsbGJhY2tcIjogXCJvZmZcIlxuICAgIH1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgcHJldHRpZXJcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVRVRVpIU05MLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1UVUVaSFNOTC5qc1wiO2ltcG9ydCB7XG4gIEdMT0JfSlMsXG4gIEdMT0JfSlNYLFxuICBHTE9CX1RTLFxuICBHTE9CX1RTWFxufSBmcm9tIFwiLi9jaHVuay1LTFQ3U0NTRi5qc1wiO1xuaW1wb3J0IHtcbiAgZGVmYXVsdDExIGFzIGRlZmF1bHQ1LFxuICBkZWZhdWx0MixcbiAgZGVmYXVsdDUgYXMgZGVmYXVsdDMsXG4gIGRlZmF1bHQ4IGFzIGRlZmF1bHQ0XG59IGZyb20gXCIuL2NodW5rLUVWRkVJWE1CLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL3JlYWN0LnRzXG52YXIgcmVhY3QgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCByZWFjdFBsdWdpbkFsbCA9IGRlZmF1bHQyLmNvbmZpZ3MuYWxsO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiZmludHJhY2s6cmVhY3RcIixcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgLi4ucmVhY3RQbHVnaW5BbGwucGx1Z2lucyxcbiAgICAgICAgXCJyZWFjdC1ob29rc1wiOiBkZWZhdWx0NSxcbiAgICAgICAgXCJqc3gtYTExeVwiOiBkZWZhdWx0NFxuICAgICAgfSxcbiAgICAgIGZpbGVzOiBbR0xPQl9KUywgR0xPQl9KU1gsIEdMT0JfVFMsIEdMT0JfVFNYXSxcbiAgICAgIGxhbmd1YWdlT3B0aW9uczoge1xuICAgICAgICBwYXJzZXI6IGRlZmF1bHQzLFxuICAgICAgICBwYXJzZXJPcHRpb25zOiB7XG4gICAgICAgICAgZWNtYUZlYXR1cmVzOiB7XG4gICAgICAgICAgICBqc3g6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb2plY3Q6IG9wdGlvbnM/LnByb2plY3QsXG4gICAgICAgICAgc291cmNlVHlwZTogXCJtb2R1bGVcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcnVsZXM6IHtcbiAgICAgICAgLi4ucmVhY3RQbHVnaW5BbGwucnVsZXMsXG4gICAgICAgIC4uLmRlZmF1bHQ1LmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXMsXG4gICAgICAgIC4uLmRlZmF1bHQ0LmNvbmZpZ3Muc3RyaWN0LnJ1bGVzLFxuICAgICAgICAvLyBAZXNsaW50LXJlYWN0XG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9uby1sZWFrZWQtY29uZGl0aW9uYWwtcmVuZGVyaW5nXCI6IFwiZXJyb3JcIixcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L2F2b2lkLXNob3J0aGFuZC1ib29sZWFuXCI6IFwib2ZmXCIsXG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9hdm9pZC1zaG9ydGhhbmQtZnJhZ21lbnRcIjogXCJvZmZcIixcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L3ByZWZlci1kZXN0cnVjdHVyaW5nLWFzc2lnbm1lbnRcIjogXCJvZmZcIixcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L25vLWFycmF5LWluZGV4LWtleVwiOiBcIm9mZlwiLFxuICAgICAgICBcIkBlc2xpbnQtcmVhY3Qvbm8tY29tcGxleC1jb25kaXRpb25hbC1yZW5kZXJpbmdcIjogXCJvZmZcIixcbiAgICAgICAgLy8gQGVzbGludC1yZWFjdC9ob29rcy1leHRyYVxuICAgICAgICBcIkBlc2xpbnQtcmVhY3QvaG9va3MtZXh0cmEvbm8tZGlyZWN0LXNldC1zdGF0ZS1pbi11c2UtZWZmZWN0XCI6IFwib2ZmXCIsXG4gICAgICAgIC8vIEBlc2xpbnQtcmVhY3QvZG9tXG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9kb20vbm8tZGFuZ2Vyb3VzbHktc2V0LWlubmVyaHRtbFwiOiBcIm9mZlwiLFxuICAgICAgICAvLyBAZXNsaW50LXJlYWN0L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9uYW1pbmctY29udmVudGlvbi9maWxlbmFtZVwiOiBbXG4gICAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJ1bGU6IFwia2ViYWItY2FzZVwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAvLyBqc3gtYTExeVxuICAgICAgICBcImpzeC1hMTF5L2FsdC10ZXh0XCI6IFtcbiAgICAgICAgICBcImVycm9yXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudHM6IFtcImltZ1wiXSxcbiAgICAgICAgICAgIGltZzogW1wiSW1hZ2VcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwianN4LWExMXkvbGFuZ1wiOiBcImVycm9yXCIsXG4gICAgICAgIFwianN4LWExMXkvbm8tYXJpYS1oaWRkZW4tb24tZm9jdXNhYmxlXCI6IFwiZXJyb3JcIixcbiAgICAgICAgXCJqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS1lbGVtZW50LXRvLWludGVyYWN0aXZlLXJvbGVcIjogW1xuICAgICAgICAgIFwiZXJyb3JcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1bDogW1wibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCIsIFwicmFkaW9ncm91cFwiLCBcInRhYmxpc3RcIiwgXCJ0cmVlXCIsIFwidHJlZWdyaWRcIl0sXG4gICAgICAgICAgICBvbDogW1wibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCIsIFwicmFkaW9ncm91cFwiLCBcInRhYmxpc3RcIiwgXCJ0cmVlXCIsIFwidHJlZWdyaWRcIl0sXG4gICAgICAgICAgICBsaTogW1wibWVudWl0ZW1cIiwgXCJvcHRpb25cIiwgXCJyb3dcIiwgXCJ0YWJcIiwgXCJ0cmVlaXRlbVwiXSxcbiAgICAgICAgICAgIHRhYmxlOiBbXCJncmlkXCJdLFxuICAgICAgICAgICAgdGQ6IFtcImdyaWRjZWxsXCJdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgXCJqc3gtYTExeVwiOiB7XG4gICAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgQnV0dG9uOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgSW1hZ2U6IFwiaW1nXCIsXG4gICAgICAgICAgICBJbnB1dDogXCJpbnB1dFwiLFxuICAgICAgICAgICAgVGV4dGFyZWE6IFwidGV4dGFyZWFcIixcbiAgICAgICAgICAgIExpbms6IFwiYVwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAuLi5yZWFjdFBsdWdpbkFsbC5zZXR0aW5nc1xuICAgICAgfVxuICAgIH1cbiAgXTtcbn07XG5cbmV4cG9ydCB7XG4gIHJlYWN0XG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1WTlVWVVFJVC5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstVk5VVlVRSVQuanNcIjtpbXBvcnQge1xuICBzb25hcmpzUGx1Z2luXG59IGZyb20gXCIuL2NodW5rLUVWRkVJWE1CLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL3NvbmFyanMudHNcbnZhciBzb25hcmpzID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazpzb25hcmpzXCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgc29uYXJqczogc29uYXJqc1BsdWdpblxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLnNvbmFyanNQbHVnaW4uY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwic29uYXJqcy9uby1kdXBsaWNhdGUtc3RyaW5nXCI6IFwib2ZmXCIsXG4gICAgICBcInNvbmFyanMvbm8tbmVzdGVkLWZ1bmN0aW9uc1wiOiBcIm9mZlwiLFxuICAgICAgXCJzb25hcmpzL3BzZXVkby1yYW5kb21cIjogXCJvZmZcIlxuICAgIH1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgc29uYXJqc1xufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstR0RYTzRWNlQuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUdEWE80VjZULmpzXCI7aW1wb3J0IHtcbiAgR0xPQl9URVNUXG59IGZyb20gXCIuL2NodW5rLUtMVDdTQ1NGLmpzXCI7XG5pbXBvcnQge1xuICBkZWZhdWx0MTMgYXMgZGVmYXVsdDJcbn0gZnJvbSBcIi4vY2h1bmstRVZGRUlYTUIuanNcIjtcblxuLy8gc3JjL2NvbmZpZ3MvdGVzdGluZy1saWJyYXJ5LnRzXG52YXIgdGVzdGluZ0xpYnJhcnkgPSBbXG4gIHtcbiAgICBuYW1lOiBcImZpbnRyYWNrOnRlc3RpbmctbGlicmFyeVwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwidGVzdGluZy1saWJyYXJ5XCI6IGRlZmF1bHQyXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlncy5yZWFjdC5ydWxlc1xuICAgIH0sXG4gICAgZmlsZXM6IFtHTE9CX1RFU1RdXG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIHRlc3RpbmdMaWJyYXJ5XG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1NWTNSREJXUS5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstTVkzUkRCV1EuanNcIjtpbXBvcnQge1xuICB0dXJib1BsdWdpblxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy90dXJiby50c1xudmFyIHR1cmJvID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazp0dXJib1wiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHR1cmJvOiB0dXJib1BsdWdpblxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLnR1cmJvUGx1Z2luLmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXNcbiAgICB9XG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIHR1cmJvXG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay00Nk82M0NWMy5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstNDZPNjNDVjMuanNcIjtpbXBvcnQge1xuICBkZWZhdWx0NyBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9jb21tZW50cy50c1xudmFyIGNvbW1lbnRzID0gW1xuICB7XG4gICAgbmFtZTogXCJncmF2aW5hd2lsbDpjb21tZW50c1wiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwiZXNsaW50LWNvbW1lbnRzXCI6IGRlZmF1bHQyXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwiZXNsaW50LWNvbW1lbnRzL3JlcXVpcmUtZGVzY3JpcHRpb25cIjogXCJlcnJvclwiXG4gICAgfVxuICB9XG5dO1xuXG5leHBvcnQge1xuICBjb21tZW50c1xufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstUU9KM0tHVVkuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVFPSjNLR1VZLmpzXCI7aW1wb3J0IHtcbiAgR0xPQl9FWENMVURFXG59IGZyb20gXCIuL2NodW5rLUtMVDdTQ1NGLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL2lnbm9yZXMudHNcbnZhciBpZ25vcmVzID0gW1xuICB7XG4gICAgaWdub3JlczogR0xPQl9FWENMVURFXG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIGlnbm9yZXNcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUFCVUtYUU9DLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1BQlVLWFFPQy5qc1wiO2ltcG9ydCB7XG4gIGRlZmF1bHQxMiBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9pbXBvcnQtc29ydC50c1xudmFyIGltcG9ydFNvcnQgPSBbXG4gIHtcbiAgICBuYW1lOiBcImZpbnRyYWNrOmltcG9ydC1zb3J0XCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgXCJzaW1wbGUtaW1wb3J0LXNvcnRcIjogZGVmYXVsdDJcbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICBcImltcG9ydC9maXJzdFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uZXdsaW5lLWFmdGVyLWltcG9ydFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1kdXBsaWNhdGVzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwic2ltcGxlLWltcG9ydC1zb3J0L2ltcG9ydHNcIjogW1xuICAgICAgICBcImVycm9yXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cHM6IFtcbiAgICAgICAgICAgIC8vIFR5cGUgaW1wb3J0c1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBcIl4uKlxcXFx1MDAwMCRcIixcbiAgICAgICAgICAgICAgXCJebm9kZTouKlxcXFx1MDAwMCRcIixcbiAgICAgICAgICAgICAgXCJeQD9cXFxcdy4qXFxcXHUwMDAwJFwiLFxuICAgICAgICAgICAgICBcIl5cXFxcLlxcXFwuLipcXFxcdTAwMDAkXCIsXG4gICAgICAgICAgICAgIFwiXlxcXFwuLipcXFxcdTAwMDAkXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzIChlLmcuLCBgaW1wb3J0ICdzb21lLW1vZHVsZSdgKVxuICAgICAgICAgICAgW1wiXlxcXFx1MDAwMFwiXSxcbiAgICAgICAgICAgIC8vIEludGVybmFsIHBhY2thZ2VzXG4gICAgICAgICAgICBbXCJeQGZpbnRyYWNrLyguKikkXCJdLFxuICAgICAgICAgICAgLy8gTm9kZS5qcyBidWlsdGlucyBwcmVmaXhlZCB3aXRoIGBub2RlOmBcbiAgICAgICAgICAgIFtcIl5ub2RlOlwiXSxcbiAgICAgICAgICAgIC8vIFRoaW5ncyB0aGF0IHN0YXJ0IHdpdGggYSBsZXR0ZXIgKG9yIGRpZ2l0IG9yIHVuZGVyc2NvcmUpLCBvciBgQGAgZm9sbG93ZWQgYnkgYSBsZXR0ZXJcbiAgICAgICAgICAgIFtcIl5AP1xcXFx3XCJdLFxuICAgICAgICAgICAgLy8gQWJzb2x1dGUgaW1wb3J0cyAoZS5nLiwgYGltcG9ydCBzb21ldGhpbmcgZnJvbSAnc3JjL3V0aWxzJ2ApXG4gICAgICAgICAgICBbXCJeW14uXVwiXSxcbiAgICAgICAgICAgIC8vIFBhcmVudCBkaXJlY3RvcnkgcmVsYXRpdmUgaW1wb3J0cyAoZS5nLiwgYGltcG9ydCBzb21ldGhpbmcgZnJvbSAnLi4vdXRpbHMnYClcbiAgICAgICAgICAgIFtcIl5cXFxcLlxcXFwuXCJdLFxuICAgICAgICAgICAgLy8gQ3VycmVudCBkaXJlY3RvcnkgcmVsYXRpdmUgaW1wb3J0cyAoZS5nLiwgYGltcG9ydCBzb21ldGhpbmcgZnJvbSAnLi91dGlscydgKVxuICAgICAgICAgICAgW1wiXlxcXFwuXCJdXG4gICAgICAgICAgXVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJzaW1wbGUtaW1wb3J0LXNvcnQvZXhwb3J0c1wiOiBcImVycm9yXCJcbiAgICB9XG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIGltcG9ydFNvcnRcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUFEUTNCNVVDLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1BRFEzQjVVQy5qc1wiO2ltcG9ydCB7XG4gIGltcG9ydFBsdWdpblxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9pbXBvcnRzLnRzXG52YXIgaW1wb3J0cyA9IFtcbiAge1xuICAgIG5hbWU6IFwiZmludHJhY2s6aW1wb3J0c1wiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIGltcG9ydDogaW1wb3J0UGx1Z2luXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgXCJpbXBvcnQvbm8tYW1kXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLWNvbW1vbmpzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L2ZpcnN0XCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLWR1cGxpY2F0ZXNcIjogXCJlcnJvclwiLFxuICAgICAgXCJpbXBvcnQvbm8tbXV0YWJsZS1leHBvcnRzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLW5hbWVkLWRlZmF1bHRcIjogXCJlcnJvclwiLFxuICAgICAgXCJpbXBvcnQvbm8tc2VsZi1pbXBvcnRcIjogXCJlcnJvclwiLFxuICAgICAgXCJpbXBvcnQvbm8td2VicGFjay1sb2FkZXItc3ludGF4XCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25ld2xpbmUtYWZ0ZXItaW1wb3J0XCI6IFtcImVycm9yXCIsIHsgY291bnQ6IDEgfV1cbiAgICB9XG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIGltcG9ydHNcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLU5aVU5XQ1RGLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1OWlVOV0NURi5qc1wiO2ltcG9ydCB7XG4gIGRlZmF1bHQgYXMgZGVmYXVsdDIsXG4gIGRlZmF1bHQxNSBhcyBkZWZhdWx0M1xufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9qYXZhc2NyaXB0LnRzXG5pbXBvcnQgZ2xvYmFscyBmcm9tIFwiZ2xvYmFsc1wiO1xudmFyIGphdmFzY3JpcHQgPSBbXG4gIHtcbiAgICBuYW1lOiBcImZpbnRyYWNrOmphdmFzY3JpcHRcIixcbiAgICBsYW5ndWFnZU9wdGlvbnM6IHtcbiAgICAgIGVjbWFWZXJzaW9uOiAyMDIyLFxuICAgICAgZ2xvYmFsczoge1xuICAgICAgICAuLi5nbG9iYWxzLmJyb3dzZXIsXG4gICAgICAgIC4uLmdsb2JhbHMubm9kZSxcbiAgICAgICAgLi4uZ2xvYmFscy5lczIwMjIsXG4gICAgICAgIGRvY3VtZW50OiBcInJlYWRvbmx5XCIsXG4gICAgICAgIG5hdmlnYXRvcjogXCJyZWFkb25seVwiLFxuICAgICAgICB3aW5kb3c6IFwicmVhZG9ubHlcIlxuICAgICAgfSxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHtcbiAgICAgICAgZWNtYUZlYXR1cmVzOiB7XG4gICAgICAgICAganN4OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIGVjbWFWZXJzaW9uOiAyMDIyLFxuICAgICAgICBzb3VyY2VUeXBlOiBcIm1vZHVsZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBsaW50ZXJPcHRpb25zOiB7XG4gICAgICByZXBvcnRVbnVzZWREaXNhYmxlRGlyZWN0aXZlczogdHJ1ZVxuICAgIH0sXG4gICAgcGx1Z2luczoge1xuICAgICAgXCJ1bnVzZWQtaW1wb3J0c1wiOiBkZWZhdWx0M1xuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLmRlZmF1bHQyLmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXMsXG4gICAgICBcInVudXNlZC1pbXBvcnRzL25vLXVudXNlZC1pbXBvcnRzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwidW51c2VkLWltcG9ydHMvbm8tdW51c2VkLXZhcnNcIjogW1xuICAgICAgICBcImVycm9yXCIsXG4gICAgICAgIHtcbiAgICAgICAgICB2YXJzOiBcImFsbFwiLFxuICAgICAgICAgIHZhcnNJZ25vcmVQYXR0ZXJuOiBcIl5fXCIsXG4gICAgICAgICAgYXJnczogXCJhZnRlci11c2VkXCIsXG4gICAgICAgICAgYXJnc0lnbm9yZVBhdHRlcm46IFwiXl9cIlxuICAgICAgICB9XG4gICAgICBdXG4gICAgfVxuICB9XG5dO1xuXG5leHBvcnQge1xuICBqYXZhc2NyaXB0XG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9pbmRleC5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvaW5kZXguanNcIjtpbXBvcnQge1xuICB0eXBlc2NyaXB0XG59IGZyb20gXCIuL2NodW5rLVE2SFVVN0IzLmpzXCI7XG5pbXBvcnQge1xuICB1bmljb3JuXG59IGZyb20gXCIuL2NodW5rLU8yTkFOUEQ2LmpzXCI7XG5pbXBvcnQge1xuICBuZXh0XG59IGZyb20gXCIuL2NodW5rLVVPRFJZU0VRLmpzXCI7XG5pbXBvcnQge1xuICBwbGF5d3JpZ2h0XG59IGZyb20gXCIuL2NodW5rLVJFSDM3TlBVLmpzXCI7XG5pbXBvcnQge1xuICBwcmV0dGllclxufSBmcm9tIFwiLi9jaHVuay1QUkZXSjVSWi5qc1wiO1xuaW1wb3J0IHtcbiAgcmVhY3Rcbn0gZnJvbSBcIi4vY2h1bmstVFVFWkhTTkwuanNcIjtcbmltcG9ydCB7XG4gIHNvbmFyanNcbn0gZnJvbSBcIi4vY2h1bmstVk5VVlVRSVQuanNcIjtcbmltcG9ydCB7XG4gIHRlc3RpbmdMaWJyYXJ5XG59IGZyb20gXCIuL2NodW5rLUdEWE80VjZULmpzXCI7XG5pbXBvcnQge1xuICB0dXJib1xufSBmcm9tIFwiLi9jaHVuay1NWTNSREJXUS5qc1wiO1xuaW1wb3J0IHtcbiAgY29tbWVudHNcbn0gZnJvbSBcIi4vY2h1bmstNDZPNjNDVjMuanNcIjtcbmltcG9ydCB7XG4gIGlnbm9yZXNcbn0gZnJvbSBcIi4vY2h1bmstUU9KM0tHVVkuanNcIjtcbmltcG9ydCB7XG4gIEdMT0JfRTJFLFxuICBHTE9CX0VYQ0xVREUsXG4gIEdMT0JfSlMsXG4gIEdMT0JfSlNYLFxuICBHTE9CX1RFU1QsXG4gIEdMT0JfVFMsXG4gIEdMT0JfVFNYXG59IGZyb20gXCIuL2NodW5rLUtMVDdTQ1NGLmpzXCI7XG5pbXBvcnQge1xuICBpbXBvcnRTb3J0XG59IGZyb20gXCIuL2NodW5rLUFCVUtYUU9DLmpzXCI7XG5pbXBvcnQge1xuICBpbXBvcnRzXG59IGZyb20gXCIuL2NodW5rLUFEUTNCNVVDLmpzXCI7XG5pbXBvcnQge1xuICBqYXZhc2NyaXB0XG59IGZyb20gXCIuL2NodW5rLU5aVU5XQ1RGLmpzXCI7XG5pbXBvcnQgXCIuL2NodW5rLUVWRkVJWE1CLmpzXCI7XG5cbi8vIHNyYy9pbmRleC50c1xuaW1wb3J0IHsgaXNQYWNrYWdlRXhpc3RzIH0gZnJvbSBcImxvY2FsLXBrZ1wiO1xudmFyIGhhc1R5cGVTY3JpcHQgPSBpc1BhY2thZ2VFeGlzdHMoXCJ0eXBlc2NyaXB0XCIpO1xudmFyIGZpbnRyYWNrID0gYXN5bmMgKG9wdGlvbnMgPSB7fSwgLi4udXNlckNvbmZpZ3MpID0+IHtcbiAgY29uc3Qge1xuICAgIHR5cGVzY3JpcHQ6IGVuYWJsZVR5cGVTY3JpcHQgPSBoYXNUeXBlU2NyaXB0LFxuICAgIHJlYWN0OiBlbmFibGVSZWFjdCA9IGZhbHNlLFxuICAgIHR1cmJvOiBlbmFibGVUdXJibyA9IGZhbHNlLFxuICAgIG5leHQ6IGVuYWJsZU5leHQgPSBmYWxzZSxcbiAgICBwbGF5d3JpZ2h0OiBlbmFibGVQbGF5d3JpZ2h0ID0gZmFsc2UsXG4gICAgdGVzdGluZ0xpYnJhcnk6IGVuYWJsZVRlc3RpbmdMaWJyYXJ5ID0gZmFsc2UsXG4gICAgZ2l0aWdub3JlOiBlbmFibGVHaXRpZ25vcmUgPSB0cnVlXG4gIH0gPSBvcHRpb25zO1xuICBjb25zdCBjb25maWdzID0gW107XG4gIGlmIChlbmFibGVHaXRpZ25vcmUpIHtcbiAgICBjb25maWdzLnB1c2goKGF3YWl0IGltcG9ydChcImVzbGludC1jb25maWctZmxhdC1naXRpZ25vcmVcIikpLmRlZmF1bHQoKSk7XG4gIH1cbiAgY29uZmlncy5wdXNoKFxuICAgIC4uLmlnbm9yZXMsXG4gICAgLi4uamF2YXNjcmlwdCxcbiAgICAuLi51bmljb3JuLFxuICAgIC4uLmNvbW1lbnRzLFxuICAgIC4uLmltcG9ydFNvcnQsXG4gICAgLi4uc29uYXJqcyxcbiAgICAuLi5pbXBvcnRzLFxuICAgIC4uLnByZXR0aWVyXG4gICk7XG4gIGlmIChlbmFibGVUeXBlU2NyaXB0KSB7XG4gICAgY29uZmlncy5wdXNoKC4uLnR5cGVzY3JpcHQob3B0aW9ucykpO1xuICB9XG4gIGlmIChlbmFibGVSZWFjdCkge1xuICAgIGNvbmZpZ3MucHVzaCguLi5yZWFjdChvcHRpb25zKSk7XG4gIH1cbiAgaWYgKGVuYWJsZVR1cmJvKSB7XG4gICAgY29uZmlncy5wdXNoKC4uLnR1cmJvKTtcbiAgfVxuICBpZiAoZW5hYmxlTmV4dCkge1xuICAgIGNvbmZpZ3MucHVzaCguLi5uZXh0KTtcbiAgfVxuICBpZiAoZW5hYmxlUGxheXdyaWdodCkge1xuICAgIGNvbmZpZ3MucHVzaCguLi5wbGF5d3JpZ2h0KTtcbiAgfVxuICBpZiAoZW5hYmxlVGVzdGluZ0xpYnJhcnkpIHtcbiAgICBjb25maWdzLnB1c2goLi4udGVzdGluZ0xpYnJhcnkpO1xuICB9XG4gIGNvbmZpZ3MucHVzaCguLi51c2VyQ29uZmlncyk7XG4gIHJldHVybiBjb25maWdzO1xufTtcbnZhciBpbmRleF9kZWZhdWx0ID0gZmludHJhY2s7XG5leHBvcnQge1xuICBHTE9CX0UyRSxcbiAgR0xPQl9FWENMVURFLFxuICBHTE9CX0pTLFxuICBHTE9CX0pTWCxcbiAgR0xPQl9URVNULFxuICBHTE9CX1RTLFxuICBHTE9CX1RTWCxcbiAgaW5kZXhfZGVmYXVsdCBhcyBkZWZhdWx0XG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZXNsaW50LmNvbmZpZy5tanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWdcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZXNsaW50LmNvbmZpZy5tanNcIjtpbXBvcnQgZmludHJhY2sgZnJvbSAnLi9kaXN0L2luZGV4LmpzJ1xuXG5leHBvcnQgZGVmYXVsdCBmaW50cmFjayh7XG4gIHByb2plY3Q6ICcuL3RzY29uZmlnLmpzb24nLFxuICB0c2NvbmZpZ1Jvb3REaXI6IGltcG9ydC5tZXRhLmRpcm5hbWUsXG4gIHJlYWN0OiB0cnVlLFxuICBuZXh0OiB0cnVlLFxuICBwbGF5d3JpZ2h0OiB0cnVlLFxuICB0ZXN0aW5nTGlicmFyeTogdHJ1ZSxcbiAgdHVyYm86IHRydWUsXG4gIHR5cGVzY3JpcHQ6IHRydWVcbn0pXG4iXSwKICAibWFwcGluZ3MiOiAiO0FBQ0EsSUFBSSxlQUFlO0FBQ25CLElBQUksVUFBVTtBQUNkLElBQUksV0FBVztB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
