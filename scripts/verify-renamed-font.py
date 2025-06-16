#!/usr/bin/env python3
from fontTools.ttLib import TTFont

font = TTFont('./app/fonts/lava-chicken-serif-var.woff2')
name_table = font['name']

print("Font Metadata for lava-chicken-serif-var.woff2:")
print("=" * 50)

# Check all name records
for record in name_table.names:
    try:
        value = record.toUnicode()
        if value and value.strip():
            print(f"ID {record.nameID}: {value}")
    except:
        pass

font.close()