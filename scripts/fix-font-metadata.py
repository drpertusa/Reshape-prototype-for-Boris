#!/usr/bin/env python3
from fontTools.ttLib import TTFont

# Load the font
input_path = './app/fonts/lava-chicken-serif-var.woff2'
output_path = './app/fonts/lava-chicken-serif-var.woff2'  # Overwrite

font = TTFont(input_path)
name_table = font['name']

print("Fixing remaining metadata issues...")

# Update Adobe references
updates = {
    8: 'Reshape Clinic',        # Manufacturer
    9: 'Reshape Design Team',   # Designer  
    11: 'reshape.clinic',       # Vendor URL
    12: 'reshape.clinic',       # Designer URL
}

# Update the records
for nameID, new_value in updates.items():
    updated = False
    for record in name_table.names:
        if record.nameID == nameID:
            old_value = record.toUnicode()
            record.string = new_value
            print(f"ID {nameID}: '{old_value}' → '{new_value}'")
            updated = True
    
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

print("\nFont metadata fixed!")