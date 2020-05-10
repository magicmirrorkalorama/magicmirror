find . -type f -name 'package.json' -not -path './.git/*' -not -path '*/node_modules/*' -depth 2 -execdir npm install \;
