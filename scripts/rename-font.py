#!/usr/bin/env python3
from fontTools.ttLib import TTFont
import os

# Load the font
input_path = './app/fonts/lf-serif-var.woff2'
output_path = './app/fonts/lava-chicken-serif-var.woff2'

font = TTFont(input_path)
name_table = font['name']

print("Renaming font to LavaChicken...")

# Update all name records
for record in name_table.names:
    try:
        current_value = record.toUnicode()
        new_value = current_value
        
        # Replace any instance of "love" with "lava" (case insensitive)
        if current_value and 'love' in current_value.lower():
            new_value = current_value.replace('LoveFrom', 'LavaChicken')
            new_value = new_value.replace('lovefrom', 'lavachicken')
            new_value = new_value.replace('Love', 'Lava')
            new_value = new_value.replace('love', 'lava')
            print(f"ID {record.nameID}: '{current_value}' → '{new_value}'")
        
        # For empty or "." names, set proper values
        if record.nameID == 1 and current_value in ['.', '', None]:  # Family name
            new_value = 'LavaChicken Serif'
            print(f"ID {record.nameID}: Setting family name to '{new_value}'")
        elif record.nameID == 4 and current_value in ['.', '', None]:  # Full name
            new_value = 'LavaChicken Serif Variable'
            print(f"ID {record.nameID}: Setting full name to '{new_value}'")
        elif record.nameID == 6 and current_value in ['', None]:  # PostScript name
            new_value = 'LavaChickenSerif-Variable'
            print(f"ID {record.nameID}: Setting PostScript name to '{new_value}'")
        elif record.nameID == 16 and current_value in ['', None]:  # Typographic family
            new_value = 'LavaChicken Serif'
            print(f"ID {record.nameID}: Setting typographic family to '{new_value}'")
            
        # Update the record if changed
        if new_value != current_value:
            record.string = new_value
            
    except Exception as e:
        print(f"Error processing record {record.nameID}: {e}")

# Save the modified font
font.save(output_path)
font.close()

# Check file size
original_size = os.path.getsize(input_path)
new_size = os.path.getsize(output_path)
print(f"\nOriginal size: {original_size:,} bytes")
print(f"New size: {new_size:,} bytes")
print(f"Output saved to: {output_path}")