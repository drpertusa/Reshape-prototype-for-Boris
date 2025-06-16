#!/usr/bin/env python3
from fontTools.ttLib import TTFont

font = TTFont('./app/fonts/lf-serif-var.woff2')
name_table = font['name']

print("Font Metadata for lf-serif-var.woff2:")
print("=" * 40)

# Common name IDs
name_ids = {
    1: "Font Family name",
    2: "Font Subfamily name", 
    3: "Unique font identifier",
    4: "Full font name",
    5: "Version string",
    6: "PostScript name",
    8: "Manufacturer",
    9: "Designer",
    11: "Vendor URL",
    12: "Designer URL",
    13: "License Description",
    14: "License Info URL",
    16: "Typographic Family name",
    17: "Typographic Subfamily name",
    256: "Wordmark axis name",
    267: "Weight axis name",
    268: "Optical Size axis name"
}

for record in name_table.names:
    if record.nameID in name_ids:
        try:
            value = record.toUnicode()
            if value and value.strip():  # Only show non-empty values
                print(f"{name_ids[record.nameID]} (ID {record.nameID}): {value}")
        except:
            pass

# Check if it's a variable font
if 'fvar' in font:
    print("\nVariable Font Axes:")
    print("-" * 20)
    fvar = font['fvar']
    for axis in fvar.axes:
        print(f"{axis.axisTag}: min={axis.minValue}, default={axis.defaultValue}, max={axis.maxValue}")

font.close()