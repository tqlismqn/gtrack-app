# Docs Sync Attempt

- Attempted to run `gh workflow run -R "tqlismqn/gtrack-docs" docs-auto-sync.yml --ref main` but the GitHub CLI (`gh`) is not available in this environment.
- Attempted to install or access `gh`, but the command `gh --version` returned `command not found`.
- No sync was triggered as a result.

Future runs should ensure `gh` is installed or use an alternative method to trigger the workflow and list pull requests.
