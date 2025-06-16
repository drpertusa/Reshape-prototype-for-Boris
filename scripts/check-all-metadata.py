#!/usr/bin/env python3
from fontTools.ttLib import TTFont

font = TTFont('./app/fonts/lava-chicken-serif-var.woff2')
name_table = font['name']

print("Complete Font Metadata Check:")
print("=" * 50)

# All possible name IDs and their meanings
all_name_ids = {
    0: "Copyright notice",
    1: "Font Family name",
    2: "Font Subfamily name", 
    3: "Unique font identifier",
    4: "Full font name",
    5: "Version string",
    6: "PostScript name",
    7: "Trademark",
    8: "Manufacturer",
    9: "Designer",
    10: "Description",
    11: "Vendor URL",
    12: "Designer URL",
    13: "License Description",
    14: "License Info URL",
    15: "Reserved",
    16: "Typographic Family name",
    17: "Typographic Subfamily name",
    18: "Compatible Full name",
    19: "Sample text",
    20: "PostScript CID name",
    21: "WWS Family name",
    22: "WWS Subfamily name",
    23: "Light Background Palette",
    24: "Dark Background Palette",
    25: "Variations PostScript Name Prefix",
}

# Check all records
found_records = {}
for record in name_table.names:
    try:
        value = record.toUnicode()
        if record.nameID not in found_records:
            found_records[record.nameID] = []
        found_records[record.nameID].append({
            'platform': record.platformID,
            'encoding': record.platEncID,
            'language': record.langID,
            'value': value
        })
    except:
        pass

# Display all found records
for nameID in sorted(found_records.keys()):
    name = all_name_ids.get(nameID, f"Unknown ({nameID})")
    print(f"\n{name} (ID {nameID}):")
    for rec in found_records[nameID]:
        if rec['value']:
            print(f"  {rec['value']}")

# Check for specific issues
print("\n" + "=" * 50)
print("POTENTIAL ISSUES:")
print("-" * 20)

# Check if PostScript name has spaces
ps_name = None
for rec in found_records.get(6, []):
    if rec['value']:
        ps_name = rec['value']
        if ' ' in ps_name:
            print("⚠️  PostScript name contains spaces (should be hyphenated)")
        break

# Check for manufacturer/designer references to Adobe
for nameID in [8, 9, 11, 12]:
    for rec in found_records.get(nameID, []):
        if rec['value'] and 'adobe' in rec['value'].lower():
            name = all_name_ids.get(nameID)
            print(f"⚠️  {name} still references Adobe: '{rec['value']}'")

# Check for any remaining "love" references
for nameID, records in found_records.items():
    for rec in records:
        if rec['value'] and 'love' in rec['value'].lower():
            name = all_name_ids.get(nameID, f"ID {nameID}")
            print(f"⚠️  {name} contains 'love': '{rec['value']}'")

font.close()