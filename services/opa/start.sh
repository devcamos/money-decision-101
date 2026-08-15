#!/bin/sh
set -eu

exec /usr/local/bin/opa run \
  --server \
  --addr="0.0.0.0:${PORT:-80}" \
  --log-format=json \
  /policy/money/v1/money_decision.rego \
  /policy/money/v1/evidence.json
