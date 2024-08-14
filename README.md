# globflow

`globflow` is a tool for scanning files in a directory with glob patterns and processing the results.

## Installation

You can install `globflow` using `bun` or `npm`.

### Using bun

```bash
bun install globflow
```

### Using npm

```bash
npm install globflow
```

## Usage

`globflow` provides a command-line interface (CLI) to scan files using glob patterns.

### Basic Usage

To scan files using a glob pattern:

```bash
$ npx globflow "./*.json" 
./tsconfig.json
./package.json
```

### Using with `bun`

You can also use `globflow` directly with `bun`:

```bash
$ bunx globflow "./*.ts"
./cli.ts
./index.ts
```

### Additional Options

- `--md`: Read contents and combine into code-prompt style markdown.
- `-m, --message`: Suffix message of output markdown. You can put a prompt message here for LLM.

### Examples

Scan all `.ts` files:

```bash
bun cli.ts "./*.ts"
```

Scan all `.json` files:

```bash
bunx globflow "./*.json"
```

## Development

### Building the Project

To build the project, run:

```bash
bun run build
```

### Running Tests

To run tests, execute:

```bash
bun run test
```

## License

This project is licensed under the MIT License. See the [LICENSE](LICENSE) file for more details.

## Contributing

If you find any issues or have suggestions, feel free to open an issue or create a pull request on the [GitHub repository](https://github.com/snomiao/glob-flow).

## Maintainers

- [snomiao](https://github.com/snomiao)
