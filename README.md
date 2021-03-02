# ISUCT-data-protection

Training project in the "Data Protection" discipline 

## Usage

```
yarn <method> <encoder> [-f] <source> [-f] <key>

// e.g.:
yarn both lab1 "encode this message" "82354671"
```

method: `encode` | `decode` | `both` - what you want to do with source<br>
encoder: `lab1` - encoder (more info in Encoders section)<br>
source: source to encode/decode, string or path to file (if `-f` passed)<br>
key: encryption key, string or path to file (if `-f` passed)

## Encoders

`lab1` - First work, permutation encryption 