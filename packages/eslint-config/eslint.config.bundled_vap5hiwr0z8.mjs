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

// dist/chunk-SYZED4NX.js
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
//# sourceMappingURL=data:application/json;base64,ewogICJ2ZXJzaW9uIjogMywKICAic291cmNlcyI6IFsiZGlzdC9jaHVuay1LTFQ3U0NTRi5qcyIsICJkaXN0L2NodW5rLUVWRkVJWE1CLmpzIiwgImRpc3QvY2h1bmstUTZIVVU3QjMuanMiLCAiZGlzdC9jaHVuay1PMk5BTlBENi5qcyIsICJkaXN0L2NodW5rLVVPRFJZU0VRLmpzIiwgImRpc3QvY2h1bmstUkVIMzdOUFUuanMiLCAiZGlzdC9jaHVuay1QUkZXSjVSWi5qcyIsICJkaXN0L2NodW5rLVRVRVpIU05MLmpzIiwgImRpc3QvY2h1bmstVk5VVlVRSVQuanMiLCAiZGlzdC9jaHVuay1HRFhPNFY2VC5qcyIsICJkaXN0L2NodW5rLU1ZM1JEQldRLmpzIiwgImRpc3QvY2h1bmstNDZPNjNDVjMuanMiLCAiZGlzdC9jaHVuay1RT0ozS0dVWS5qcyIsICJkaXN0L2NodW5rLVNZWkVENE5YLmpzIiwgImRpc3QvY2h1bmstQURRM0I1VUMuanMiLCAiZGlzdC9jaHVuay1OWlVOV0NURi5qcyIsICJkaXN0L2luZGV4LmpzIiwgImVzbGludC5jb25maWcubWpzIl0sCiAgInNvdXJjZXNDb250ZW50IjogWyJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstS0xUN1NDU0YuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUtMVDdTQ1NGLmpzXCI7Ly8gc3JjL2dsb2JzLnRzXG52YXIgR0xPQl9TUkNfRVhUID0gXCI/KFtjbV0pW2p0XXM/KHgpXCI7XG52YXIgR0xPQl9KUyA9IFwiKiovKi4/KFtjbV0panNcIjtcbnZhciBHTE9CX0pTWCA9IFwiKiovKi4/KFtjbV0panN4XCI7XG52YXIgR0xPQl9UUyA9IFwiKiovKi4/KFtjbV0pdHNcIjtcbnZhciBHTE9CX1RTWCA9IFwiKiovKi4/KFtjbV0pdHN4XCI7XG52YXIgR0xPQl9FMkUgPSBgKiovZTJlLyoqLyoue3Rlc3Qsc3BlY30uJHtHTE9CX1NSQ19FWFR9YDtcbnZhciBHTE9CX1RFU1QgPSBgKiovdGVzdHMvKiovKi57dGVzdCxzcGVjfS4ke0dMT0JfU1JDX0VYVH1gO1xudmFyIEdMT0JfRVhDTFVERSA9IFtcbiAgXCIqKi9ub2RlX21vZHVsZXNcIixcbiAgXCIqKi9kaXN0XCIsXG4gIFwiKiovcGFja2FnZS1sb2NrLmpzb25cIixcbiAgXCIqKi95YXJuLmxvY2tcIixcbiAgXCIqKi9wbnBtLWxvY2sueWFtbFwiLFxuICBcIioqL2J1bi5sb2NrYlwiLFxuICBcIioqL291dHB1dFwiLFxuICBcIioqL2NvdmVyYWdlXCIsXG4gIFwiKiovdGVtcFwiLFxuICBcIioqLy50ZW1wXCIsXG4gIFwiKiovdG1wXCIsXG4gIFwiKiovLnRtcFwiLFxuICBcIioqLy5oaXN0b3J5XCIsXG4gIFwiKiovLm5leHRcIixcbiAgXCIqKi8udmVyY2VsXCIsXG4gIFwiKiovLmNoYW5nZXNldFwiLFxuICBcIioqLy5jYWNoZVwiLFxuICBcIioqL0NIQU5HRUxPRyoubWRcIixcbiAgXCIqKi9MSUNFTlNFKlwiXG5dO1xuXG5leHBvcnQge1xuICBHTE9CX0pTLFxuICBHTE9CX0pTWCxcbiAgR0xPQl9UUyxcbiAgR0xPQl9UU1gsXG4gIEdMT0JfRTJFLFxuICBHTE9CX1RFU1QsXG4gIEdMT0JfRVhDTFVERVxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstRVZGRUlYTUIuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUVWRkVJWE1CLmpzXCI7Ly8gc3JjL3BsdWdpbnMudHNcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDIgfSBmcm9tIFwiQGVzbGludC9qc1wiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0MyB9IGZyb20gXCJAZXNsaW50LXJlYWN0L2VzbGludC1wbHVnaW5cIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDQgfSBmcm9tIFwiQG5leHQvZXNsaW50LXBsdWdpbi1uZXh0XCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQ1IH0gZnJvbSBcIkB0eXBlc2NyaXB0LWVzbGludC9lc2xpbnQtcGx1Z2luXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQ2IH0gZnJvbSBcIkB0eXBlc2NyaXB0LWVzbGludC9wYXJzZXJcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDcgfSBmcm9tIFwiZXNsaW50LWNvbmZpZy1wcmV0dGllclwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0OCB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLWVzbGludC1jb21tZW50c1wiO1xuaW1wb3J0ICogYXMgaW1wb3J0UGx1Z2luIGZyb20gXCJlc2xpbnQtcGx1Z2luLWltcG9ydFwiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0OSB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLWpzeC1hMTF5XCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxMCB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXBsYXl3cmlnaHRcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDExIH0gZnJvbSBcImVzbGludC1wbHVnaW4tcHJldHRpZXJcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDEyIH0gZnJvbSBcImVzbGludC1wbHVnaW4tcmVhY3QtaG9va3NcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDEzIH0gZnJvbSBcImVzbGludC1wbHVnaW4tc2ltcGxlLWltcG9ydC1zb3J0XCI7XG5pbXBvcnQgKiBhcyBzb25hcmpzUGx1Z2luIGZyb20gXCJlc2xpbnQtcGx1Z2luLXNvbmFyanNcIjtcbmltcG9ydCB7IGRlZmF1bHQgYXMgZGVmYXVsdDE0IH0gZnJvbSBcImVzbGludC1wbHVnaW4tdGVzdGluZy1saWJyYXJ5XCI7XG5pbXBvcnQgKiBhcyB0dXJib1BsdWdpbiBmcm9tIFwiZXNsaW50LXBsdWdpbi10dXJib1wiO1xuaW1wb3J0IHsgZGVmYXVsdCBhcyBkZWZhdWx0MTUgfSBmcm9tIFwiZXNsaW50LXBsdWdpbi11bmljb3JuXCI7XG5pbXBvcnQgeyBkZWZhdWx0IGFzIGRlZmF1bHQxNiB9IGZyb20gXCJlc2xpbnQtcGx1Z2luLXVudXNlZC1pbXBvcnRzXCI7XG5cbmV4cG9ydCB7XG4gIGRlZmF1bHQyIGFzIGRlZmF1bHQsXG4gIGRlZmF1bHQzIGFzIGRlZmF1bHQyLFxuICBkZWZhdWx0NCBhcyBkZWZhdWx0MyxcbiAgZGVmYXVsdDUgYXMgZGVmYXVsdDQsXG4gIGRlZmF1bHQ2IGFzIGRlZmF1bHQ1LFxuICBkZWZhdWx0NyBhcyBkZWZhdWx0NixcbiAgZGVmYXVsdDggYXMgZGVmYXVsdDcsXG4gIGltcG9ydFBsdWdpbixcbiAgZGVmYXVsdDkgYXMgZGVmYXVsdDgsXG4gIGRlZmF1bHQxMCBhcyBkZWZhdWx0OSxcbiAgZGVmYXVsdDExIGFzIGRlZmF1bHQxMCxcbiAgZGVmYXVsdDEyIGFzIGRlZmF1bHQxMSxcbiAgZGVmYXVsdDEzIGFzIGRlZmF1bHQxMixcbiAgc29uYXJqc1BsdWdpbixcbiAgZGVmYXVsdDE0IGFzIGRlZmF1bHQxMyxcbiAgdHVyYm9QbHVnaW4sXG4gIGRlZmF1bHQxNSBhcyBkZWZhdWx0MTQsXG4gIGRlZmF1bHQxNiBhcyBkZWZhdWx0MTVcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVE2SFVVN0IzLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1RNkhVVTdCMy5qc1wiO2ltcG9ydCB7XG4gIEdMT0JfVFMsXG4gIEdMT0JfVFNYXG59IGZyb20gXCIuL2NodW5rLUtMVDdTQ1NGLmpzXCI7XG5pbXBvcnQge1xuICBkZWZhdWx0NCBhcyBkZWZhdWx0MixcbiAgZGVmYXVsdDUgYXMgZGVmYXVsdDNcbn0gZnJvbSBcIi4vY2h1bmstRVZGRUlYTUIuanNcIjtcblxuLy8gc3JjL2NvbmZpZ3MvdHlwZXNjcmlwdC50c1xudmFyIHR5cGVzY3JpcHQgPSAob3B0aW9ucykgPT4gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazp0eXBlc2NyaXB0XCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnRcIjogZGVmYXVsdDJcbiAgICB9LFxuICAgIGZpbGVzOiBbR0xPQl9UUywgR0xPQl9UU1hdLFxuICAgIGxhbmd1YWdlT3B0aW9uczoge1xuICAgICAgcGFyc2VyOiBkZWZhdWx0MyxcbiAgICAgIHBhcnNlck9wdGlvbnM6IHtcbiAgICAgICAgZWNtYUZlYXR1cmVzOiB7XG4gICAgICAgICAganN4OiB0cnVlXG4gICAgICAgIH0sXG4gICAgICAgIHByb2plY3Q6IG9wdGlvbnM/LnByb2plY3QsXG4gICAgICAgIHRzY29uZmlnUm9vdERpcjogb3B0aW9ucz8udHNjb25maWdSb290RGlyLFxuICAgICAgICBzb3VyY2VUeXBlOiBcIm1vZHVsZVwiXG4gICAgICB9XG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlnc1tcInJlY29tbWVuZGVkLXR5cGUtY2hlY2tlZFwiXS5ydWxlcyxcbiAgICAgIC4uLmRlZmF1bHQyLmNvbmZpZ3NbXCJzdHJpY3QtdHlwZS1jaGVja2VkXCJdLnJ1bGVzLFxuICAgICAgLi4uZGVmYXVsdDIuY29uZmlnc1tcInN0eWxpc3RpYy10eXBlLWNoZWNrZWRcIl0ucnVsZXMsXG4gICAgICAuLi5kZWZhdWx0Mi5jb25maWdzW1wiZXNsaW50LXJlY29tbWVuZGVkXCJdLm92ZXJyaWRlc1swXS5ydWxlcyxcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2FycmF5LXR5cGVcIjogW1wiZXJyb3JcIiwgeyBkZWZhdWx0OiBcImFycmF5LXNpbXBsZVwiIH1dLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8taW52YWxpZC10aGlzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLXNoYWRvd1wiOiBcImVycm9yXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby1yZWR1bmRhbnQtdHlwZS1jb25zdGl0dWVudHNcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L2NvbnNpc3RlbnQtdHlwZS1pbXBvcnRzXCI6IFtcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICB7XG4gICAgICAgICAgcHJlZmVyOiBcInR5cGUtaW1wb3J0c1wiLFxuICAgICAgICAgIGZpeFN0eWxlOiBcImlubGluZS10eXBlLWltcG9ydHNcIlxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvcmVzdHJpY3QtdGVtcGxhdGUtZXhwcmVzc2lvbnNcIjogW1wiZXJyb3JcIiwgeyBhbGxvd051bWJlcjogdHJ1ZSB9XSxcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLWNvbmZ1c2luZy12b2lkLWV4cHJlc3Npb25cIjogW1xuICAgICAgICBcImVycm9yXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBpZ25vcmVBcnJvd1Nob3J0aGFuZDogdHJ1ZSxcbiAgICAgICAgICBpZ25vcmVWb2lkT3BlcmF0b3I6IHRydWUsXG4gICAgICAgICAgaWdub3JlVm9pZFJldHVybmluZ0Z1bmN0aW9uczogdHJ1ZVxuICAgICAgICB9XG4gICAgICBdLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8tbmFtZXNwYWNlXCI6IFwib2ZmXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9uby11bnNhZmUtY2FsbFwiOiBcIm9mZlwiLFxuICAgICAgXCJAdHlwZXNjcmlwdC1lc2xpbnQvbm8tdW5zYWZlLWFzc2lnbm1lbnRcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLXVuc2FmZS1tZW1iZXItYWNjZXNzXCI6IFwib2ZmXCIsXG4gICAgICBcIkB0eXBlc2NyaXB0LWVzbGludC9jb25zaXN0ZW50LXR5cGUtZGVmaW5pdGlvbnNcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLW5vbi1udWxsLWFzc2VydGlvblwiOiBcIm9mZlwiLFxuICAgICAgLy8gVHVybiBvZmYgZHVlIHRvIHBvb3IgcGVyZm9ybWFuY2VcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLW1pc3VzZWQtcHJvbWlzZXNcIjogXCJvZmZcIixcbiAgICAgIFwiQHR5cGVzY3JpcHQtZXNsaW50L25vLWZsb2F0aW5nLXByb21pc2VzXCI6IFwib2ZmXCJcbiAgICB9XG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIHR5cGVzY3JpcHRcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLU8yTkFOUEQ2LmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1PMk5BTlBENi5qc1wiO2ltcG9ydCB7XG4gIGRlZmF1bHQxNCBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy91bmljb3JuLnRzXG52YXIgdW5pY29ybiA9IFtcbiAge1xuICAgIG5hbWU6IFwiZmludHJhY2s6dW5pY29yblwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHVuaWNvcm46IGRlZmF1bHQyXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwidW5pY29ybi9uby1hd2FpdC1leHByZXNzaW9uLW1lbWJlclwiOiBcIm9mZlwiLFxuICAgICAgXCJ1bmljb3JuL25vLW51bGxcIjogXCJvZmZcIixcbiAgICAgIFwidW5pY29ybi9wcmVmZXItZXhwb3J0LWZyb21cIjogW1wiZXJyb3JcIiwgeyBpZ25vcmVVc2VkVmFyaWFibGVzOiB0cnVlIH1dLFxuICAgICAgXCJ1bmljb3JuL3ByZXZlbnQtYWJicmV2aWF0aW9uc1wiOiBcIm9mZlwiLFxuICAgICAgXCJ1bmljb3JuL3ByZWZlci1zdHJpbmctcmF3XCI6IFwib2ZmXCIsXG4gICAgICBcInVuaWNvcm4vcHJlZmVyLXNwcmVhZFwiOiBcIm9mZlwiXG4gICAgfVxuICB9XG5dO1xuXG5leHBvcnQge1xuICB1bmljb3JuXG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1VT0RSWVNFUS5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstVU9EUllTRVEuanNcIjtpbXBvcnQge1xuICBkZWZhdWx0MyBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9uZXh0LnRzXG52YXIgbmV4dCA9IFtcbiAge1xuICAgIG5hbWU6IFwiZmludHJhY2s6bmV4dFwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwiQG5leHQvbmV4dFwiOiBkZWZhdWx0MlxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLmRlZmF1bHQyLmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXMsXG4gICAgICAuLi5kZWZhdWx0Mi5jb25maWdzW1wiY29yZS13ZWItdml0YWxzXCJdLnJ1bGVzLFxuICAgICAgXCJAbmV4dC9uZXh0L25vLWh0bWwtbGluay1mb3ItcGFnZXNcIjogXCJvZmZcIlxuICAgIH1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgbmV4dFxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstUkVIMzdOUFUuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVJFSDM3TlBVLmpzXCI7aW1wb3J0IHtcbiAgR0xPQl9FMkVcbn0gZnJvbSBcIi4vY2h1bmstS0xUN1NDU0YuanNcIjtcbmltcG9ydCB7XG4gIGRlZmF1bHQ5IGFzIGRlZmF1bHQyXG59IGZyb20gXCIuL2NodW5rLUVWRkVJWE1CLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL3BsYXl3cmlnaHQudHNcbnZhciBwbGF5d3JpZ2h0ID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazpwbGF5d3JpZ2h0XCIsXG4gICAgLi4uZGVmYXVsdDIuY29uZmlnc1tcImZsYXQvcmVjb21tZW5kZWRcIl0sXG4gICAgZmlsZXM6IFtHTE9CX0UyRV1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgcGxheXdyaWdodFxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstUFJGV0o1UlouanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVBSRldKNVJaLmpzXCI7aW1wb3J0IHtcbiAgZGVmYXVsdDEwIGFzIGRlZmF1bHQzLFxuICBkZWZhdWx0NiBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9wcmV0dGllci50c1xudmFyIHByZXR0aWVyID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazpwcmV0dGllclwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHByZXR0aWVyOiBkZWZhdWx0M1xuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC8vIEF2b2lkIGNvbmZsaWN0c1xuICAgICAgLi4uZGVmYXVsdDIucnVsZXMsXG4gICAgICBcInByZXR0aWVyL3ByZXR0aWVyXCI6IFtcImVycm9yXCIsIHsgZW5kT2ZMaW5lOiBcImF1dG9cIiB9XSxcbiAgICAgIFwiYXJyb3ctYm9keS1zdHlsZVwiOiBcIm9mZlwiLFxuICAgICAgXCJwcmVmZXItYXJyb3ctY2FsbGJhY2tcIjogXCJvZmZcIlxuICAgIH1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgcHJldHRpZXJcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVRVRVpIU05MLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1UVUVaSFNOTC5qc1wiO2ltcG9ydCB7XG4gIEdMT0JfSlMsXG4gIEdMT0JfSlNYLFxuICBHTE9CX1RTLFxuICBHTE9CX1RTWFxufSBmcm9tIFwiLi9jaHVuay1LTFQ3U0NTRi5qc1wiO1xuaW1wb3J0IHtcbiAgZGVmYXVsdDExIGFzIGRlZmF1bHQ1LFxuICBkZWZhdWx0MixcbiAgZGVmYXVsdDUgYXMgZGVmYXVsdDMsXG4gIGRlZmF1bHQ4IGFzIGRlZmF1bHQ0XG59IGZyb20gXCIuL2NodW5rLUVWRkVJWE1CLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL3JlYWN0LnRzXG52YXIgcmVhY3QgPSAob3B0aW9ucykgPT4ge1xuICBjb25zdCByZWFjdFBsdWdpbkFsbCA9IGRlZmF1bHQyLmNvbmZpZ3MuYWxsO1xuICByZXR1cm4gW1xuICAgIHtcbiAgICAgIG5hbWU6IFwiZmludHJhY2s6cmVhY3RcIixcbiAgICAgIHBsdWdpbnM6IHtcbiAgICAgICAgLi4ucmVhY3RQbHVnaW5BbGwucGx1Z2lucyxcbiAgICAgICAgXCJyZWFjdC1ob29rc1wiOiBkZWZhdWx0NSxcbiAgICAgICAgXCJqc3gtYTExeVwiOiBkZWZhdWx0NFxuICAgICAgfSxcbiAgICAgIGZpbGVzOiBbR0xPQl9KUywgR0xPQl9KU1gsIEdMT0JfVFMsIEdMT0JfVFNYXSxcbiAgICAgIGxhbmd1YWdlT3B0aW9uczoge1xuICAgICAgICBwYXJzZXI6IGRlZmF1bHQzLFxuICAgICAgICBwYXJzZXJPcHRpb25zOiB7XG4gICAgICAgICAgZWNtYUZlYXR1cmVzOiB7XG4gICAgICAgICAgICBqc3g6IHRydWVcbiAgICAgICAgICB9LFxuICAgICAgICAgIHByb2plY3Q6IG9wdGlvbnM/LnByb2plY3QsXG4gICAgICAgICAgc291cmNlVHlwZTogXCJtb2R1bGVcIlxuICAgICAgICB9XG4gICAgICB9LFxuICAgICAgcnVsZXM6IHtcbiAgICAgICAgLi4ucmVhY3RQbHVnaW5BbGwucnVsZXMsXG4gICAgICAgIC4uLmRlZmF1bHQ1LmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXMsXG4gICAgICAgIC4uLmRlZmF1bHQ0LmNvbmZpZ3Muc3RyaWN0LnJ1bGVzLFxuICAgICAgICAvLyBAZXNsaW50LXJlYWN0XG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9uby1sZWFrZWQtY29uZGl0aW9uYWwtcmVuZGVyaW5nXCI6IFwiZXJyb3JcIixcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L2F2b2lkLXNob3J0aGFuZC1ib29sZWFuXCI6IFwib2ZmXCIsXG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9hdm9pZC1zaG9ydGhhbmQtZnJhZ21lbnRcIjogXCJvZmZcIixcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L3ByZWZlci1kZXN0cnVjdHVyaW5nLWFzc2lnbm1lbnRcIjogXCJvZmZcIixcbiAgICAgICAgXCJAZXNsaW50LXJlYWN0L25vLWFycmF5LWluZGV4LWtleVwiOiBcIm9mZlwiLFxuICAgICAgICBcIkBlc2xpbnQtcmVhY3Qvbm8tY29tcGxleC1jb25kaXRpb25hbC1yZW5kZXJpbmdcIjogXCJvZmZcIixcbiAgICAgICAgLy8gQGVzbGludC1yZWFjdC9ob29rcy1leHRyYVxuICAgICAgICBcIkBlc2xpbnQtcmVhY3QvaG9va3MtZXh0cmEvbm8tZGlyZWN0LXNldC1zdGF0ZS1pbi11c2UtZWZmZWN0XCI6IFwib2ZmXCIsXG4gICAgICAgIC8vIEBlc2xpbnQtcmVhY3QvZG9tXG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9kb20vbm8tZGFuZ2Vyb3VzbHktc2V0LWlubmVyaHRtbFwiOiBcIm9mZlwiLFxuICAgICAgICAvLyBAZXNsaW50LXJlYWN0L25hbWluZy1jb252ZW50aW9uXG4gICAgICAgIFwiQGVzbGludC1yZWFjdC9uYW1pbmctY29udmVudGlvbi9maWxlbmFtZVwiOiBbXG4gICAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICAgIHtcbiAgICAgICAgICAgIHJ1bGU6IFwia2ViYWItY2FzZVwiXG4gICAgICAgICAgfVxuICAgICAgICBdLFxuICAgICAgICAvLyBqc3gtYTExeVxuICAgICAgICBcImpzeC1hMTF5L2FsdC10ZXh0XCI6IFtcbiAgICAgICAgICBcImVycm9yXCIsXG4gICAgICAgICAge1xuICAgICAgICAgICAgZWxlbWVudHM6IFtcImltZ1wiXSxcbiAgICAgICAgICAgIGltZzogW1wiSW1hZ2VcIl1cbiAgICAgICAgICB9XG4gICAgICAgIF0sXG4gICAgICAgIFwianN4LWExMXkvbGFuZ1wiOiBcImVycm9yXCIsXG4gICAgICAgIFwianN4LWExMXkvbm8tYXJpYS1oaWRkZW4tb24tZm9jdXNhYmxlXCI6IFwiZXJyb3JcIixcbiAgICAgICAgXCJqc3gtYTExeS9uby1ub25pbnRlcmFjdGl2ZS1lbGVtZW50LXRvLWludGVyYWN0aXZlLXJvbGVcIjogW1xuICAgICAgICAgIFwiZXJyb3JcIixcbiAgICAgICAgICB7XG4gICAgICAgICAgICB1bDogW1wibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCIsIFwicmFkaW9ncm91cFwiLCBcInRhYmxpc3RcIiwgXCJ0cmVlXCIsIFwidHJlZWdyaWRcIl0sXG4gICAgICAgICAgICBvbDogW1wibGlzdGJveFwiLCBcIm1lbnVcIiwgXCJtZW51YmFyXCIsIFwicmFkaW9ncm91cFwiLCBcInRhYmxpc3RcIiwgXCJ0cmVlXCIsIFwidHJlZWdyaWRcIl0sXG4gICAgICAgICAgICBsaTogW1wibWVudWl0ZW1cIiwgXCJvcHRpb25cIiwgXCJyb3dcIiwgXCJ0YWJcIiwgXCJ0cmVlaXRlbVwiXSxcbiAgICAgICAgICAgIHRhYmxlOiBbXCJncmlkXCJdLFxuICAgICAgICAgICAgdGQ6IFtcImdyaWRjZWxsXCJdXG4gICAgICAgICAgfVxuICAgICAgICBdXG4gICAgICB9LFxuICAgICAgc2V0dGluZ3M6IHtcbiAgICAgICAgXCJqc3gtYTExeVwiOiB7XG4gICAgICAgICAgY29tcG9uZW50czoge1xuICAgICAgICAgICAgQnV0dG9uOiBcImJ1dHRvblwiLFxuICAgICAgICAgICAgSW1hZ2U6IFwiaW1nXCIsXG4gICAgICAgICAgICBJbnB1dDogXCJpbnB1dFwiLFxuICAgICAgICAgICAgVGV4dGFyZWE6IFwidGV4dGFyZWFcIixcbiAgICAgICAgICAgIExpbms6IFwiYVwiXG4gICAgICAgICAgfVxuICAgICAgICB9LFxuICAgICAgICAuLi5yZWFjdFBsdWdpbkFsbC5zZXR0aW5nc1xuICAgICAgfVxuICAgIH1cbiAgXTtcbn07XG5cbmV4cG9ydCB7XG4gIHJlYWN0XG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1WTlVWVVFJVC5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstVk5VVlVRSVQuanNcIjtpbXBvcnQge1xuICBzb25hcmpzUGx1Z2luXG59IGZyb20gXCIuL2NodW5rLUVWRkVJWE1CLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL3NvbmFyanMudHNcbnZhciBzb25hcmpzID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazpzb25hcmpzXCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgc29uYXJqczogc29uYXJqc1BsdWdpblxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLnNvbmFyanNQbHVnaW4uY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwic29uYXJqcy9uby1kdXBsaWNhdGUtc3RyaW5nXCI6IFwib2ZmXCIsXG4gICAgICBcInNvbmFyanMvbm8tbmVzdGVkLWZ1bmN0aW9uc1wiOiBcIm9mZlwiLFxuICAgICAgXCJzb25hcmpzL3BzZXVkby1yYW5kb21cIjogXCJvZmZcIlxuICAgIH1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgc29uYXJqc1xufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstR0RYTzRWNlQuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLUdEWE80VjZULmpzXCI7aW1wb3J0IHtcbiAgR0xPQl9URVNUXG59IGZyb20gXCIuL2NodW5rLUtMVDdTQ1NGLmpzXCI7XG5pbXBvcnQge1xuICBkZWZhdWx0MTMgYXMgZGVmYXVsdDJcbn0gZnJvbSBcIi4vY2h1bmstRVZGRUlYTUIuanNcIjtcblxuLy8gc3JjL2NvbmZpZ3MvdGVzdGluZy1saWJyYXJ5LnRzXG52YXIgdGVzdGluZ0xpYnJhcnkgPSBbXG4gIHtcbiAgICBuYW1lOiBcImZpbnRyYWNrOnRlc3RpbmctbGlicmFyeVwiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwidGVzdGluZy1saWJyYXJ5XCI6IGRlZmF1bHQyXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlncy5yZWFjdC5ydWxlc1xuICAgIH0sXG4gICAgZmlsZXM6IFtHTE9CX1RFU1RdXG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIHRlc3RpbmdMaWJyYXJ5XG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1NWTNSREJXUS5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstTVkzUkRCV1EuanNcIjtpbXBvcnQge1xuICB0dXJib1BsdWdpblxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy90dXJiby50c1xudmFyIHR1cmJvID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazp0dXJib1wiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIHR1cmJvOiB0dXJib1BsdWdpblxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIC4uLnR1cmJvUGx1Z2luLmNvbmZpZ3MucmVjb21tZW5kZWQucnVsZXNcbiAgICB9XG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIHR1cmJvXG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay00Nk82M0NWMy5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstNDZPNjNDVjMuanNcIjtpbXBvcnQge1xuICBkZWZhdWx0NyBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9jb21tZW50cy50c1xudmFyIGNvbW1lbnRzID0gW1xuICB7XG4gICAgbmFtZTogXCJncmF2aW5hd2lsbDpjb21tZW50c1wiLFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwiZXNsaW50LWNvbW1lbnRzXCI6IGRlZmF1bHQyXG4gICAgfSxcbiAgICBydWxlczoge1xuICAgICAgLi4uZGVmYXVsdDIuY29uZmlncy5yZWNvbW1lbmRlZC5ydWxlcyxcbiAgICAgIFwiZXNsaW50LWNvbW1lbnRzL3JlcXVpcmUtZGVzY3JpcHRpb25cIjogXCJlcnJvclwiXG4gICAgfVxuICB9XG5dO1xuXG5leHBvcnQge1xuICBjb21tZW50c1xufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstUU9KM0tHVVkuanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVFPSjNLR1VZLmpzXCI7aW1wb3J0IHtcbiAgR0xPQl9FWENMVURFXG59IGZyb20gXCIuL2NodW5rLUtMVDdTQ1NGLmpzXCI7XG5cbi8vIHNyYy9jb25maWdzL2lnbm9yZXMudHNcbnZhciBpZ25vcmVzID0gW1xuICB7XG4gICAgaWdub3JlczogR0xPQl9FWENMVURFXG4gIH1cbl07XG5cbmV4cG9ydCB7XG4gIGlnbm9yZXNcbn07XG4iLCAiY29uc3QgX19pbmplY3RlZF9maWxlbmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2NodW5rLVNZWkVENE5YLmpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3RcIjtjb25zdCBfX2luamVjdGVkX2ltcG9ydF9tZXRhX3VybF9fID0gXCJmaWxlOi8vL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1TWVpFRDROWC5qc1wiO2ltcG9ydCB7XG4gIGRlZmF1bHQxMiBhcyBkZWZhdWx0MlxufSBmcm9tIFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvY29uZmlncy9pbXBvcnQtc29ydC50c1xudmFyIGltcG9ydFNvcnQgPSBbXG4gIHtcbiAgICBuYW1lOiBcImZpbnRyYWNrOmltcG9ydC1zb3J0XCIsXG4gICAgcGx1Z2luczoge1xuICAgICAgXCJzaW1wbGUtaW1wb3J0LXNvcnRcIjogZGVmYXVsdDJcbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICBcImltcG9ydC9maXJzdFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uZXdsaW5lLWFmdGVyLWltcG9ydFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1kdXBsaWNhdGVzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwic2ltcGxlLWltcG9ydC1zb3J0L2ltcG9ydHNcIjogW1xuICAgICAgICBcImVycm9yXCIsXG4gICAgICAgIHtcbiAgICAgICAgICBncm91cHM6IFtcbiAgICAgICAgICAgIC8vIFR5cGUgaW1wb3J0c1xuICAgICAgICAgICAgW1xuICAgICAgICAgICAgICBcIl4uKlxcXFx1MDAwMCRcIixcbiAgICAgICAgICAgICAgXCJebm9kZTouKlxcXFx1MDAwMCRcIixcbiAgICAgICAgICAgICAgXCJeQD9cXFxcdy4qXFxcXHUwMDAwJFwiLFxuICAgICAgICAgICAgICBcIl5cXFxcLlxcXFwuLipcXFxcdTAwMDAkXCIsXG4gICAgICAgICAgICAgIFwiXlxcXFwuLipcXFxcdTAwMDAkXCJcbiAgICAgICAgICAgIF0sXG4gICAgICAgICAgICAvLyBTaWRlIGVmZmVjdCBpbXBvcnRzIChlLmcuLCBgaW1wb3J0ICdzb21lLW1vZHVsZSdgKVxuICAgICAgICAgICAgW1wiXlxcXFx1MDAwMFwiXSxcbiAgICAgICAgICAgIC8vIE5vZGUuanMgYnVpbHRpbnMgcHJlZml4ZWQgd2l0aCBgbm9kZTpgXG4gICAgICAgICAgICBbXCJebm9kZTpcIl0sXG4gICAgICAgICAgICAvLyBUaGluZ3MgdGhhdCBzdGFydCB3aXRoIGEgbGV0dGVyIChvciBkaWdpdCBvciB1bmRlcnNjb3JlKSwgb3IgYEBgIGZvbGxvd2VkIGJ5IGEgbGV0dGVyXG4gICAgICAgICAgICBbXCJeQD9cXFxcd1wiXSxcbiAgICAgICAgICAgIC8vIEFic29sdXRlIGltcG9ydHMgKGUuZy4sIGBpbXBvcnQgc29tZXRoaW5nIGZyb20gJ3NyYy91dGlscydgKVxuICAgICAgICAgICAgW1wiXlteLl1cIl0sXG4gICAgICAgICAgICAvLyBQYXJlbnQgZGlyZWN0b3J5IHJlbGF0aXZlIGltcG9ydHMgKGUuZy4sIGBpbXBvcnQgc29tZXRoaW5nIGZyb20gJy4uL3V0aWxzJ2ApXG4gICAgICAgICAgICBbXCJeXFxcXC5cXFxcLlwiXSxcbiAgICAgICAgICAgIC8vIEN1cnJlbnQgZGlyZWN0b3J5IHJlbGF0aXZlIGltcG9ydHMgKGUuZy4sIGBpbXBvcnQgc29tZXRoaW5nIGZyb20gJy4vdXRpbHMnYClcbiAgICAgICAgICAgIFtcIl5cXFxcLlwiXVxuICAgICAgICAgIF1cbiAgICAgICAgfVxuICAgICAgXSxcbiAgICAgIFwic2ltcGxlLWltcG9ydC1zb3J0L2V4cG9ydHNcIjogXCJlcnJvclwiXG4gICAgfVxuICB9XG5dO1xuXG5leHBvcnQge1xuICBpbXBvcnRTb3J0XG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1BRFEzQjVVQy5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstQURRM0I1VUMuanNcIjtpbXBvcnQge1xuICBpbXBvcnRQbHVnaW5cbn0gZnJvbSBcIi4vY2h1bmstRVZGRUlYTUIuanNcIjtcblxuLy8gc3JjL2NvbmZpZ3MvaW1wb3J0cy50c1xudmFyIGltcG9ydHMgPSBbXG4gIHtcbiAgICBuYW1lOiBcImZpbnRyYWNrOmltcG9ydHNcIixcbiAgICBwbHVnaW5zOiB7XG4gICAgICBpbXBvcnQ6IGltcG9ydFBsdWdpblxuICAgIH0sXG4gICAgcnVsZXM6IHtcbiAgICAgIFwiaW1wb3J0L25vLWFtZFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1jb21tb25qc1wiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9maXJzdFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1kdXBsaWNhdGVzXCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLW11dGFibGUtZXhwb3J0c1wiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uby1uYW1lZC1kZWZhdWx0XCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLXNlbGYtaW1wb3J0XCI6IFwiZXJyb3JcIixcbiAgICAgIFwiaW1wb3J0L25vLXdlYnBhY2stbG9hZGVyLXN5bnRheFwiOiBcImVycm9yXCIsXG4gICAgICBcImltcG9ydC9uZXdsaW5lLWFmdGVyLWltcG9ydFwiOiBbXCJlcnJvclwiLCB7IGNvdW50OiAxIH1dXG4gICAgfVxuICB9XG5dO1xuXG5leHBvcnQge1xuICBpbXBvcnRzXG59O1xuIiwgImNvbnN0IF9faW5qZWN0ZWRfZmlsZW5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdC9jaHVuay1OWlVOV0NURi5qc1wiO2NvbnN0IF9faW5qZWN0ZWRfZGlybmFtZV9fID0gXCIvVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0XCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvY2h1bmstTlpVTldDVEYuanNcIjtpbXBvcnQge1xuICBkZWZhdWx0IGFzIGRlZmF1bHQyLFxuICBkZWZhdWx0MTUgYXMgZGVmYXVsdDNcbn0gZnJvbSBcIi4vY2h1bmstRVZGRUlYTUIuanNcIjtcblxuLy8gc3JjL2NvbmZpZ3MvamF2YXNjcmlwdC50c1xuaW1wb3J0IGdsb2JhbHMgZnJvbSBcImdsb2JhbHNcIjtcbnZhciBqYXZhc2NyaXB0ID0gW1xuICB7XG4gICAgbmFtZTogXCJmaW50cmFjazpqYXZhc2NyaXB0XCIsXG4gICAgbGFuZ3VhZ2VPcHRpb25zOiB7XG4gICAgICBlY21hVmVyc2lvbjogMjAyMixcbiAgICAgIGdsb2JhbHM6IHtcbiAgICAgICAgLi4uZ2xvYmFscy5icm93c2VyLFxuICAgICAgICAuLi5nbG9iYWxzLm5vZGUsXG4gICAgICAgIC4uLmdsb2JhbHMuZXMyMDIyLFxuICAgICAgICBkb2N1bWVudDogXCJyZWFkb25seVwiLFxuICAgICAgICBuYXZpZ2F0b3I6IFwicmVhZG9ubHlcIixcbiAgICAgICAgd2luZG93OiBcInJlYWRvbmx5XCJcbiAgICAgIH0sXG4gICAgICBwYXJzZXJPcHRpb25zOiB7XG4gICAgICAgIGVjbWFGZWF0dXJlczoge1xuICAgICAgICAgIGpzeDogdHJ1ZVxuICAgICAgICB9LFxuICAgICAgICBlY21hVmVyc2lvbjogMjAyMixcbiAgICAgICAgc291cmNlVHlwZTogXCJtb2R1bGVcIlxuICAgICAgfVxuICAgIH0sXG4gICAgbGludGVyT3B0aW9uczoge1xuICAgICAgcmVwb3J0VW51c2VkRGlzYWJsZURpcmVjdGl2ZXM6IHRydWVcbiAgICB9LFxuICAgIHBsdWdpbnM6IHtcbiAgICAgIFwidW51c2VkLWltcG9ydHNcIjogZGVmYXVsdDNcbiAgICB9LFxuICAgIHJ1bGVzOiB7XG4gICAgICAuLi5kZWZhdWx0Mi5jb25maWdzLnJlY29tbWVuZGVkLnJ1bGVzLFxuICAgICAgXCJ1bnVzZWQtaW1wb3J0cy9uby11bnVzZWQtaW1wb3J0c1wiOiBcImVycm9yXCIsXG4gICAgICBcInVudXNlZC1pbXBvcnRzL25vLXVudXNlZC12YXJzXCI6IFtcbiAgICAgICAgXCJlcnJvclwiLFxuICAgICAgICB7XG4gICAgICAgICAgdmFyczogXCJhbGxcIixcbiAgICAgICAgICB2YXJzSWdub3JlUGF0dGVybjogXCJeX1wiLFxuICAgICAgICAgIGFyZ3M6IFwiYWZ0ZXItdXNlZFwiLFxuICAgICAgICAgIGFyZ3NJZ25vcmVQYXR0ZXJuOiBcIl5fXCJcbiAgICAgICAgfVxuICAgICAgXVxuICAgIH1cbiAgfVxuXTtcblxuZXhwb3J0IHtcbiAgamF2YXNjcmlwdFxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2Rpc3QvaW5kZXguanNcIjtjb25zdCBfX2luamVjdGVkX2Rpcm5hbWVfXyA9IFwiL1VzZXJzL3dpbGwvZGV2L2ZpbnRyYWNrL3BhY2thZ2VzL2VzbGludC1jb25maWcvZGlzdFwiO2NvbnN0IF9faW5qZWN0ZWRfaW1wb3J0X21ldGFfdXJsX18gPSBcImZpbGU6Ly8vVXNlcnMvd2lsbC9kZXYvZmludHJhY2svcGFja2FnZXMvZXNsaW50LWNvbmZpZy9kaXN0L2luZGV4LmpzXCI7aW1wb3J0IHtcbiAgdHlwZXNjcmlwdFxufSBmcm9tIFwiLi9jaHVuay1RNkhVVTdCMy5qc1wiO1xuaW1wb3J0IHtcbiAgdW5pY29yblxufSBmcm9tIFwiLi9jaHVuay1PMk5BTlBENi5qc1wiO1xuaW1wb3J0IHtcbiAgbmV4dFxufSBmcm9tIFwiLi9jaHVuay1VT0RSWVNFUS5qc1wiO1xuaW1wb3J0IHtcbiAgcGxheXdyaWdodFxufSBmcm9tIFwiLi9jaHVuay1SRUgzN05QVS5qc1wiO1xuaW1wb3J0IHtcbiAgcHJldHRpZXJcbn0gZnJvbSBcIi4vY2h1bmstUFJGV0o1UlouanNcIjtcbmltcG9ydCB7XG4gIHJlYWN0XG59IGZyb20gXCIuL2NodW5rLVRVRVpIU05MLmpzXCI7XG5pbXBvcnQge1xuICBzb25hcmpzXG59IGZyb20gXCIuL2NodW5rLVZOVVZVUUlULmpzXCI7XG5pbXBvcnQge1xuICB0ZXN0aW5nTGlicmFyeVxufSBmcm9tIFwiLi9jaHVuay1HRFhPNFY2VC5qc1wiO1xuaW1wb3J0IHtcbiAgdHVyYm9cbn0gZnJvbSBcIi4vY2h1bmstTVkzUkRCV1EuanNcIjtcbmltcG9ydCB7XG4gIGNvbW1lbnRzXG59IGZyb20gXCIuL2NodW5rLTQ2TzYzQ1YzLmpzXCI7XG5pbXBvcnQge1xuICBpZ25vcmVzXG59IGZyb20gXCIuL2NodW5rLVFPSjNLR1VZLmpzXCI7XG5pbXBvcnQge1xuICBHTE9CX0UyRSxcbiAgR0xPQl9FWENMVURFLFxuICBHTE9CX0pTLFxuICBHTE9CX0pTWCxcbiAgR0xPQl9URVNULFxuICBHTE9CX1RTLFxuICBHTE9CX1RTWFxufSBmcm9tIFwiLi9jaHVuay1LTFQ3U0NTRi5qc1wiO1xuaW1wb3J0IHtcbiAgaW1wb3J0U29ydFxufSBmcm9tIFwiLi9jaHVuay1TWVpFRDROWC5qc1wiO1xuaW1wb3J0IHtcbiAgaW1wb3J0c1xufSBmcm9tIFwiLi9jaHVuay1BRFEzQjVVQy5qc1wiO1xuaW1wb3J0IHtcbiAgamF2YXNjcmlwdFxufSBmcm9tIFwiLi9jaHVuay1OWlVOV0NURi5qc1wiO1xuaW1wb3J0IFwiLi9jaHVuay1FVkZFSVhNQi5qc1wiO1xuXG4vLyBzcmMvaW5kZXgudHNcbmltcG9ydCB7IGlzUGFja2FnZUV4aXN0cyB9IGZyb20gXCJsb2NhbC1wa2dcIjtcbnZhciBoYXNUeXBlU2NyaXB0ID0gaXNQYWNrYWdlRXhpc3RzKFwidHlwZXNjcmlwdFwiKTtcbnZhciBmaW50cmFjayA9IGFzeW5jIChvcHRpb25zID0ge30sIC4uLnVzZXJDb25maWdzKSA9PiB7XG4gIGNvbnN0IHtcbiAgICB0eXBlc2NyaXB0OiBlbmFibGVUeXBlU2NyaXB0ID0gaGFzVHlwZVNjcmlwdCxcbiAgICByZWFjdDogZW5hYmxlUmVhY3QgPSBmYWxzZSxcbiAgICB0dXJibzogZW5hYmxlVHVyYm8gPSBmYWxzZSxcbiAgICBuZXh0OiBlbmFibGVOZXh0ID0gZmFsc2UsXG4gICAgcGxheXdyaWdodDogZW5hYmxlUGxheXdyaWdodCA9IGZhbHNlLFxuICAgIHRlc3RpbmdMaWJyYXJ5OiBlbmFibGVUZXN0aW5nTGlicmFyeSA9IGZhbHNlLFxuICAgIGdpdGlnbm9yZTogZW5hYmxlR2l0aWdub3JlID0gdHJ1ZVxuICB9ID0gb3B0aW9ucztcbiAgY29uc3QgY29uZmlncyA9IFtdO1xuICBpZiAoZW5hYmxlR2l0aWdub3JlKSB7XG4gICAgY29uZmlncy5wdXNoKChhd2FpdCBpbXBvcnQoXCJlc2xpbnQtY29uZmlnLWZsYXQtZ2l0aWdub3JlXCIpKS5kZWZhdWx0KCkpO1xuICB9XG4gIGNvbmZpZ3MucHVzaChcbiAgICAuLi5pZ25vcmVzLFxuICAgIC4uLmphdmFzY3JpcHQsXG4gICAgLi4udW5pY29ybixcbiAgICAuLi5jb21tZW50cyxcbiAgICAuLi5pbXBvcnRTb3J0LFxuICAgIC4uLnNvbmFyanMsXG4gICAgLi4uaW1wb3J0cyxcbiAgICAuLi5wcmV0dGllclxuICApO1xuICBpZiAoZW5hYmxlVHlwZVNjcmlwdCkge1xuICAgIGNvbmZpZ3MucHVzaCguLi50eXBlc2NyaXB0KG9wdGlvbnMpKTtcbiAgfVxuICBpZiAoZW5hYmxlUmVhY3QpIHtcbiAgICBjb25maWdzLnB1c2goLi4ucmVhY3Qob3B0aW9ucykpO1xuICB9XG4gIGlmIChlbmFibGVUdXJibykge1xuICAgIGNvbmZpZ3MucHVzaCguLi50dXJibyk7XG4gIH1cbiAgaWYgKGVuYWJsZU5leHQpIHtcbiAgICBjb25maWdzLnB1c2goLi4ubmV4dCk7XG4gIH1cbiAgaWYgKGVuYWJsZVBsYXl3cmlnaHQpIHtcbiAgICBjb25maWdzLnB1c2goLi4ucGxheXdyaWdodCk7XG4gIH1cbiAgaWYgKGVuYWJsZVRlc3RpbmdMaWJyYXJ5KSB7XG4gICAgY29uZmlncy5wdXNoKC4uLnRlc3RpbmdMaWJyYXJ5KTtcbiAgfVxuICBjb25maWdzLnB1c2goLi4udXNlckNvbmZpZ3MpO1xuICByZXR1cm4gY29uZmlncztcbn07XG52YXIgaW5kZXhfZGVmYXVsdCA9IGZpbnRyYWNrO1xuZXhwb3J0IHtcbiAgR0xPQl9FMkUsXG4gIEdMT0JfRVhDTFVERSxcbiAgR0xPQl9KUyxcbiAgR0xPQl9KU1gsXG4gIEdMT0JfVEVTVCxcbiAgR0xPQl9UUyxcbiAgR0xPQl9UU1gsXG4gIGluZGV4X2RlZmF1bHQgYXMgZGVmYXVsdFxufTtcbiIsICJjb25zdCBfX2luamVjdGVkX2ZpbGVuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2VzbGludC5jb25maWcubWpzXCI7Y29uc3QgX19pbmplY3RlZF9kaXJuYW1lX18gPSBcIi9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnXCI7Y29uc3QgX19pbmplY3RlZF9pbXBvcnRfbWV0YV91cmxfXyA9IFwiZmlsZTovLy9Vc2Vycy93aWxsL2Rldi9maW50cmFjay9wYWNrYWdlcy9lc2xpbnQtY29uZmlnL2VzbGludC5jb25maWcubWpzXCI7aW1wb3J0IGZpbnRyYWNrIGZyb20gJy4vZGlzdC9pbmRleC5qcydcblxuZXhwb3J0IGRlZmF1bHQgZmludHJhY2soe1xuICBwcm9qZWN0OiAnLi90c2NvbmZpZy5qc29uJyxcbiAgdHNjb25maWdSb290RGlyOiBpbXBvcnQubWV0YS5kaXJuYW1lLFxuICByZWFjdDogdHJ1ZSxcbiAgbmV4dDogdHJ1ZSxcbiAgcGxheXdyaWdodDogdHJ1ZSxcbiAgdGVzdGluZ0xpYnJhcnk6IHRydWUsXG4gIHR1cmJvOiB0cnVlLFxuICB0eXBlc2NyaXB0OiB0cnVlXG59KVxuIl0sCiAgIm1hcHBpbmdzIjogIjtBQUNBLElBQUksZUFBZTtBQUNuQixJQUFJLFVBQVU7QUFDZCxJQUFJLFdBQVc7QUFDZixJQUFJLFVBQVU7QUFDZCxJQUFJLFdBQVc7QUFDZixJQUFJLFdBQVcsMkJBQTJCLFlBQVk7QUFDdEQsSUFBSSxZQUFZ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
