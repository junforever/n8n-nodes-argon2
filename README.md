# n8n-nodes-argon2

A [n8n](https://n8n.io) community node package for Argon2 hashing and verification.

Now includes **two separate nodes** for better workflow clarity:
- **Argon2 Encrypt**: Hash (encrypt) a string using Argon2id.
- **Argon2 Verify**: Verify a string against an Argon2 hash, with two outputs: **true** and **false**.

---

## Features

- **Argon2 Encrypt Node**
  - Input: Plain text (`Text`)
  - Output: `{ "hash": "..." }` (single output)

- **Argon2 Verify Node**
  - Inputs: `Text` and `Hash`
  - Output branches:
    - **true**: If the verification is successful (`{ "match": true }`)
    - **false**: If the verification fails or errors (`{ "match": false }` or `{ "match": false, "error": "..." }`)

---

## Installation

### Using n8n Community Nodes (Recommended)

1. Go to **Settings → Community Nodes** in your n8n instance.
2. Click **Install** and search for `n8n-nodes-argon2`.
3. Install and restart n8n if required.

### Manual (Development)

```bash
npm install n8n-nodes-argon2
```

---

## Usage

### Argon2 Encrypt
- Add the **Argon2 Encrypt** node to your workflow.
- Provide the `Text` to hash.
- The output will be:
  ```json
  { "hash": "$argon2id$..." }
  ```

### Argon2 Verify
- Add the **Argon2 Verify** node to your workflow.
- Provide the `Text` and the `Hash` to check.
- The node will route the result:
  - If the verification is **successful**, the output will be sent by the **true** output:
    ```json
    { "match": true }
    ```
  - If the verification **fails** or there is an error, the output will be sent by the **false** output:
    ```json
    { "match": false }
    { "match": false, "error": "<error message>" }
    ```

---

## Example

**Encrypt**

- Input: `mySecretPassword`
- Output:
  ```json
  { "hash": "$argon2id$v=19$m=4096,t=3,p=1$..." }
  ```

**Verify**

- Input: `mySecretPassword`, `$argon2id$v=19$m=4096,t=3,p=1$...`
- Output (**true** branch):
  ```json
  { "match": true }
  ```
- Input: `wrongPassword`, `$argon2id$v=19$m=4096,t=3,p=1$...`
- Output (**false** branch):
  ```json
  { "match": false }
  ```

---

## Development

1. Clone this repo.
2. Run `npm install`.
3. Run `npm run build` to compile TypeScript.
4. Publish to npm with `npm publish --access public`.

---

## Contributing

Contributions, issues and feature requests are welcome!
Feel free to open an issue or submit a pull request.

---

## License

MIT
