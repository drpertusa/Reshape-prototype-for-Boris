#!/usr/bin/env python3
from fontTools.ttLib import TTFont

# Load the font
input_path = './app/fonts/lf-serif-var.woff2'
output_path = './app/fonts/lava-chicken-serif-var.woff2'

font = TTFont(input_path)
name_table = font['name']

print("Force renaming font to LavaChicken...")

# Define the new names
new_names = {
    1: 'LavaChicken Serif',           # Font Family name
    2: 'Variable',                     # Font Subfamily name
    3: 'LavaChicken Serif Variable',  # Unique font identifier
    4: 'LavaChicken Serif Variable',  # Full font name
    6: 'LavaChickenSerif-Variable',   # PostScript name
    16: 'LavaChicken Serif',          # Typographic Family name
    17: 'Variable'                     # Typographic Subfamily name
}

# Force update the name records
for nameID, new_value in new_names.items():
    # Find existing record or create new one
    updated = False
    for record in name_table.names:
        if record.nameID == nameID and record.platformID == 3 and record.platEncID == 1:
            record.string = new_value
            updated = True
            print(f"Updated ID {nameID}: {new_value}")
            break
    
    # If record doesn't exist, add it
    if not updated:
        from fontTools.ttLib.tables._n_a_m_e import NameRecord
        rec = NameRecord()
        rec.nameID = nameID
        rec.platformID = 3
        rec.platEncID = 1
        rec.langID = 0x409
        rec.string = new_value
        name_table.names.append(rec)
        print(f"Added ID {nameID}: {new_value}")

# Save the modified font
font.save(output_path)
font.close()

print(f"\nFont saved to: {output_path}")