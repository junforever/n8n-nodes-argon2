# n8n-nodes-argon2

A [n8n](https://n8n.io) community node for Argon2 hashing and verification.  
Easily hash and verify strings using the Argon2id algorithm in your workflows.

---

## Features

- **Encrypt:** Hash a plain text string using Argon2id.
- **Verify:** Check if a plain text string matches a given Argon2 hash.

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

Add the **Argon2** node to your workflow and select the desired operation:

- **Encrypt:**  
  Provide the `Text` to hash. The output will be sent by the **true** output and will contain the Argon2 hash:

  ```json
  { "hash": "$argon2id$..." }
  ```

- **Verify:**  
  Provide the `Text` and the `Hash` to check. The node will route the result:
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
- Output (true output):
  ```json
  { "hash": "$argon2id$v=19$m=4096,t=3,p=1$..." }
  ```

**Verify**

- Input: `mySecretPassword`, `$argon2id$v=19$m=4096,t=3,p=1$...`
- Output (true output):
  ```json
  { "match": true }
  ```
- Input: `wrongPassword`, `$argon2id$v=19$m=4096,t=3,p=1$...`
- Output (false output):
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
