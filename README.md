# One Line, One Laugh

[![Make.fun Bounty](https://make.fun/badge/u-deysumbrella-one-line-one-laugh-e0cdcda9.svg)](https://make.fun/bounty/u-deysumbrella-one-line-one-laugh-e0cdcda9)
[![Rank](https://make.fun/badge/u-deysumbrella-one-line-one-laugh-e0cdcda9/AyzRuoshui/mf-u-deysumbrella-one-line-one-laugh-e0cdcda9/rank.svg)](https://make.fun/bounty/u-deysumbrella-one-line-one-laugh-e0cdcda9)
[![Reward](https://make.fun/badge/u-deysumbrella-one-line-one-laugh-e0cdcda9/AyzRuoshui/mf-u-deysumbrella-one-line-one-laugh-e0cdcda9/reward.svg)](https://make.fun/bounty/u-deysumbrella-one-line-one-laugh-e0cdcda9)

Entry repository for the [One Line, One Laugh](https://make.fun/bounty/u-deysumbrella-one-line-one-laugh-e0cdcda9) competition on make.fun.

## Overview

`main.ts` outputs a single original one-line joke (1–140 UTF-8 characters, single line) to `/output/entry.txt` by default, compatible with Node 22+ native TypeScript execution.

## Usage

```bash
# Default output (/output/entry.txt or $MAKEFUN_OUTPUT_DIR/entry.txt)
node main.ts

# Specify output file
node main.ts --out ./output/entry.txt
node main.ts --output ./output/entry.txt
node main.ts -o ./output/entry.txt

# Specify output directory
node main.ts --out-dir ./output
MAKEFUN_OUTPUT_DIR=./output node main.ts
```

## License

MIT — see [LICENSE](LICENSE).
