"""
unlock_next_day.py
Finds the first "coming-soon" day whose HTML file exists and flips it to "available".
Writes UNLOCKED_DAY=N to /tmp/unlock_result.txt for the CI step to read.
"""
import os
import re
import sys

CURRICULUM = 'js/curriculum.js'
RESULT_FILE = '/tmp/unlock_result.txt'

with open(CURRICULUM, 'r') as f:
    lines = f.readlines()

unlocked_day = None

for i, line in enumerate(lines):
    if 'status: "coming-soon"' in line:
        m = re.search(r'pages/day(\d+)\.html', line)
        if not m:
            continue
        day_num = m.group(1)
        html_path = f'pages/day{day_num}.html'
        if os.path.exists(html_path):
            lines[i] = line.replace('"coming-soon"', '"available"', 1)
            unlocked_day = day_num
            break
        else:
            print(f'ERROR: {html_path} not found — content not committed yet.')
            sys.exit(1)

if unlocked_day:
    with open(CURRICULUM, 'w') as f:
        f.writelines(lines)
    result = f'UNLOCKED_DAY={unlocked_day}'
    print(result)
    with open(RESULT_FILE, 'w') as f:
        f.write(result + '\n')
else:
    print('All days are already unlocked — nothing to do.')
    with open(RESULT_FILE, 'w') as f:
        f.write('UNLOCKED_DAY=none\n')
